import { useState, useRef, useEffect, useMemo } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { ChevronDown, Lightbulb, AlertTriangle, BookOpen, Search, X } from 'lucide-react'
import { sessions } from '../data/topics'
import type { Topic } from '../data/topics'
import { definitions } from '../data/definitions'

function AnimatedPanel({ isOpen, children }: { readonly isOpen: boolean; readonly children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const [height, setHeight] = useState<number | undefined>(isOpen ? undefined : 0)

  useEffect(() => {
    if (!ref.current) return
    if (isOpen) {
      setHeight(ref.current.scrollHeight)
      const timer = setTimeout(() => setHeight(undefined), 250)
      return () => clearTimeout(timer)
    } else {
      setHeight(ref.current.scrollHeight)
      requestAnimationFrame(() => setHeight(0))
    }
  }, [isOpen])

  return (
    <div
      style={{ height: height === undefined ? 'auto' : height, overflow: 'hidden' }}
      className="transition-[height,opacity] duration-250 ease-in-out"
    >
      <div ref={ref} className={isOpen ? 'opacity-100' : 'opacity-0'} style={{ transition: 'opacity 0.2s ease-in-out' }}>
        {children}
      </div>
    </div>
  )
}

function TermPill({ term }: { readonly term: string }) {
  return (
    <Link
      to={`/topics?view=definitions&q=${encodeURIComponent(term)}`}
      className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-mono bg-glow-dim/50 text-glow border border-glow/15 rounded hover:bg-glow-dim hover:border-glow/30 transition-colors"
    >
      <BookOpen size={10} />
      {term}
    </Link>
  )
}

function TopicCard({ topic, index }: { readonly topic: Topic; readonly index: number }) {
  const [isOpen, setIsOpen] = useState(true)

  const hasLinks = topic.relatedTerms && topic.relatedTerms.length > 0

  return (
    <div
      className="bg-surface border border-edge rounded-lg overflow-hidden animate-fade-in"
      style={{ animationDelay: `${Math.min(index * 40, 300)}ms`, animationFillMode: 'both' }}
    >
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-full flex items-center gap-3 px-5 py-3.5 text-left hover:bg-raised transition-colors duration-150 cursor-pointer"
      >
        <div className={`transition-transform duration-200 ${isOpen ? 'rotate-0' : '-rotate-90'}`}>
          <ChevronDown size={16} className={isOpen ? 'text-glow' : 'text-ink-muted'} />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-semibold text-ink">{topic.title}</h3>
          {topic.summary && !isOpen && (
            <p className="text-xs text-ink-muted mt-0.5 truncate">{topic.summary}</p>
          )}
        </div>
        <span className="text-xs text-ink-faint font-mono flex-shrink-0">
          {topic.points.length} pts
        </span>
      </button>

      <AnimatedPanel isOpen={isOpen}>
        <div className="px-5 pb-4 border-t border-edge">
          {topic.summary && (
            <p className="text-sm text-ink-secondary mt-3 mb-3 leading-relaxed">
              {topic.summary}
            </p>
          )}

          <ul className="space-y-1.5 mt-2">
            {topic.points.map((point, i) => (
              <li key={i} className="text-sm text-ink-secondary flex items-start gap-2">
                <span className="mt-1.5 flex-shrink-0 w-1 h-1 rounded-full bg-glow/50" />
                {point}
              </li>
            ))}
          </ul>

          {topic.tip && (
            <div className="mt-4 flex items-start gap-2.5 px-3.5 py-3 rounded-lg bg-glow-dim/30 border border-glow/15">
              <Lightbulb size={14} className="text-glow flex-shrink-0 mt-0.5" />
              <p className="text-xs text-glow/90 leading-relaxed">{topic.tip}</p>
            </div>
          )}

          {topic.important && (
            <div className="mt-3 flex items-start gap-2.5 px-3.5 py-3 rounded-lg bg-[#422006]/40 border border-[#f59e0b]/15">
              <AlertTriangle size={14} className="text-[#fbbf24] flex-shrink-0 mt-0.5" />
              <p className="text-xs text-[#fbbf24]/90 leading-relaxed">{topic.important}</p>
            </div>
          )}

          {hasLinks && (
            <div className="mt-4 pt-3 border-t border-edge/50 flex flex-wrap gap-1.5">
              {topic.relatedTerms?.map((term) => (
                <TermPill key={term} term={term} />
              ))}
            </div>
          )}
        </div>
      </AnimatedPanel>
    </div>
  )
}

function TopicsView() {
  const [activeSession, setActiveSession] = useState(1)

  const session = sessions.find((s) => s.id === activeSession)!

  const sessionColors = [
    'bg-s1/10 text-s1 border-s1/25',
    'bg-s2/10 text-s2 border-s2/25',
    'bg-s3/10 text-s3 border-s3/25',
    'bg-s4/10 text-s4 border-s4/25',
    'bg-s5/10 text-s5 border-s5/25',
  ]

  const sessionColorsInactive = [
    'hover:text-s1',
    'hover:text-s2',
    'hover:text-s3',
    'hover:text-s4',
    'hover:text-s5',
  ]

  return (
    <div className="animate-fade-in">
      <div className="flex gap-2 mb-6 flex-wrap">
        {sessions.map((s) => (
          <button
            key={s.id}
            onClick={() => setActiveSession(s.id)}
            className={`px-3.5 py-2 text-sm rounded-lg transition-all duration-150 cursor-pointer border ${
              activeSession === s.id
                ? sessionColors[s.id - 1]
                : `bg-surface text-ink-muted border-edge hover:bg-raised ${sessionColorsInactive[s.id - 1]}`
            }`}
          >
            <span className="font-mono text-xs mr-1.5">S{s.id}</span>
            {s.title.replace(/^Session \d+: /, '')}
          </button>
        ))}
      </div>

      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-ink">{session.title}</h2>
        <span className="text-xs text-ink-faint font-mono">
          {session.topics.length} topics
        </span>
      </div>

      <div className="space-y-3">
        {session.topics.map((topic, idx) => (
          <TopicCard key={topic.title} topic={topic} index={idx} />
        ))}
      </div>
    </div>
  )
}

function highlightText(text: string, query: string): React.ReactNode {
  if (!query.trim()) return text
  const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi')
  const parts = text.split(regex)
  return parts.map((part, i) =>
    regex.test(part) ? (
      <mark key={i} className="highlight-match">{part}</mark>
    ) : (
      part
    )
  )
}

function DefinitionsView() {
  const [searchParams] = useSearchParams()
  const [query, setQuery] = useState(() => searchParams.get('q') ?? '')

  useEffect(() => {
    const q = searchParams.get('q')
    if (q) setQuery(q)
  }, [searchParams])

  const filtered = useMemo(() => {
    const lower = query.toLowerCase().trim()
    if (!lower) return definitions
    return definitions.filter(
      (d) =>
        d.term.toLowerCase().includes(lower) ||
        d.description.toLowerCase().includes(lower)
    )
  }, [query])

  return (
    <div className="animate-fade-in">
      <div className="relative mb-8 group">
        <Search
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted group-focus-within:text-glow transition-colors"
        />
        <input
          type="text"
          placeholder="Search terms..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full pl-10 pr-10 py-2.5 bg-raised border border-edge rounded-lg text-sm text-ink placeholder:text-ink-muted focus:outline-none focus:ring-1 focus:ring-glow/50 focus:border-glow/50 transition-all duration-200"
        />
        {query && (
          <button
            onClick={() => setQuery('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-muted hover:text-ink transition-colors cursor-pointer"
          >
            <X size={16} />
          </button>
        )}
      </div>

      <div className="flex items-center justify-between mb-4">
        <span className="text-xs text-ink-faint font-mono">
          {filtered.length} of {definitions.length} terms
          {query && ` matching "${query}"`}
        </span>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-16 animate-fade-in">
          <p className="text-ink-muted mb-2">No matching terms found.</p>
          <button
            onClick={() => setQuery('')}
            className="text-sm text-glow hover:text-glow-hover cursor-pointer transition-colors"
          >
            Clear search
          </button>
        </div>
      ) : (
        <div className="space-y-2">
          {filtered.map((def, i) => (
            <div
              key={def.term}
              className="bg-surface border border-edge rounded-lg px-5 py-4 hover:border-edge-bright hover:bg-raised/50 transition-all duration-150 animate-fade-in"
              style={{ animationDelay: `${Math.min(i * 30, 300)}ms`, animationFillMode: 'both' }}
            >
              <dt className="text-sm font-semibold text-glow mb-1 font-mono">
                {highlightText(def.term, query)}
              </dt>
              <dd className="text-sm text-ink-secondary leading-relaxed">
                {highlightText(def.description, query)}
              </dd>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

type View = 'topics' | 'definitions'

export default function Topics() {
  const [searchParams, setSearchParams] = useSearchParams()
  const view: View = searchParams.get('view') === 'definitions' ? 'definitions' : 'topics'

  const setView = (v: View) => {
    const next = new URLSearchParams(searchParams)
    if (v === 'topics') {
      next.delete('view')
      next.delete('q')
    } else {
      next.set('view', v)
    }
    setSearchParams(next)
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold text-ink mb-2 tracking-tight">Topics &amp; Definitions</h1>
      <p className="text-ink-muted mb-6">
        Key concepts organized by session, plus a searchable glossary of terms.
      </p>

      <div className="flex items-center gap-2 mb-6">
        <button
          onClick={() => setView('topics')}
          className={`flex items-center gap-1.5 px-4 py-2 text-sm rounded-lg transition-all duration-150 cursor-pointer ${
            view === 'topics'
              ? 'bg-glow-dim text-glow border border-glow/30 shadow-[0_0_12px_rgba(74,222,128,0.08)]'
              : 'bg-surface text-ink-secondary border border-edge hover:bg-raised hover:text-ink'
          }`}
        >
          <BookOpen size={15} />
          Topics
        </button>
        <button
          onClick={() => setView('definitions')}
          className={`flex items-center gap-1.5 px-4 py-2 text-sm rounded-lg transition-all duration-150 cursor-pointer ${
            view === 'definitions'
              ? 'bg-glow-dim text-glow border border-glow/30 shadow-[0_0_12px_rgba(74,222,128,0.08)]'
              : 'bg-surface text-ink-secondary border border-edge hover:bg-raised hover:text-ink'
          }`}
        >
          <Search size={15} />
          Definitions
        </button>
      </div>

      {view === 'topics' ? <TopicsView /> : <DefinitionsView />}
    </div>
  )
}
