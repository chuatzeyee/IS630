import { Link } from 'react-router-dom'
import { BookOpen, List, Code2, FlaskConical, ArrowRight } from 'lucide-react'
import { sessions } from '../data/topics'
import { definitions } from '../data/definitions'
import { snippets } from '../data/snippets'
import { questions } from '../data/questions'

const cards = [
  {
    to: '/topics',
    icon: BookOpen,
    title: 'Topics',
    description: 'Key concepts organized by session with collapsible sections',
    count: sessions.reduce((sum, s) => sum + s.topics.length, 0),
    unit: 'topics',
  },
  {
    to: '/definitions',
    icon: List,
    title: 'Definitions',
    description: 'Searchable glossary of statistical terms and concepts',
    count: definitions.length,
    unit: 'terms',
  },
  {
    to: '/snippets',
    icon: Code2,
    title: 'Snippets',
    description: 'Python code snippets for common statistical operations',
    count: snippets.length,
    unit: 'snippets',
  },
  {
    to: '/practice',
    icon: FlaskConical,
    title: 'Practice',
    description: 'Interactive quiz with score tracking and session filters',
    count: questions.length,
    unit: 'questions',
  },
] as const

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="text-center mb-12 animate-fade-in">
        <div className="mb-6">
          <svg viewBox="0 0 200 200" className="w-28 h-28 mx-auto drop-shadow-[0_0_24px_rgba(74,222,128,0.25)]" aria-label="StudyComrade logo">
            <circle cx="100" cy="100" r="95" fill="none" stroke="currentColor" className="text-glow/30" strokeWidth="3" />
            <circle cx="100" cy="100" r="85" fill="none" stroke="currentColor" className="text-glow/15" strokeWidth="1" />
            <polygon
              points="100,28 112,68 154,68 120,90 132,130 100,106 68,130 80,90 46,68 88,68"
              fill="currentColor"
              className="text-glow"
              opacity="0.9"
            />
            <line x1="70" y1="170" x2="120" y2="110" stroke="currentColor" className="text-glow" strokeWidth="5" strokeLinecap="round" />
            <rect x="108" y="96" width="28" height="12" rx="2" fill="currentColor" className="text-glow" transform="rotate(-42 122 102)" />
            <path d="M 130 170 Q 160 140 150 110 Q 145 95 130 90" fill="none" stroke="currentColor" className="text-glow" strokeWidth="5" strokeLinecap="round" />
            <line x1="130" y1="170" x2="118" y2="182" stroke="currentColor" className="text-glow" strokeWidth="5" strokeLinecap="round" />
          </svg>
        </div>
        <div className="inline-block mb-4">
          <span className="text-xs font-mono text-glow bg-glow-dim px-3 py-1 rounded-full border border-glow/20">
            ☭ v1.0 — 5 Sessions
          </span>
        </div>
        <h1 className="text-4xl font-bold text-ink mb-2 tracking-tight">
          IS630 StudyComrade
        </h1>
        <p className="text-lg text-glow font-medium mb-6 font-mono tracking-wide">
          Our Statistical Means of Production
        </p>
        <p className="text-ink-secondary max-w-2xl mx-auto leading-relaxed">
          A comradely study resource for SMU IS630 covering statistical
          thinking for data science. Explore key topics from each session,
          review definitions, reference Python code snippets, and test your
          knowledge with interactive practice quizzes.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {cards.map(({ to, icon: Icon, title, description, count, unit }, i) => (
          <Link
            key={to}
            to={to}
            className="group bg-surface border border-edge rounded-lg p-6 hover:border-glow/30 hover:bg-raised transition-all duration-200 animate-fade-in"
            style={{ animationDelay: `${i * 80}ms`, animationFillMode: 'both' }}
          >
            <div className="flex items-start gap-4">
              <div className="p-2.5 bg-glow-dim rounded-lg text-glow group-hover:bg-glow/15 transition-colors duration-200">
                <Icon size={24} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h2 className="text-lg font-semibold text-ink">
                    {title}
                  </h2>
                  <ArrowRight
                    size={16}
                    className="text-ink-faint group-hover:text-glow group-hover:translate-x-1 transition-all duration-200"
                  />
                </div>
                <p className="text-sm text-ink-secondary mb-3">{description}</p>
                <span className="text-xs font-medium text-glow bg-glow-dim px-2.5 py-1 rounded-full font-mono border border-glow/10">
                  {count} {unit}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
