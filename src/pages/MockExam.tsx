import { useState, useMemo } from 'react'
import { ChevronDown, ChevronRight, Eye, EyeOff, FileText, Wrench, Copy, Check } from 'lucide-react'
import { mockSets, type MockQuestion, type Section } from '../data/mockSets'
import { codeGenerators, codeGenCategories, type CodeGen } from '../data/codegen'

const sectionMeta: Record<Section, { label: string; color: string }> = {
  'A-mcq': { label: 'Section A - Multiple Choice (1 mark)', color: 'text-s1' },
  'A-msq': { label: 'Section A - Multi-Select (2 marks)', color: 'text-s2' },
  'B-short': { label: 'Section B - Short Questions', color: 'text-s3' },
  'C-structured': { label: 'Section C - Structured Questions', color: 'text-s4' },
}
const sectionOrder: Section[] = ['A-mcq', 'A-msq', 'B-short', 'C-structured']

// ─── Exam question card ────────────────────────────────────────────
function QuestionCard({ q }: { readonly q: MockQuestion }) {
  const [show, setShow] = useState(false)
  return (
    <div className="bg-surface border border-edge rounded-lg p-5">
      <div className="flex items-start gap-3">
        <span className="flex-shrink-0 text-xs font-mono text-glow bg-glow-dim px-2 py-0.5 rounded border border-glow/15">
          Q{q.number}
        </span>
        <div className="flex-1 min-w-0">
          <p className="text-sm text-ink leading-relaxed">{q.prompt}</p>
          {q.options && (
            <ul className="mt-3 space-y-1.5">
              {q.options.map((opt) => (
                <li key={opt} className="text-sm text-ink-secondary pl-1">{opt}</li>
              ))}
            </ul>
          )}
        </div>
        <span className="flex-shrink-0 text-[10px] font-mono text-ink-faint">{q.marks} mk</span>
      </div>

      <button
        onClick={() => setShow((s) => !s)}
        className="mt-4 flex items-center gap-1.5 text-xs text-glow hover:text-glow-hover cursor-pointer transition-colors"
      >
        {show ? <EyeOff size={13} /> : <Eye size={13} />}
        {show ? 'Hide answer' : 'Show answer'}
      </button>

      {show && (
        <div className="mt-3 space-y-2 animate-fade-in">
          <div className="px-3.5 py-2.5 rounded-lg bg-glow-dim/30 border border-glow/15">
            <span className="text-[10px] font-mono text-glow uppercase tracking-wider">Answer</span>
            <p className="text-sm text-ink mt-0.5 whitespace-pre-wrap">{q.answer}</p>
          </div>
          {q.solution && (
            <div className="px-3.5 py-2.5 rounded-lg bg-base border border-edge">
              <span className="text-[10px] font-mono text-ink-muted uppercase tracking-wider">Solution</span>
              <pre className="text-xs text-ink-secondary mt-1 font-mono whitespace-pre-wrap leading-relaxed">{q.solution}</pre>
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
  const set = mockSets.find((s) => s.id === setId)!

  const totalMarks = useMemo(() => set.questions.reduce((sum, q) => sum + q.marks, 0), [set])
  const grouped = useMemo(
    () => sectionOrder.map((sec) => ({ sec, qs: set.questions.filter((q) => q.section === sec) })),
    [set]
  )

  return (
    <div className="animate-fade-in">
      <div className="flex items-center gap-2 mb-5 flex-wrap">
        {mockSets.map((s) => (
          <button
            key={s.id}
            onClick={() => setSetId(s.id)}
            className={`px-3.5 py-2 text-sm rounded-lg transition-all duration-150 cursor-pointer border ${
              setId === s.id
                ? 'bg-glow-dim text-glow border-glow/30'
                : 'bg-surface text-ink-muted border-edge hover:bg-raised hover:text-ink'
            }`}
          >
            Set {s.id}
          </button>
        ))}
        <span className="ml-auto text-xs text-ink-faint font-mono">
          {set.questions.length} questions - {totalMarks} marks
        </span>
      </div>

      <div className="space-y-8">
        {grouped.map(({ sec, qs }) => (
          <section key={sec}>
            <h2 className={`text-sm font-semibold mb-3 ${sectionMeta[sec].color}`}>
              {sectionMeta[sec].label}
            </h2>
            <div className="space-y-3">
              {qs.map((q) => <QuestionCard key={q.id} q={q} />)}
            </div>
          </section>
        ))}
      </div>
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

// ─── Page ──────────────────────────────────────────────────────────
type Tab = 'exam' | 'generator'

export default function MockExam() {
  const [tab, setTab] = useState<Tab>('exam')

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold text-ink mb-2 tracking-tight">Mock Exam</h1>
      <p className="text-ink-muted mb-6">
        Five full practice sets (35 questions each) modelled on the IS630 exam, plus an offline code generator
        for every examinable topic.
      </p>

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

      {tab === 'exam' ? <ExamView /> : <GeneratorView />}
    </div>
  )
}
