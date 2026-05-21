import { Link } from 'react-router-dom'
import { BookOpen, List, Code2, FlaskConical, GraduationCap, ClipboardCheck, Calculator, ArrowRight } from 'lucide-react'
import { sessions } from '../data/topics'
import { definitions } from '../data/definitions'
import { snippets } from '../data/snippets'
import { questions } from '../data/questions'
import { examQuestions } from '../data/midterm'
import { mockQuestions } from '../data/mockExam'
import { formulaCount } from '../data/formulas'

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
  {
    to: '/midterm',
    icon: GraduationCap,
    title: 'Midterm Exam',
    description: 'Scenario-based exam prep with code walkthroughs and a test-selection decision tree',
    count: examQuestions.length,
    unit: 'scenarios',
  },
  {
    to: '/mock',
    icon: ClipboardCheck,
    title: 'Mock Exam',
    description: 'Timed mock mid-term with MCQ, multi-select, and short answer sections',
    count: mockQuestions.length,
    unit: 'questions',
  },
  {
    to: '/formulas',
    icon: Calculator,
    title: 'Formula Sheet',
    description: 'Key statistical formulas with variable definitions, Python code, and common gotchas',
    count: formulaCount,
    unit: 'formulas',
  },
] as const

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="text-center mb-12 animate-fade-in">
        <div className="inline-block mb-4">
          <span className="text-xs font-mono text-glow bg-glow-dim px-3 py-1 rounded-full border border-glow/20">
            SMU MITB
          </span>
        </div>
        <h1 className="text-4xl font-bold text-ink mb-2 tracking-tight">
          ☭ IS630 StudyComrade
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
