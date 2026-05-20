import { useState, useMemo } from 'react'
import {
  ChevronDown,
  ChevronRight,
  RotateCcw,
  Shuffle,
  GitBranch,
  Code2,
  AlertTriangle,
  Lightbulb,
  Filter,
  Eye,
  EyeOff,
  BookOpen,
} from 'lucide-react'
import { examQuestions, testSelectionTree, cheatSheets, type ExamQuestion, type CheatSheet, type Difficulty, type QuestionType } from '../data/midterm'

type SessionFilter = 'all' | 1 | 2 | 3 | 4 | 5

const sessionFilters: readonly { readonly label: string; readonly value: SessionFilter }[] = [
  { label: 'All', value: 'all' },
  { label: 'S1 · Foundations', value: 1 },
  { label: 'S2 · EDA', value: 2 },
  { label: 'S3 · Distributions', value: 3 },
  { label: 'S4 · CLT/CI', value: 4 },
  { label: 'S5 · Hypothesis', value: 5 },
]

const difficultyColors: Record<Difficulty, string> = {
  easy: 'text-correct bg-correct-dim border-correct/30',
  medium: 'text-amber-400 bg-amber-950 border-amber-400/30',
  hard: 'text-wrong bg-wrong-dim border-wrong/30',
}

const questionTypeLabels: Record<QuestionType, string> = {
  'summary-stats': 'Summary Stats',
  'visualization': 'Visualization',
  'probability': 'Probability',
  'distribution': 'Distribution',
  'clt': 'CLT',
  'confidence-interval': 'Confidence Interval',
  'hypothesis-test': 'Hypothesis Test',
  'normality-test': 'Normality Test',
  'nonparametric': 'Non-parametric',
  'data-wrangling': 'Data Wrangling',
}

const sessionColors: Record<number, string> = {
  1: 'bg-s1/15 text-s1 border-s1/30',
  2: 'bg-s2/15 text-s2 border-s2/30',
  3: 'bg-s3/15 text-s3 border-s3/30',
  4: 'bg-s4/15 text-s4 border-s4/30',
  5: 'bg-s5/15 text-s5 border-s5/30',
}

function shuffleArray<T>(arr: readonly T[]): readonly T[] {
  const copy = [...arr]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

function CodeBlock({ code }: { readonly code: string }) {
  return (
    <pre className="bg-void border border-edge rounded-lg p-4 overflow-x-auto text-sm font-mono leading-relaxed">
      <code className="text-ink-secondary">
        {code.split('\n').map((line, i) => (
          <div key={i} className="flex">
            <span className="text-ink-faint select-none w-8 shrink-0 text-right mr-4">{i + 1}</span>
            <span className={
              line.startsWith('#') || line.startsWith('//') ? 'text-ink-muted italic' :
              line.startsWith('print') || line.startsWith('import') || line.startsWith('from') ? 'text-glow/80' :
              'text-ink-secondary'
            }>{line || ' '}</span>
          </div>
        ))}
      </code>
    </pre>
  )
}

function QuestionCard({ question, index, expanded, onToggle }: {
  readonly question: ExamQuestion
  readonly index: number
  readonly expanded: boolean
  readonly onToggle: () => void
}) {
  const [showCode, setShowCode] = useState(false)
  const [showInterpretation, setShowInterpretation] = useState(false)

  return (
    <div
      className="bg-surface border border-edge rounded-lg overflow-hidden animate-fade-in"
      style={{ animationDelay: `${Math.min(index * 40, 400)}ms`, animationFillMode: 'both' }}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-start gap-4 p-5 text-left hover:bg-raised transition-colors duration-150 cursor-pointer"
      >
        <span className="text-ink-faint font-mono text-sm mt-0.5 shrink-0 w-6 text-right">
          {index + 1}.
        </span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${difficultyColors[question.difficulty]}`}>
              {question.difficulty}
            </span>
            <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${sessionColors[question.session]}`}>
              S{question.session}
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full border border-edge text-ink-muted">
              {questionTypeLabels[question.questionType]}
            </span>
          </div>
          <p className="text-sm text-ink font-medium leading-relaxed">{question.scenario}</p>
        </div>
        {expanded
          ? <ChevronDown size={16} className="text-ink-muted mt-1 shrink-0" />
          : <ChevronRight size={16} className="text-ink-muted mt-1 shrink-0" />
        }
      </button>

      {expanded && (
        <div className="px-5 pb-5 space-y-4 border-t border-edge pt-4 animate-fade-in">
          <div>
            <h4 className="text-xs font-mono text-glow mb-2 flex items-center gap-1.5">
              <Filter size={12} /> Task
            </h4>
            <p className="text-sm text-ink leading-relaxed">{question.task}</p>
          </div>

          <div>
            <h4 className="text-xs font-mono text-s3 mb-2 flex items-center gap-1.5">
              <Lightbulb size={12} /> Stats Knowledge Required
            </h4>
            <p className="text-sm text-ink-secondary leading-relaxed">{question.statsKnowledge}</p>
          </div>

          <div>
            <button
              onClick={() => setShowCode(c => !c)}
              className="flex items-center gap-1.5 text-xs font-mono text-glow hover:text-glow-hover transition-colors duration-150 mb-2 cursor-pointer"
            >
              {showCode ? <EyeOff size={12} /> : <Eye size={12} />}
              <Code2 size={12} />
              {showCode ? 'Hide Code' : 'Show Code'}
            </button>
            {showCode && (
              <div className="space-y-3 animate-fade-in">
                <CodeBlock code={question.code} />
                <div className="bg-raised border border-edge rounded-lg p-3">
                  <h5 className="text-[10px] font-mono text-ink-muted mb-1">OUTPUT</h5>
                  <p className="text-sm text-ink-secondary font-mono whitespace-pre-wrap">{question.output}</p>
                </div>
              </div>
            )}
          </div>

          <div>
            <button
              onClick={() => setShowInterpretation(s => !s)}
              className="flex items-center gap-1.5 text-xs font-mono text-s4 hover:text-s4/80 transition-colors duration-150 mb-2 cursor-pointer"
            >
              {showInterpretation ? <EyeOff size={12} /> : <Eye size={12} />}
              {showInterpretation ? 'Hide Interpretation' : 'Show Interpretation'}
            </button>
            {showInterpretation && (
              <div className="space-y-3 animate-fade-in">
                <p className="text-sm text-ink-secondary leading-relaxed border-l-2 border-s4/50 pl-3">
                  {question.interpretation}
                </p>
                <div className="text-xs text-ink-muted italic">
                  Note: On the exam, you must write your own interpretation. GenAI cannot produce final analytical conclusions per the IS630 policy.
                </div>
              </div>
            )}
          </div>

          <div>
            <h4 className="text-xs font-mono text-wrong mb-2 flex items-center gap-1.5">
              <AlertTriangle size={12} /> Common Mistakes
            </h4>
            <ul className="space-y-1.5">
              {question.commonMistakes.map((mistake, i) => (
                <li key={i} className="text-sm text-ink-secondary flex items-start gap-2">
                  <span className="text-wrong/60 mt-1 shrink-0">•</span>
                  <span>{mistake}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-wrap gap-1.5 pt-2 border-t border-edge">
            {question.tags.map(tag => (
              <span key={tag} className="text-[10px] font-mono px-2 py-0.5 bg-raised text-ink-muted rounded border border-edge">
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function CheatSheetTable({ sheet }: { readonly sheet: CheatSheet }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="bg-surface border border-edge rounded-lg overflow-hidden">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center gap-3 p-4 text-left hover:bg-raised transition-colors duration-150 cursor-pointer"
      >
        <span className="text-s3 shrink-0"><BookOpen size={16} /></span>
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-semibold text-ink">{sheet.title}</h4>
          <p className="text-xs text-ink-muted">{sheet.description}</p>
        </div>
        {open
          ? <ChevronDown size={14} className="text-ink-muted shrink-0" />
          : <ChevronRight size={14} className="text-ink-muted shrink-0" />
        }
      </button>
      {open && (
        <div className="border-t border-edge overflow-x-auto animate-fade-in">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-raised">
                {sheet.headers.map(h => (
                  <th key={h} className="px-4 py-2.5 text-left text-[10px] font-mono text-ink-muted uppercase tracking-wider">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sheet.rows.map((row, i) => (
                <tr key={i} className="border-t border-edge hover:bg-raised/50 transition-colors duration-100">
                  {row.cells.map((cell, j) => (
                    <td key={j} className={`px-4 py-2.5 ${j === 0 ? 'font-mono text-glow/80' : 'text-ink-secondary'}`}>
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

function DecisionTree() {
  const [currentId, setCurrentId] = useState('start')
  const [history, setHistory] = useState<readonly string[]>([])

  const currentNode = testSelectionTree.find(n => n.id === currentId)
  const isResult = (value: string) => value.startsWith('RESULT:')

  const handleAnswer = (nextId: string) => {
    setHistory(prev => [...prev, currentId])
    setCurrentId(nextId)
  }

  const handleBack = () => {
    if (history.length === 0) return
    const prev = history[history.length - 1]
    setHistory(h => h.slice(0, -1))
    setCurrentId(prev)
  }

  const handleReset = () => {
    setCurrentId('start')
    setHistory([])
  }

  const breadcrumb = history.map(id => {
    const node = testSelectionTree.find(n => n.id === id)
    return node?.question ?? id
  })

  return (
    <div className="bg-surface border border-edge rounded-lg p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-ink flex items-center gap-2">
          <GitBranch size={18} className="text-glow" />
          Which Test Should I Use?
        </h3>
        <button
          onClick={handleReset}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-ink-secondary bg-raised border border-edge rounded-lg hover:text-ink hover:border-edge-bright transition-all duration-150 cursor-pointer"
        >
          <RotateCcw size={12} />
          Start Over
        </button>
      </div>

      {breadcrumb.length > 0 && (
        <div className="flex flex-wrap items-center gap-1 text-[10px] font-mono text-ink-faint mb-4">
          {breadcrumb.map((q, i) => (
            <span key={i} className="flex items-center gap-1">
              {i > 0 && <ChevronRight size={10} />}
              <span className="truncate max-w-[180px]">{q}</span>
            </span>
          ))}
        </div>
      )}

      {isResult(currentId) ? (
        <div className="animate-fade-in">
          <div className="bg-glow-dim border border-glow/30 rounded-lg p-4 mb-4">
            <h4 className="text-xs font-mono text-glow mb-2">RECOMMENDED TEST</h4>
            <p className="text-sm text-ink font-medium leading-relaxed">
              {currentId.replace('RESULT: ', '')}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleBack}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-ink-secondary bg-raised border border-edge rounded-lg hover:text-ink hover:border-edge-bright transition-all duration-150 cursor-pointer"
            >
              Go Back
            </button>
            <button
              onClick={handleReset}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-glow bg-glow-dim border border-glow/30 rounded-lg hover:bg-glow/20 transition-all duration-150 cursor-pointer"
            >
              Start Over
            </button>
          </div>
        </div>
      ) : currentNode ? (
        <div className="animate-fade-in">
          <p className="text-sm text-ink font-medium mb-4 leading-relaxed">
            {currentNode.question}
          </p>
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => handleAnswer(currentNode.yes)}
              className="px-4 py-2 text-sm bg-glow-dim text-glow border border-glow/30 rounded-lg hover:bg-glow/20 transition-all duration-150 cursor-pointer"
            >
              Yes
            </button>
            <button
              onClick={() => handleAnswer(currentNode.no)}
              className="px-4 py-2 text-sm bg-raised text-ink-secondary border border-edge rounded-lg hover:text-ink hover:border-edge-bright transition-all duration-150 cursor-pointer"
            >
              No
            </button>
            {history.length > 0 && (
              <button
                onClick={handleBack}
                className="ml-2 px-3 py-2 text-xs text-ink-muted hover:text-ink transition-colors duration-150 cursor-pointer"
              >
                ← Back
              </button>
            )}
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default function MidtermExam() {
  const [filter, setFilter] = useState<SessionFilter>('all')
  const [order, setOrder] = useState<readonly number[]>([])
  const [expandedIds, setExpandedIds] = useState<ReadonlySet<number>>(new Set())
  const [showTree, setShowTree] = useState(true)
  const [showCheatSheets, setShowCheatSheets] = useState(true)

  const filtered = useMemo(() => {
    const base = filter === 'all'
      ? examQuestions
      : examQuestions.filter(q => q.session === filter)

    if (order.length > 0) {
      const idSet = new Set(base.map(q => q.id))
      const validOrder = order.filter(id => idSet.has(id))
      const lookup = new Map(base.map(q => [q.id, q]))
      return validOrder.map(id => lookup.get(id)!).filter(Boolean)
    }

    return base
  }, [filter, order])

  const toggleExpand = (id: number) => {
    setExpandedIds(prev => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }

  const handleShuffle = () => {
    const base = filter === 'all'
      ? examQuestions
      : examQuestions.filter(q => q.session === filter)
    setOrder(shuffleArray(base.map(q => q.id)))
    setExpandedIds(new Set())
  }

  const handleReset = () => {
    setOrder([])
    setExpandedIds(new Set())
  }

  const handleExpandAll = () => {
    setExpandedIds(new Set(filtered.map(q => q.id)))
  }

  const handleCollapseAll = () => {
    setExpandedIds(new Set())
  }

  const sessionCounts = useMemo(() => {
    const counts: Record<number, number> = {}
    for (const q of examQuestions) {
      counts[q.session] = (counts[q.session] ?? 0) + 1
    }
    return counts
  }, [])

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-3xl font-bold text-ink tracking-tight">Midterm Exam Guide</h1>
        <div className="flex items-center gap-2">
          <button
            onClick={handleShuffle}
            className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-ink-secondary bg-surface border border-edge rounded-lg hover:bg-raised hover:text-ink hover:border-edge-bright transition-all duration-150 cursor-pointer"
          >
            <Shuffle size={14} />
            Shuffle
          </button>
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-ink-secondary bg-surface border border-edge rounded-lg hover:bg-raised hover:text-ink hover:border-edge-bright transition-all duration-150 cursor-pointer"
          >
            <RotateCcw size={14} />
            Reset
          </button>
        </div>
      </div>

      <p className="text-ink-muted mb-6">
        Scenario-based exam preparation derived from lab solutions. Each question walks through
        scenario → task → required stats knowledge → Python code → output → interpretation.
      </p>

      <div className="flex items-center gap-2 mb-4 flex-wrap">
        {sessionFilters.map(({ label, value }) => (
          <button
            key={label}
            onClick={() => {
              setFilter(value)
              setOrder([])
              setExpandedIds(new Set())
            }}
            className={`px-3 py-1.5 text-sm rounded-lg transition-all duration-150 cursor-pointer ${
              filter === value
                ? 'bg-glow-dim text-glow border border-glow/30 shadow-[0_0_12px_rgba(74,222,128,0.1)]'
                : 'bg-surface text-ink-secondary border border-edge hover:bg-raised hover:text-ink'
            }`}
          >
            {label}
            {value !== 'all' && (
              <span className="ml-1.5 text-[10px] font-mono opacity-60">
                {sessionCounts[value as number] ?? 0}
              </span>
            )}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={handleExpandAll}
          className="text-xs text-ink-muted hover:text-ink transition-colors duration-150 cursor-pointer"
        >
          Expand all
        </button>
        <span className="text-ink-faint">·</span>
        <button
          onClick={handleCollapseAll}
          className="text-xs text-ink-muted hover:text-ink transition-colors duration-150 cursor-pointer"
        >
          Collapse all
        </button>
        <span className="text-ink-faint">·</span>
        <span className="text-xs text-ink-faint font-mono">{filtered.length} questions</span>
      </div>

      <div className="mb-6">
        <button
          onClick={() => setShowTree(s => !s)}
          className="flex items-center gap-2 text-sm font-medium text-glow hover:text-glow-hover transition-colors duration-150 mb-3 cursor-pointer"
        >
          <GitBranch size={16} />
          {showTree ? 'Hide' : 'Show'} Test Selection Decision Tree
          {showTree ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
        </button>
        {showTree && <DecisionTree />}
      </div>

      <div className="mb-6">
        <button
          onClick={() => setShowCheatSheets(s => !s)}
          className="flex items-center gap-2 text-sm font-medium text-s3 hover:text-s3/80 transition-colors duration-150 mb-3 cursor-pointer"
        >
          <BookOpen size={16} />
          {showCheatSheets ? 'Hide' : 'Show'} Cheat Sheets
          {showCheatSheets ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
        </button>
        {showCheatSheets && (
          <div className="space-y-3 animate-fade-in">
            {cheatSheets.map(sheet => (
              <CheatSheetTable key={sheet.id} sheet={sheet} />
            ))}
          </div>
        )}
      </div>

      <div className="space-y-3">
        {filtered.map((q, idx) => (
          <QuestionCard
            key={q.id}
            question={q}
            index={idx}
            expanded={expandedIds.has(q.id)}
            onToggle={() => toggleExpand(q.id)}
          />
        ))}
      </div>
    </div>
  )
}
