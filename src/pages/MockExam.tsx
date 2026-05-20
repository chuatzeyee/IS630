import { useState, useMemo, useCallback } from 'react'
import { RotateCcw, Trophy, Target, Zap, Eye, Lightbulb, Clock, CheckCircle2, XCircle } from 'lucide-react'
import { mockQuestions, sectionInfo, totalMarks, type MockQuestion } from '../data/mockExam'

interface McqAnswer {
  readonly type: 'mcq'
  readonly selectedIndex: number | null
  readonly revealed: boolean
}

interface MultiSelectAnswer {
  readonly type: 'multi-select'
  readonly selectedIndices: ReadonlySet<number>
  readonly revealed: boolean
}

interface ShortAnswer {
  readonly type: 'short-answer'
  readonly value: string
  readonly revealed: boolean
}

type AnswerState = McqAnswer | MultiSelectAnswer | ShortAnswer

function isCorrectMcq(q: MockQuestion, ans: McqAnswer): boolean {
  return ans.selectedIndex === q.correctIndex
}

function isCorrectMulti(q: MockQuestion, ans: MultiSelectAnswer): boolean {
  const correct = new Set(q.correctIndices ?? [])
  if (ans.selectedIndices.size !== correct.size) return false
  for (const i of ans.selectedIndices) {
    if (!correct.has(i)) return false
  }
  return true
}

function isCorrectShort(q: MockQuestion, ans: ShortAnswer): boolean {
  const parsed = parseFloat(ans.value)
  if (isNaN(parsed)) return false
  const expected = parseFloat(q.answer ?? '')
  const tol = q.tolerance ?? 0
  return Math.abs(parsed - expected) <= tol
}

function isCorrect(q: MockQuestion, ans: AnswerState): boolean {
  if (!ans.revealed) return false
  switch (ans.type) {
    case 'mcq': return isCorrectMcq(q, ans)
    case 'multi-select': return isCorrectMulti(q, ans)
    case 'short-answer': return isCorrectShort(q, ans)
  }
}

function hasAttempted(ans: AnswerState): boolean {
  switch (ans.type) {
    case 'mcq': return ans.selectedIndex !== null
    case 'multi-select': return ans.selectedIndices.size > 0
    case 'short-answer': return ans.value.trim() !== ''
  }
}

function SectionHeader({ section, title, marks, description }: {
  readonly section: string
  readonly title: string
  readonly marks: number
  readonly description: string
}) {
  return (
    <div className="bg-raised border border-edge rounded-lg px-5 py-4 mb-4">
      <div className="flex items-center gap-3 mb-1">
        <span className="text-xs font-mono px-2.5 py-0.5 bg-glow-dim text-glow rounded-full border border-glow/30">
          Section {section}
        </span>
        <h2 className="text-lg font-semibold text-ink">{title}</h2>
        <span className="text-xs font-mono text-ink-muted ml-auto">{marks} marks</span>
      </div>
      <p className="text-sm text-ink-secondary">{description}</p>
    </div>
  )
}

function McqQuestionCard({ q, index, answer, onSelect, onReveal }: {
  readonly q: MockQuestion
  readonly index: number
  readonly answer: McqAnswer
  readonly onSelect: (idx: number) => void
  readonly onReveal: () => void
}) {
  const [showHint, setShowHint] = useState(false)
  const { selectedIndex, revealed } = answer

  return (
    <div className="bg-surface border border-edge rounded-lg p-5 animate-fade-in"
      style={{ animationDelay: `${Math.min(index * 40, 400)}ms`, animationFillMode: 'both' }}>
      <p className="text-sm font-semibold text-ink mb-3">
        <span className="text-ink-faint mr-2 font-mono">Q{q.id}.</span>
        {q.question}
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3">
        {q.options?.map((opt, oi) => {
          let style = 'border border-edge text-ink-secondary hover:border-glow/30 hover:bg-raised'
          if (selectedIndex === oi && !revealed) {
            style = 'border border-glow/50 bg-glow-dim text-glow shadow-[0_0_12px_rgba(74,222,128,0.08)]'
          } else if (revealed) {
            if (oi === q.correctIndex) {
              style = 'border border-correct/50 bg-correct-dim text-correct'
            } else if (oi === selectedIndex) {
              style = 'border border-wrong/50 bg-wrong-dim text-wrong'
            } else {
              style = 'border border-edge/50 text-ink-faint'
            }
          }
          return (
            <button key={oi} onClick={() => onSelect(oi)} disabled={revealed}
              className={`px-4 py-2.5 rounded-lg text-sm text-left transition-all duration-150 cursor-pointer disabled:cursor-default ${style}`}>
              <span className="font-medium mr-2 font-mono">{String.fromCharCode(65 + oi)}.</span>
              {opt}
            </button>
          )
        })}
      </div>
      <div className="flex items-center gap-3">
        {!revealed && (
          <button onClick={onReveal} disabled={selectedIndex === null}
            className="text-sm text-glow hover:text-glow-hover font-medium disabled:text-ink-faint disabled:cursor-default cursor-pointer transition-colors duration-150">
            Show Answer
          </button>
        )}
        {revealed && isCorrectMcq(q, answer) && (
          <p className="text-sm text-correct font-medium animate-scale-in flex items-center gap-1.5">
            <CheckCircle2 size={14} /> Correct!
          </p>
        )}
        {revealed && !isCorrectMcq(q, answer) && (
          <p className="text-sm text-wrong font-medium animate-scale-in flex items-center gap-1.5">
            <XCircle size={14} /> Incorrect — answer is {String.fromCharCode(65 + (q.correctIndex ?? 0))}
          </p>
        )}
        {q.hint && revealed && (
          <button onClick={() => setShowHint(s => !s)}
            className="text-xs text-s4 hover:text-s4/80 flex items-center gap-1 ml-auto cursor-pointer transition-colors duration-150">
            <Lightbulb size={12} /> {showHint ? 'Hide' : 'Show'} hint
          </button>
        )}
      </div>
      {showHint && revealed && q.hint && (
        <p className="text-xs text-ink-secondary mt-2 border-l-2 border-s4/50 pl-3 animate-fade-in">{q.hint}</p>
      )}
    </div>
  )
}

function MultiSelectCard({ q, index, answer, onToggle, onReveal }: {
  readonly q: MockQuestion
  readonly index: number
  readonly answer: MultiSelectAnswer
  readonly onToggle: (idx: number) => void
  readonly onReveal: () => void
}) {
  const [showHint, setShowHint] = useState(false)
  const { selectedIndices, revealed } = answer
  const correct = new Set(q.correctIndices ?? [])

  return (
    <div className="bg-surface border border-edge rounded-lg p-5 animate-fade-in"
      style={{ animationDelay: `${Math.min(index * 40, 400)}ms`, animationFillMode: 'both' }}>
      <p className="text-sm font-semibold text-ink mb-3">
        <span className="text-ink-faint mr-2 font-mono">Q{q.id}.</span>
        {q.question}
      </p>
      <div className="grid grid-cols-1 gap-2 mb-3">
        {q.options?.map((opt, oi) => {
          const selected = selectedIndices.has(oi)
          let style = 'border border-edge text-ink-secondary hover:border-glow/30 hover:bg-raised'
          if (selected && !revealed) {
            style = 'border border-glow/50 bg-glow-dim text-glow shadow-[0_0_12px_rgba(74,222,128,0.08)]'
          } else if (revealed) {
            if (correct.has(oi) && selected) {
              style = 'border border-correct/50 bg-correct-dim text-correct'
            } else if (correct.has(oi) && !selected) {
              style = 'border border-correct/30 bg-correct-dim/50 text-correct/70'
            } else if (!correct.has(oi) && selected) {
              style = 'border border-wrong/50 bg-wrong-dim text-wrong'
            } else {
              style = 'border border-edge/50 text-ink-faint'
            }
          }
          return (
            <button key={oi} onClick={() => onToggle(oi)} disabled={revealed}
              className={`px-4 py-2.5 rounded-lg text-sm text-left transition-all duration-150 cursor-pointer disabled:cursor-default flex items-center gap-3 ${style}`}>
              <span className={`w-4 h-4 rounded border shrink-0 flex items-center justify-center text-[10px] ${
                selected ? 'bg-glow/20 border-glow/50' : 'border-edge-bright'
              }`}>
                {selected && '✓'}
              </span>
              <span>
                <span className="font-medium mr-2 font-mono">{String.fromCharCode(65 + oi)}.</span>
                {opt}
              </span>
            </button>
          )
        })}
      </div>
      <div className="flex items-center gap-3">
        {!revealed && (
          <button onClick={onReveal} disabled={selectedIndices.size === 0}
            className="text-sm text-glow hover:text-glow-hover font-medium disabled:text-ink-faint disabled:cursor-default cursor-pointer transition-colors duration-150">
            Show Answer
          </button>
        )}
        {revealed && isCorrectMulti(q, answer) && (
          <p className="text-sm text-correct font-medium animate-scale-in flex items-center gap-1.5">
            <CheckCircle2 size={14} /> All correct!
          </p>
        )}
        {revealed && !isCorrectMulti(q, answer) && (
          <p className="text-sm text-wrong font-medium animate-scale-in flex items-center gap-1.5">
            <XCircle size={14} /> Correct: {(q.correctIndices ?? []).map(i => String.fromCharCode(65 + i)).join(', ')}
          </p>
        )}
        {q.hint && revealed && (
          <button onClick={() => setShowHint(s => !s)}
            className="text-xs text-s4 hover:text-s4/80 flex items-center gap-1 ml-auto cursor-pointer transition-colors duration-150">
            <Lightbulb size={12} /> {showHint ? 'Hide' : 'Show'} hint
          </button>
        )}
      </div>
      {showHint && revealed && q.hint && (
        <p className="text-xs text-ink-secondary mt-2 border-l-2 border-s4/50 pl-3 animate-fade-in">{q.hint}</p>
      )}
    </div>
  )
}

function ShortAnswerCard({ q, index, answer, onChange, onReveal }: {
  readonly q: MockQuestion
  readonly index: number
  readonly answer: ShortAnswer
  readonly onChange: (val: string) => void
  readonly onReveal: () => void
}) {
  const [showHint, setShowHint] = useState(false)
  const { value, revealed } = answer

  return (
    <div className="bg-surface border border-edge rounded-lg p-5 animate-fade-in"
      style={{ animationDelay: `${Math.min(index * 40, 400)}ms`, animationFillMode: 'both' }}>
      {q.context && (
        <p className="text-sm text-ink-secondary mb-3 border-l-2 border-edge-bright pl-3 italic">{q.context}</p>
      )}
      <p className="text-sm font-semibold text-ink mb-3">
        <span className="text-ink-faint mr-2 font-mono">Q{q.id}.</span>
        {q.question}
      </p>
      <div className="flex items-center gap-3 mb-3">
        <input
          type="text"
          inputMode="decimal"
          value={value}
          onChange={e => onChange(e.target.value)}
          disabled={revealed}
          placeholder="Enter your answer..."
          className={`px-4 py-2.5 rounded-lg text-sm font-mono bg-void border transition-all duration-150 w-48 outline-none ${
            revealed
              ? isCorrectShort(q, answer)
                ? 'border-correct/50 text-correct bg-correct-dim'
                : 'border-wrong/50 text-wrong bg-wrong-dim'
              : 'border-edge text-ink focus:border-glow/50 focus:shadow-[0_0_12px_rgba(74,222,128,0.08)]'
          }`}
        />
        {!revealed && (
          <button onClick={onReveal} disabled={value.trim() === ''}
            className="text-sm text-glow hover:text-glow-hover font-medium disabled:text-ink-faint disabled:cursor-default cursor-pointer transition-colors duration-150">
            Check
          </button>
        )}
      </div>
      <div className="flex items-center gap-3">
        {revealed && isCorrectShort(q, answer) && (
          <p className="text-sm text-correct font-medium animate-scale-in flex items-center gap-1.5">
            <CheckCircle2 size={14} /> Correct! Answer: {q.answer}
          </p>
        )}
        {revealed && !isCorrectShort(q, answer) && (
          <p className="text-sm text-wrong font-medium animate-scale-in flex items-center gap-1.5">
            <XCircle size={14} /> Incorrect — answer is {q.answer}
          </p>
        )}
        {q.hint && revealed && (
          <button onClick={() => setShowHint(s => !s)}
            className="text-xs text-s4 hover:text-s4/80 flex items-center gap-1 ml-auto cursor-pointer transition-colors duration-150">
            <Lightbulb size={12} /> {showHint ? 'Hide' : 'Show'} hint
          </button>
        )}
      </div>
      {showHint && revealed && q.hint && (
        <p className="text-xs text-ink-secondary mt-2 border-l-2 border-s4/50 pl-3 animate-fade-in">{q.hint}</p>
      )}
    </div>
  )
}

export default function MockExam() {
  const [answers, setAnswers] = useState<ReadonlyMap<number, AnswerState>>(() => new Map())
  const [timerStarted, setTimerStarted] = useState(false)
  const [startTime] = useState(() => Date.now())

  const getAnswer = useCallback((q: MockQuestion): AnswerState => {
    const existing = answers.get(q.id)
    if (existing) return existing
    switch (q.type) {
      case 'mcq': return { type: 'mcq', selectedIndex: null, revealed: false }
      case 'multi-select': return { type: 'multi-select', selectedIndices: new Set(), revealed: false }
      case 'short-answer': return { type: 'short-answer', value: '', revealed: false }
    }
  }, [answers])

  const score = useMemo(() => {
    let earned = 0
    let revealed = 0
    for (const q of mockQuestions) {
      const ans = answers.get(q.id)
      if (ans?.revealed) {
        revealed++
        if (isCorrect(q, ans)) earned += q.marks
      }
    }
    return { earned, revealed }
  }, [answers])

  const handleMcqSelect = useCallback((qId: number, optIdx: number) => {
    setAnswers(prev => {
      const existing = prev.get(qId) as McqAnswer | undefined
      if (existing?.revealed) return prev
      const next = new Map(prev)
      next.set(qId, { type: 'mcq', selectedIndex: optIdx, revealed: false })
      return next
    })
    if (!timerStarted) setTimerStarted(true)
  }, [timerStarted])

  const handleMultiToggle = useCallback((qId: number, optIdx: number) => {
    setAnswers(prev => {
      const existing = prev.get(qId) as MultiSelectAnswer | undefined
      if (existing?.revealed) return prev
      const next = new Map(prev)
      const current = existing?.selectedIndices ?? new Set<number>()
      const updated = new Set(current)
      if (updated.has(optIdx)) {
        updated.delete(optIdx)
      } else {
        updated.add(optIdx)
      }
      next.set(qId, { type: 'multi-select', selectedIndices: updated, revealed: false })
      return next
    })
    if (!timerStarted) setTimerStarted(true)
  }, [timerStarted])

  const handleShortChange = useCallback((qId: number, val: string) => {
    setAnswers(prev => {
      const existing = prev.get(qId) as ShortAnswer | undefined
      if (existing?.revealed) return prev
      const next = new Map(prev)
      next.set(qId, { type: 'short-answer', value: val, revealed: false })
      return next
    })
    if (!timerStarted) setTimerStarted(true)
  }, [timerStarted])

  const handleReveal = useCallback((qId: number) => {
    setAnswers(prev => {
      const existing = prev.get(qId)
      if (!existing || !hasAttempted(existing)) return prev
      const next = new Map(prev)
      next.set(qId, { ...existing, revealed: true } as AnswerState)
      return next
    })
  }, [])

  const handleReset = () => {
    setAnswers(new Map())
    setTimerStarted(false)
  }

  const handleRevealAll = () => {
    setAnswers(prev => {
      const next = new Map(prev)
      for (const q of mockQuestions) {
        const existing = next.get(q.id)
        if (existing && hasAttempted(existing) && !existing.revealed) {
          next.set(q.id, { ...existing, revealed: true } as AnswerState)
        }
      }
      return next
    })
  }

  const elapsed = timerStarted ? Math.floor((Date.now() - startTime) / 1000) : 0

  const sectionAQuestions = mockQuestions.filter(q => q.section === 'A')
  const sectionBQuestions = mockQuestions.filter(q => q.section === 'B')
  const sectionCQuestions = mockQuestions.filter(q => q.section === 'C')

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-3xl font-bold text-ink tracking-tight">Mock Mid-Term</h1>
        <div className="flex items-center gap-2">
          <button onClick={handleRevealAll}
            className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-ink-secondary bg-surface border border-edge rounded-lg hover:bg-raised hover:text-ink hover:border-edge-bright transition-all duration-150 cursor-pointer">
            <Eye size={14} /> Reveal All
          </button>
          <button onClick={handleReset}
            className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-ink-secondary bg-surface border border-edge rounded-lg hover:bg-raised hover:text-ink hover:border-edge-bright transition-all duration-150 cursor-pointer">
            <RotateCcw size={14} /> Reset
          </button>
        </div>
      </div>

      <p className="text-ink-muted mb-6">
        Mock mid-term exam — {totalMarks} marks total. Answer all sections, then check your score.
      </p>

      <div className="bg-surface border border-edge rounded-lg px-5 py-4 mb-6">
        <div className="flex items-center justify-between text-xs font-mono">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-correct">
              <Trophy size={12} /> {score.earned} / {totalMarks} marks
            </span>
            <span className="flex items-center gap-1.5 text-ink-secondary">
              <Target size={12} /> {score.revealed} / {mockQuestions.length} revealed
            </span>
          </div>
          {timerStarted && (
            <span className="flex items-center gap-1.5 text-ink-muted">
              <Clock size={12} /> {Math.floor(elapsed / 60)}:{String(elapsed % 60).padStart(2, '0')}
            </span>
          )}
        </div>
        <div className="h-2 bg-raised rounded-full overflow-hidden border border-edge mt-3">
          <div className="h-full bg-glow/80 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${(score.earned / totalMarks) * 100}%` }} />
        </div>
        {score.revealed === mockQuestions.length && (
          <div className="mt-3 flex items-center gap-1.5 text-xs font-mono text-glow animate-scale-in">
            <Zap size={12} />
            Final score: {score.earned}/{totalMarks} ({Math.round((score.earned / totalMarks) * 100)}%)
          </div>
        )}
      </div>

      <SectionHeader {...sectionInfo[0]} />
      <div className="space-y-4 mb-8">
        {sectionAQuestions.map((q, idx) => (
          <McqQuestionCard key={q.id} q={q} index={idx}
            answer={getAnswer(q) as McqAnswer}
            onSelect={oi => handleMcqSelect(q.id, oi)}
            onReveal={() => handleReveal(q.id)} />
        ))}
      </div>

      <SectionHeader {...sectionInfo[1]} />
      <div className="space-y-4 mb-8">
        {sectionBQuestions.map((q, idx) => (
          <MultiSelectCard key={q.id} q={q} index={idx}
            answer={getAnswer(q) as MultiSelectAnswer}
            onToggle={oi => handleMultiToggle(q.id, oi)}
            onReveal={() => handleReveal(q.id)} />
        ))}
      </div>

      <SectionHeader {...sectionInfo[2]} />
      <div className="space-y-4">
        {sectionCQuestions.map((q, idx) => (
          <ShortAnswerCard key={q.id} q={q} index={idx}
            answer={getAnswer(q) as ShortAnswer}
            onChange={val => handleShortChange(q.id, val)}
            onReveal={() => handleReveal(q.id)} />
        ))}
      </div>
    </div>
  )
}
