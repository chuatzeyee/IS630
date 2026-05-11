import { useState, useMemo } from 'react'
import { snippets } from '../data/snippets'

type SessionFilter = 'all' | 1 | 2 | 3 | 4 | 5

const sessionFilters: readonly { readonly label: string; readonly value: SessionFilter }[] = [
  { label: 'All', value: 'all' },
  { label: 'Session 1', value: 1 },
  { label: 'Session 2', value: 2 },
  { label: 'Session 3', value: 3 },
  { label: 'Session 4', value: 4 },
  { label: 'Session 5', value: 5 },
]

const sessionBadgeColors: Record<number, string> = {
  1: 'bg-s1/10 text-s1 border-s1/25',
  2: 'bg-s2/10 text-s2 border-s2/25',
  3: 'bg-s3/10 text-s3 border-s3/25',
  4: 'bg-s4/10 text-s4 border-s4/25',
  5: 'bg-s5/10 text-s5 border-s5/25',
}

export default function Snippets() {
  const [filter, setFilter] = useState<SessionFilter>('all')

  const filtered = useMemo(() => {
    if (filter === 'all') return snippets
    return snippets.filter((s) => s.session === filter)
  }, [filter])

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold text-ink mb-2 tracking-tight">Snippets</h1>
      <p className="text-ink-muted mb-6">
        Python code snippets for common statistical operations.
      </p>

      <div className="flex items-center gap-2 mb-6 flex-wrap">
        {sessionFilters.map(({ label, value }) => (
          <button
            key={label}
            onClick={() => setFilter(value)}
            className={`px-3 py-1.5 text-sm rounded-lg transition-all duration-150 cursor-pointer ${
              filter === value
                ? 'bg-glow-dim text-glow border border-glow/30 shadow-[0_0_12px_rgba(74,222,128,0.1)]'
                : 'bg-surface text-ink-secondary border border-edge hover:bg-raised hover:text-ink'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="flex items-center justify-between mb-4">
        <span className="text-xs text-ink-faint font-mono">
          {filtered.length} of {snippets.length} snippets
        </span>
      </div>

      <div className="space-y-4">
        {filtered.map((snippet, idx) => (
          <div
            key={snippet.id}
            className="bg-surface border border-edge rounded-lg p-5 animate-fade-in"
            style={{ animationDelay: `${Math.min(idx * 40, 400)}ms`, animationFillMode: 'both' }}
          >
            <div className="flex items-start justify-between gap-3 mb-3">
              <div>
                <h3 className="font-semibold text-ink">{snippet.title}</h3>
                {snippet.description && (
                  <p className="text-ink-secondary text-sm mt-1">{snippet.description}</p>
                )}
              </div>
              <span
                className={`flex-shrink-0 text-xs font-mono px-2 py-0.5 rounded-full border ${
                  sessionBadgeColors[snippet.session] ?? 'bg-surface text-ink-muted border-edge'
                }`}
              >
                S{snippet.session}
              </span>
            </div>

            <pre className="bg-base border border-edge rounded-lg p-4 text-sm font-mono text-glow/90 overflow-x-auto whitespace-pre">
              {snippet.code}
            </pre>
          </div>
        ))}
      </div>
    </div>
  )
}
