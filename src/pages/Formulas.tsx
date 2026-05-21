import { useState } from 'react'
import {
  ChevronDown,
  ChevronRight,
  AlertTriangle,
  Terminal,
  Search,
} from 'lucide-react'
import { formulaCategories, type Formula, type FormulaCategory } from '../data/formulas'

function FormulaCard({ formula }: { readonly formula: Formula }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="bg-surface border border-edge rounded-lg overflow-hidden">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-start gap-3 p-4 text-left hover:bg-raised transition-colors duration-150 cursor-pointer"
      >
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-semibold text-ink mb-1">{formula.name}</h4>
          <p className="text-base font-mono text-glow leading-relaxed">{formula.formula}</p>
        </div>
        {open
          ? <ChevronDown size={14} className="text-ink-muted shrink-0 mt-1" />
          : <ChevronRight size={14} className="text-ink-muted shrink-0 mt-1" />
        }
      </button>

      {open && (
        <div className="border-t border-edge px-4 pb-4 pt-3 space-y-3 animate-fade-in">
          <p className="text-sm text-ink-secondary leading-relaxed">{formula.description}</p>

          {formula.variables.length > 0 && (
            <div>
              <h5 className="text-[10px] font-mono text-ink-muted uppercase tracking-wider mb-1.5">Variables</h5>
              <ul className="space-y-0.5">
                {formula.variables.map(v => (
                  <li key={v} className="text-sm text-ink-secondary font-mono flex items-start gap-2">
                    <span className="text-glow/50 mt-0.5 shrink-0">·</span>
                    <span>{v}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {formula.pythonCode && (
            <div>
              <h5 className="text-[10px] font-mono text-ink-muted uppercase tracking-wider mb-1.5 flex items-center gap-1">
                <Terminal size={10} /> Python
              </h5>
              <pre className="bg-void border border-edge rounded-lg p-3 overflow-x-auto text-sm font-mono text-glow/80 leading-relaxed">
                {formula.pythonCode}
              </pre>
            </div>
          )}

          {formula.gotcha && (
            <div className="flex items-start gap-2 bg-amber-950/30 border border-amber-400/20 rounded-lg p-3">
              <AlertTriangle size={14} className="text-amber-400 shrink-0 mt-0.5" />
              <p className="text-sm text-amber-300/90 leading-relaxed">{formula.gotcha}</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

function CategorySection({ category }: { readonly category: FormulaCategory }) {
  const [open, setOpen] = useState(true)

  return (
    <section>
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center gap-3 mb-3 text-left cursor-pointer group"
      >
        {open
          ? <ChevronDown size={16} className="text-glow shrink-0" />
          : <ChevronRight size={16} className="text-glow shrink-0" />
        }
        <div className="flex-1 min-w-0">
          <h2 className="text-lg font-semibold text-ink group-hover:text-glow transition-colors duration-150">
            {category.title}
          </h2>
          <p className="text-xs text-ink-muted">{category.description}</p>
        </div>
        <span className="text-[10px] font-mono text-ink-faint bg-raised px-2 py-0.5 rounded-full border border-edge shrink-0">
          {category.formulas.length}
        </span>
      </button>

      {open && (
        <div className="space-y-2 ml-7 animate-fade-in">
          {category.formulas.map(f => (
            <FormulaCard key={f.name} formula={f} />
          ))}
        </div>
      )}
    </section>
  )
}

export default function Formulas() {
  const [search, setSearch] = useState('')

  const filtered = search.trim() === ''
    ? formulaCategories
    : formulaCategories
        .map(cat => ({
          ...cat,
          formulas: cat.formulas.filter(f => {
            const q = search.toLowerCase()
            return (
              f.name.toLowerCase().includes(q) ||
              f.formula.toLowerCase().includes(q) ||
              f.description.toLowerCase().includes(q) ||
              (f.pythonCode?.toLowerCase().includes(q) ?? false)
            )
          }),
        }))
        .filter(cat => cat.formulas.length > 0)

  const totalVisible = filtered.reduce((sum, cat) => sum + cat.formulas.length, 0)

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold text-ink tracking-tight mb-2">Formula Sheet</h1>
      <p className="text-ink-muted mb-6">
        Key statistical formulas with Python code, variable definitions, and common gotchas.
      </p>

      <div className="relative mb-6">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-faint" />
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search formulas... (e.g. standard error, binomial, CI)"
          className="w-full pl-10 pr-4 py-2.5 bg-surface border border-edge rounded-lg text-sm text-ink placeholder:text-ink-faint focus:outline-none focus:border-glow/40 focus:ring-1 focus:ring-glow/20 transition-all duration-150"
        />
        {search && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-mono text-ink-faint">
            {totalVisible} result{totalVisible !== 1 ? 's' : ''}
          </span>
        )}
      </div>

      <div className="space-y-8">
        {filtered.map(cat => (
          <CategorySection key={cat.id} category={cat} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12 text-ink-muted">
          <p className="text-sm">No formulas match "{search}"</p>
        </div>
      )}
    </div>
  )
}
