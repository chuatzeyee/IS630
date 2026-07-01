import { useState, useMemo } from 'react'
import { ChevronDown, ChevronRight, Eye, EyeOff, FileText, Wrench, Copy, Check, X, HelpCircle, Code2, History, Search } from 'lucide-react'
import { mockSets, isGradable, gradeAnswer, type MockQuestion, type Section } from '../data/mockSets'
import { codeGenerators, codeGenCategories, type CodeGen } from '../data/codegen'
import { examTemplates, examTemplateGroups, templateForTopic, templateById, type ExamTemplate } from '../data/examTemplates'
import { useAttempts } from '../hooks/useAttempts'
import CodeRunner from '../components/CodeRunner'

const sectionMeta: Record<Section, { label: string; color: string }> = {
  'A-mcq': { label: 'Section A - Multiple Choice (1 mark)', color: 'text-s1' },
  'A-msq': { label: 'Section A - Multi-Select (2 marks)', color: 'text-s2' },
  'B-short': { label: 'Section B - Short Questions', color: 'text-s3' },
  'C-structured': { label: 'Section C - Structured Questions', color: 'text-s4' },
}
const sectionOrder: Section[] = ['A-mcq', 'A-msq', 'B-short', 'C-structured']

// ─── Reusable parameterised template body (inputs + generated code) ──
function TemplateBody({ tpl, initial }: { readonly tpl: ExamTemplate; readonly initial?: Readonly<Record<string, string>> }) {
  const [vals, setVals] = useState<Record<string, string>>(
    () => Object.fromEntries(tpl.fields.map((f) => [f.id, initial?.[f.id] ?? f.default]))
  )
  const [copied, setCopied] = useState(false)
  const code = tpl.generate(vals)
  const copy = () => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    })
  }
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {tpl.fields.map((f) => (
          <label key={f.id} className="block">
            <span className="text-xs text-ink-secondary font-medium">{f.label}</span>
            {f.help && <span className="text-[10px] text-ink-faint ml-1.5">({f.help})</span>}
            {f.type === 'select' ? (
              <select
                value={vals[f.id]}
                onChange={(e) => setVals((v) => ({ ...v, [f.id]: e.target.value }))}
                className="mt-1 w-full px-3 py-2 bg-base border border-edge rounded-lg text-sm text-ink focus:outline-none focus:border-glow/40 cursor-pointer"
              >
                {f.options!.map((o) => <option key={o} value={o}>{o}</option>)}
              </select>
            ) : (
              <input
                type={f.type}
                step="any"
                value={vals[f.id]}
                onChange={(e) => setVals((v) => ({ ...v, [f.id]: e.target.value }))}
                className="mt-1 w-full px-3 py-2 bg-base border border-edge rounded-lg text-sm text-ink font-mono placeholder:text-ink-faint focus:outline-none focus:border-glow/40"
              />
            )}
          </label>
        ))}
      </div>
      <div className="relative">
        <button
          onClick={copy}
          className="absolute top-2 right-2 flex items-center gap-1 text-[10px] font-mono text-ink-muted hover:text-glow bg-surface/80 px-2 py-1 rounded border border-edge cursor-pointer transition-colors"
        >
          {copied ? <Check size={11} /> : <Copy size={11} />}
          {copied ? 'Copied' : 'Copy'}
        </button>
        <pre className="bg-void border border-edge rounded-lg p-4 text-sm font-mono text-glow/90 overflow-x-auto whitespace-pre leading-relaxed">{code}</pre>
      </div>
      <CodeRunner code={code} />
    </div>
  )
}

// A solution is runnable if it's self-contained Python: has a print() and starts
// with code (import/print/assignment/comment), and has no fill-in placeholders.
function isRunnableSolution(sol: string): boolean {
  if (!sol.includes('print(')) return false
  if (sol.includes('___')) return false // fill-in-the-blank scaffold, not runnable
  const first = sol.trimStart()
  return /^(from |import |#|print\(|[a-zA-Z_]\w*\s*=)/.test(first)
}

// Break multi-part text so each "(a)", "(b)", ... part starts on its own line.
function renderMultipart(text: string) {
  // insert a line break before any " (x) " part marker (not at the very start)
  const parts = text.split(/(?=\s\([a-e]\)\s)/g).map((s) => s.trim()).filter(Boolean)
  if (parts.length <= 1) return text
  return parts.map((p, i) => (
    <span key={i} className={i > 0 ? 'block mt-1.5' : 'block'}>{p}</span>
  ))
}

// ─── Exam question card ────────────────────────────────────────────
interface QuestionCardProps {
  readonly q: MockQuestion
  readonly response: string
  readonly onRespond: (value: string) => void
  readonly submitted: boolean
}

function QuestionCard({ q, response, onRespond, submitted }: QuestionCardProps) {
  const [show, setShow] = useState(false)
  const [showCode, setShowCode] = useState(false)
  const [checked, setChecked] = useState(false) // local auto-check (independent of global submit)
  // prefer the question's own pre-filled generator; fall back to topic matching
  const tpl = (q.gen && templateById(q.gen.templateId)) || templateForTopic(q.topic)
  const genInitial = q.gen && tpl && tpl.id === q.gen.templateId ? q.gen.values : undefined
  const gradable = isGradable(q)
  const isMulti = q.section === 'A-msq'
  // graded (locked) once the user checks this question OR the whole set is submitted
  const graded = gradable && (checked || submitted)
  const verdict = graded ? gradeAnswer(q, response) : null

  // toggle a letter for MCQ (single) / MSQ (multi)
  const optionLetter = (opt: string) => opt.trim().charAt(0).toUpperCase()
  const selected = new Set(response.toUpperCase().replace(/[^A-D]/g, '').split(''))
  const toggle = (letter: string) => {
    if (graded || submitted) return
    if (isMulti) {
      const next = new Set(selected)
      next.has(letter) ? next.delete(letter) : next.add(letter)
      onRespond([...next].sort().join(', '))
    } else {
      // single-choice MCQ: record the answer AND auto-check immediately
      onRespond(letter)
      setChecked(true)
    }
  }

  const borderClass =
    verdict === true ? 'border-green-500/40' : verdict === false ? 'border-red-500/40' : 'border-edge'

  return (
    <div className={`bg-surface border rounded-lg p-5 ${borderClass}`}>
      <div className="flex items-start gap-3">
        <span className="flex-shrink-0 text-xs font-mono text-glow bg-glow-dim px-2 py-0.5 rounded border border-glow/15">
          Q{q.number}
        </span>
        <div className="flex-1 min-w-0">
          <p className="text-sm text-ink leading-relaxed">{renderMultipart(q.prompt)}</p>

          {/* Selectable options for MCQ / MSQ */}
          {q.options && (
            <>
              <ul className="mt-3 space-y-1.5">
                {q.options.map((opt) => {
                  const letter = optionLetter(opt)
                  const isSel = selected.has(letter)
                  const isCorrect = graded && new Set(q.answer.toUpperCase().replace(/[^A-D]/g, '').split('')).has(letter)
                  let cls = 'border-edge text-ink-secondary hover:bg-raised'
                  if (graded) {
                    if (isCorrect) cls = 'border-green-500/50 bg-green-500/10 text-ink'
                    else if (isSel) cls = 'border-red-500/50 bg-red-500/10 text-ink'
                    else cls = 'border-edge text-ink-muted'
                  } else if (isSel) {
                    cls = 'border-glow/50 bg-glow-dim text-ink'
                  }
                  return (
                    <li key={opt}>
                      <button
                        disabled={graded}
                        onClick={() => toggle(letter)}
                        className={`w-full text-left text-sm px-3 py-2 rounded-lg border transition-colors duration-150 ${graded ? '' : 'cursor-pointer'} ${cls}`}
                      >
                        {opt}
                      </button>
                    </li>
                  )
                })}
              </ul>
              {/* multi-select needs an explicit check (selection is built up first) */}
              {isMulti && !graded && (
                <button
                  onClick={() => setChecked(true)}
                  disabled={selected.size === 0}
                  className="mt-2 text-xs px-3 py-1.5 rounded-lg bg-glow-dim text-glow border border-glow/30 cursor-pointer hover:bg-glow/15 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  Check answer
                </button>
              )}
            </>
          )}

          {/* Numeric input for gradable short answers */}
          {!q.options && q.section === 'B-short' && gradable && (
            <div className="mt-3 flex items-center gap-2">
              <input
                type="text"
                inputMode="decimal"
                value={response}
                disabled={graded}
                onChange={(e) => onRespond(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter' && response.trim()) setChecked(true) }}
                placeholder="Your answer"
                className={`w-40 px-3 py-2 bg-base border rounded-lg text-sm text-ink font-mono focus:outline-none focus:border-glow/40 ${borderClass}`}
              />
              {!graded && (
                <button
                  onClick={() => setChecked(true)}
                  disabled={response.trim() === ''}
                  className="text-xs px-3 py-1.5 rounded-lg bg-glow-dim text-glow border border-glow/30 cursor-pointer hover:bg-glow/15 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  Check
                </button>
              )}
              {verdict === true && <Check size={16} className="text-green-500" />}
              {verdict === false && <X size={16} className="text-red-500" />}
            </div>
          )}
        </div>
        <span className="flex-shrink-0 text-[10px] font-mono text-ink-faint">{q.marks} mk</span>
      </div>

      <div className="mt-4 flex items-center gap-4 flex-wrap">
        <button
          onClick={() => setShow((s) => !s)}
          className="flex items-center gap-1.5 text-xs text-glow hover:text-glow-hover cursor-pointer transition-colors"
        >
          {show ? <EyeOff size={13} /> : <Eye size={13} />}
          {show ? 'Hide answer' : 'Show answer'}
        </button>
        {tpl && (
          <button
            onClick={() => setShowCode((s) => !s)}
            className="flex items-center gap-1.5 text-xs text-ink-muted hover:text-glow cursor-pointer transition-colors"
          >
            <Code2 size={13} />
            {showCode ? 'Hide code generator' : 'Generate code'}
          </button>
        )}
        {verdict === true && <span className="text-xs font-medium text-green-500">Correct (+{q.marks} mk)</span>}
        {verdict === false && <span className="text-xs font-medium text-red-500">Incorrect</span>}
        {submitted && !gradable && <span className="text-xs text-ink-faint">Self-mark (see answer)</span>}
        {checked && !submitted && (
          <button
            onClick={() => { setChecked(false); onRespond('') }}
            className="text-xs text-ink-muted hover:text-glow cursor-pointer transition-colors"
          >
            Try again
          </button>
        )}
      </div>

      {showCode && tpl && (
        <div className="mt-3 px-3.5 py-3 rounded-lg bg-base border border-edge animate-fade-in">
          <p className="text-[10px] font-mono text-ink-muted uppercase tracking-wider">
            Code generator - {tpl.title}
          </p>
          <p className="text-xs text-ink-faint mb-2 mt-0.5">
            {genInitial
              ? "Pre-filled from this question's numbers - press Run to get the answer."
              : 'Template pre-filled with example values - replace them with this question’s numbers. The output shown is for the example, not this question’s answer.'}
          </p>
          <TemplateBody tpl={tpl} initial={genInitial} />
        </div>
      )}

      {show && (
        <div className="mt-3 space-y-2 animate-fade-in">
          <div className="px-3.5 py-2.5 rounded-lg bg-glow-dim/30 border border-glow/15">
            <span className="text-[10px] font-mono text-glow uppercase tracking-wider">Answer</span>
            <p className="text-sm text-ink mt-0.5 whitespace-pre-wrap">{renderMultipart(q.answer)}</p>
          </div>
          {q.solution && (
            <div className="px-3.5 py-2.5 rounded-lg bg-base border border-edge">
              <span className="text-[10px] font-mono text-ink-muted uppercase tracking-wider">Solution</span>
              <pre className="text-xs text-ink-secondary mt-1 font-mono whitespace-pre-wrap leading-relaxed">{q.solution}</pre>
              {isRunnableSolution(q.solution) && <CodeRunner code={q.solution} />}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

// ─── Exam view ─────────────────────────────────────────────────────
function ExamView() {
  const [setId, setSetId] = useState(1)
  const [responses, setResponses] = useState<Record<string, string>>({})
  const [submitted, setSubmitted] = useState(false)
  const { attempts, add, clear } = useAttempts()

  const set = mockSets.find((s) => s.id === setId)!
  const grouped = useMemo(
    () => sectionOrder.map((sec) => ({ sec, qs: set.questions.filter((q) => q.section === sec) })),
    [set]
  )
  const gradableQs = useMemo(() => set.questions.filter(isGradable), [set])
  const gradableMarks = useMemo(() => gradableQs.reduce((s, q) => s + q.marks, 0), [gradableQs])
  const answeredCount = gradableQs.filter((q) => (responses[q.id] ?? '').trim() !== '').length

  const score = useMemo(() => {
    let earned = 0, correct = 0
    for (const q of gradableQs) {
      if (gradeAnswer(q, responses[q.id] ?? '')) { earned += q.marks; correct++ }
    }
    return { earned, correct }
  }, [gradableQs, responses])

  const switchSet = (id: number) => {
    setSetId(id)
    setResponses({})
    setSubmitted(false)
  }

  const submit = () => {
    setSubmitted(true)
    add({
      id: `${setId}-${Date.now()}`,
      setId,
      dateISO: new Date().toISOString(),
      earned: score.earned,
      total: gradableMarks,
      correct: score.correct,
      gradable: gradableQs.length,
    })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const reset = () => {
    setResponses({})
    setSubmitted(false)
  }

  const setAttempts = attempts.filter((a) => a.setId === setId)

  return (
    <div className="animate-fade-in">
      <div className="flex items-center gap-2 mb-5 flex-wrap">
        {mockSets.map((s) => (
          <button
            key={s.id}
            onClick={() => switchSet(s.id)}
            className={`px-3.5 py-2 text-sm rounded-lg transition-all duration-150 cursor-pointer border ${
              setId === s.id
                ? 'bg-glow-dim text-glow border-glow/30'
                : 'bg-surface text-ink-muted border-edge hover:bg-raised hover:text-ink'
            }`}
          >
            {s.id === 0 ? 'Official' : `Set ${s.id}`}
          </button>
        ))}
        <span className="ml-auto text-xs text-ink-faint font-mono">
          {answeredCount}/{gradableQs.length} answered - {gradableMarks} auto-graded marks
        </span>
      </div>

      {/* Score banner after submit */}
      {submitted && (
        <div className="mb-6 px-5 py-4 rounded-lg bg-glow-dim/30 border border-glow/25 animate-fade-in">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div>
              <p className="text-lg font-bold text-ink">
                Score: {score.earned} / {gradableMarks} marks
                <span className="text-sm font-normal text-ink-muted ml-2">
                  ({score.correct}/{gradableQs.length} correct, {gradableMarks ? Math.round((score.earned / gradableMarks) * 100) : 0}%)
                </span>
              </p>
              <p className="text-xs text-ink-muted mt-1">
                Section C (structured) is self-marked - check "Show answer" on each.
              </p>
            </div>
            <button
              onClick={reset}
              className="px-4 py-2 text-sm rounded-lg bg-surface text-ink border border-edge hover:bg-raised cursor-pointer transition-colors"
            >
              Retake
            </button>
          </div>
        </div>
      )}

      {/* Attempt history for this set */}
      {setAttempts.length > 0 && (
        <div className="mb-6 px-4 py-3 rounded-lg bg-surface border border-edge">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-ink flex items-center gap-1.5">
              <History size={13} /> Attempt history - {setId === 0 ? 'Official' : `Set ${setId}`}
            </span>
            <button onClick={clear} className="text-[10px] text-ink-faint hover:text-red-400 cursor-pointer">clear all</button>
          </div>
          <div className="space-y-1">
            {setAttempts.slice(0, 5).map((a) => (
              <div key={a.id} className="flex items-center justify-between text-xs font-mono text-ink-secondary">
                <span>{new Date(a.dateISO).toLocaleString()}</span>
                <span className="text-ink">
                  {a.earned}/{a.total} ({a.total ? Math.round((a.earned / a.total) * 100) : 0}%)
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="space-y-8">
        {grouped.map(({ sec, qs }) => (
          <section key={sec}>
            <h2 className={`text-sm font-semibold mb-3 ${sectionMeta[sec].color}`}>
              {sectionMeta[sec].label}
            </h2>
            <div className="space-y-3">
              {qs.map((q) => (
                <QuestionCard
                  key={q.id}
                  q={q}
                  response={responses[q.id] ?? ''}
                  onRespond={(value) => setResponses((r) => ({ ...r, [q.id]: value }))}
                  submitted={submitted}
                />
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* Submit bar - at the bottom of the page */}
      {!submitted && (
        <div className="mt-10 pt-6 border-t border-edge flex justify-center">
          <button
            onClick={submit}
            className="px-6 py-3 text-sm font-semibold rounded-full bg-glow text-void shadow-[0_4px_20px_rgba(74,222,128,0.3)] hover:bg-glow-hover cursor-pointer transition-colors"
          >
            Submit &amp; grade ({answeredCount}/{gradableQs.length} answered)
          </button>
        </div>
      )}
    </div>
  )
}

// ─── Code generator view ───────────────────────────────────────────
function GeneratorCard({ gen }: { readonly gen: CodeGen }) {
  const [open, setOpen] = useState(false)
  const [vals, setVals] = useState<Record<string, string>>(
    () => Object.fromEntries(gen.fields.map((f) => [f.id, f.default]))
  )
  const [copied, setCopied] = useState(false)

  const code = gen.generate(vals)

  const copy = () => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    })
  }

  return (
    <div className="bg-surface border border-edge rounded-lg overflow-hidden">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-start gap-3 p-4 text-left hover:bg-raised transition-colors duration-150 cursor-pointer"
      >
        {open ? <ChevronDown size={15} className="text-glow shrink-0 mt-0.5" /> : <ChevronRight size={15} className="text-ink-muted shrink-0 mt-0.5" />}
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-semibold text-ink">{gen.title}</h4>
          <p className="text-xs text-ink-muted mt-0.5">{gen.description}</p>
        </div>
      </button>

      {open && (
        <div className="border-t border-edge p-4 space-y-4 animate-fade-in">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {gen.fields.map((f) => (
              <label key={f.id} className="block">
                <span className="text-xs text-ink-secondary font-medium">{f.label}</span>
                {f.help && <span className="text-[10px] text-ink-faint ml-1.5">({f.help})</span>}
                {f.type === 'select' ? (
                  <select
                    value={vals[f.id]}
                    onChange={(e) => setVals((v) => ({ ...v, [f.id]: e.target.value }))}
                    className="mt-1 w-full px-3 py-2 bg-base border border-edge rounded-lg text-sm text-ink focus:outline-none focus:border-glow/40 cursor-pointer"
                  >
                    {f.options!.map((o) => <option key={o} value={o}>{o}</option>)}
                  </select>
                ) : (
                  <input
                    type={f.type}
                    step="any"
                    value={vals[f.id]}
                    placeholder={f.placeholder}
                    onChange={(e) => setVals((v) => ({ ...v, [f.id]: e.target.value }))}
                    className="mt-1 w-full px-3 py-2 bg-base border border-edge rounded-lg text-sm text-ink font-mono placeholder:text-ink-faint focus:outline-none focus:border-glow/40"
                  />
                )}
              </label>
            ))}
          </div>

          <div className="relative">
            <button
              onClick={copy}
              className="absolute top-2 right-2 flex items-center gap-1 text-[10px] font-mono text-ink-muted hover:text-glow bg-surface/80 px-2 py-1 rounded border border-edge cursor-pointer transition-colors"
            >
              {copied ? <Check size={11} /> : <Copy size={11} />}
              {copied ? 'Copied' : 'Copy'}
            </button>
            <pre className="bg-void border border-edge rounded-lg p-4 text-sm font-mono text-glow/90 overflow-x-auto whitespace-pre leading-relaxed">{code}</pre>
          </div>
          <CodeRunner code={code} />
        </div>
      )}
    </div>
  )
}

function GeneratorView() {
  const [cat, setCat] = useState<string>('All')
  const cats = ['All', ...codeGenCategories]
  const list = cat === 'All' ? codeGenerators : codeGenerators.filter((g) => g.category === cat)

  return (
    <div className="animate-fade-in">
      <div className="px-4 py-3 mb-5 rounded-lg bg-glow-dim/20 border border-glow/15">
        <p className="text-xs text-glow/90 leading-relaxed">
          Open-book helper: pick a topic, key in your values, and copy the generated scipy/numpy code straight
          into your Python environment. Works fully offline once the page is loaded.
        </p>
      </div>

      <div className="flex items-center gap-2 mb-5 flex-wrap">
        {cats.map((c) => (
          <button
            key={c}
            onClick={() => setCat(c)}
            className={`px-3 py-1.5 text-xs rounded-lg transition-all duration-150 cursor-pointer border ${
              cat === c
                ? 'bg-glow-dim text-glow border-glow/30'
                : 'bg-surface text-ink-secondary border-edge hover:bg-raised hover:text-ink'
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {list.map((gen) => <GeneratorCard key={gen.id} gen={gen} />)}
      </div>
    </div>
  )
}

// ─── By-question-type view ─────────────────────────────────────────
function TemplateCard({ tpl }: { readonly tpl: ExamTemplate }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="bg-surface border border-edge rounded-lg overflow-hidden">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-start gap-3 p-4 text-left hover:bg-raised transition-colors duration-150 cursor-pointer"
      >
        {open ? <ChevronDown size={15} className="text-glow shrink-0 mt-0.5" /> : <ChevronRight size={15} className="text-ink-muted shrink-0 mt-0.5" />}
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-semibold text-ink">{tpl.title}</h4>
          <p className="text-xs text-ink-muted mt-0.5 italic">{tpl.trigger}</p>
        </div>
      </button>
      {open && (
        <div className="border-t border-edge p-4 animate-fade-in">
          <TemplateBody tpl={tpl} />
        </div>
      )}
    </div>
  )
}

function ByTypeView() {
  return (
    <div className="animate-fade-in">
      <div className="px-4 py-3 mb-5 rounded-lg bg-glow-dim/20 border border-glow/15">
        <p className="text-xs text-glow/90 leading-relaxed">
          Match the wording of the question in front of you, fill in the values, and copy a complete answer
          scaffold - test name, hypotheses, code, and a fill-in-the-blank conclusion. Built for Section B and C
          under time pressure.
        </p>
      </div>
      <div className="space-y-8">
        {examTemplateGroups.map((group) => (
          <section key={group}>
            <h2 className="text-sm font-semibold text-ink mb-3">{group}</h2>
            <div className="space-y-3">
              {examTemplates.filter((t) => t.group === group).map((tpl) => (
                <TemplateCard key={tpl.id} tpl={tpl} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}

// ─── Search view ────────────────────────────────────────────────────
// A self-contained card: its own answer state so each search result is
// independently answerable/gradable (auto-check on select), with the
// pre-filled code generator and solution available inline.
function StandaloneQuestionCard({ q, setId }: { readonly q: MockQuestion; readonly setId: number }) {
  const [response, setResponse] = useState('')
  const setLabel = setId === 0 ? 'Official' : `Set ${setId}`
  return (
    <div>
      <div className="text-[10px] font-mono text-ink-faint mb-1">
        {setLabel} - Q{q.number} - {q.topic}
      </div>
      <QuestionCard q={q} response={response} onRespond={setResponse} submitted={false} />
    </div>
  )
}

function SearchView() {
  const [query, setQuery] = useState('')

  const all = useMemo(
    () => mockSets.flatMap((s) => s.questions.map((q) => ({ q, setId: s.id }))),
    []
  )

  const results = useMemo(() => {
    const terms = query.toLowerCase().split(/\s+/).filter(Boolean)
    if (terms.length === 0) return []
    return all.filter(({ q }) => {
      const hay = `${q.prompt} ${q.answer} ${q.solution ?? ''} ${q.topic} ${(q.options ?? []).join(' ')}`.toLowerCase()
      return terms.every((t) => hay.includes(t))
    })
  }, [all, query])

  return (
    <div className="animate-fade-in">
      <div className="relative mb-5">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-faint" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search all questions, answers, solutions, topics... (e.g. 'poisson', 'confidence interval', 'chi-square')"
          className="w-full pl-10 pr-10 py-2.5 bg-surface border border-edge rounded-lg text-sm text-ink placeholder:text-ink-faint focus:outline-none focus:border-glow/40 focus:ring-1 focus:ring-glow/20 transition-all duration-150"
        />
        {query && (
          <button
            onClick={() => setQuery('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-muted hover:text-ink cursor-pointer"
          >
            <X size={16} />
          </button>
        )}
      </div>

      {query.trim() === '' ? (
        <p className="text-sm text-ink-muted px-1">
          Type a keyword to search every question across all sets. Each match shows the question, its answer/solution,
          and a code generator pre-filled with that question's numbers.
        </p>
      ) : (
        <>
          <p className="text-xs text-ink-faint font-mono mb-3">
            {results.length} match{results.length === 1 ? '' : 'es'}
          </p>
          <div className="space-y-4">
            {results.map(({ q, setId }) => (
              <StandaloneQuestionCard key={`${setId}-${q.id}`} q={q} setId={setId} />
            ))}
          </div>
          {results.length === 0 && (
            <p className="text-sm text-ink-muted px-1">No questions match "{query}".</p>
          )}
        </>
      )}
    </div>
  )
}

// ─── Page ──────────────────────────────────────────────────────────
type Tab = 'exam' | 'search' | 'bytype' | 'generator'

export default function MockExam() {
  const [tab, setTab] = useState<Tab>('exam')

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <div className="flex items-center gap-2 mb-6">
        <button
          onClick={() => setTab('exam')}
          className={`flex items-center gap-1.5 px-4 py-2 text-sm rounded-lg transition-all duration-150 cursor-pointer ${
            tab === 'exam'
              ? 'bg-glow-dim text-glow border border-glow/30'
              : 'bg-surface text-ink-secondary border border-edge hover:bg-raised hover:text-ink'
          }`}
        >
          <FileText size={15} />
          Practice Sets
        </button>
        <button
          onClick={() => setTab('search')}
          className={`flex items-center gap-1.5 px-4 py-2 text-sm rounded-lg transition-all duration-150 cursor-pointer ${
            tab === 'search'
              ? 'bg-glow-dim text-glow border border-glow/30'
              : 'bg-surface text-ink-secondary border border-edge hover:bg-raised hover:text-ink'
          }`}
        >
          <Search size={15} />
          Search
        </button>
        <button
          onClick={() => setTab('bytype')}
          className={`flex items-center gap-1.5 px-4 py-2 text-sm rounded-lg transition-all duration-150 cursor-pointer ${
            tab === 'bytype'
              ? 'bg-glow-dim text-glow border border-glow/30'
              : 'bg-surface text-ink-secondary border border-edge hover:bg-raised hover:text-ink'
          }`}
        >
          <HelpCircle size={15} />
          By Question Type
        </button>
        <button
          onClick={() => setTab('generator')}
          className={`flex items-center gap-1.5 px-4 py-2 text-sm rounded-lg transition-all duration-150 cursor-pointer ${
            tab === 'generator'
              ? 'bg-glow-dim text-glow border border-glow/30'
              : 'bg-surface text-ink-secondary border border-edge hover:bg-raised hover:text-ink'
          }`}
        >
          <Wrench size={15} />
          Code Generator
        </button>
      </div>

      {tab === 'exam' && <ExamView />}
      {tab === 'search' && <SearchView />}
      {tab === 'bytype' && <ByTypeView />}
      {tab === 'generator' && <GeneratorView />}
    </div>
  )
}
