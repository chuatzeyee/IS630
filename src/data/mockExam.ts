export type QuestionType = 'mcq' | 'multi-select' | 'short-answer'

export interface MockQuestion {
  readonly id: number
  readonly section: 'A' | 'B' | 'C'
  readonly marks: number
  readonly question: string
  readonly type: QuestionType
  readonly options?: readonly string[]
  readonly correctIndex?: number
  readonly correctIndices?: readonly number[]
  readonly answer?: string
  readonly tolerance?: number
  readonly hint?: string
  readonly context?: string
}

export const mockQuestions: readonly MockQuestion[] = [
  // ─── Section A: Multiple Choice (5 questions, 5 marks) ──────────────
  {
    id: 1,
    section: 'A',
    marks: 1,
    question: 'A meteorologist wants to model the chance of rain tomorrow given that it rained today. Which of the following concepts best applies?',
    type: 'mcq',
    options: [
      'Marginal Probability',
      'Conditional Probability',
      'Independent Events',
      'Mutually Exclusive Events',
    ],
    correctIndex: 1,
    hint: 'The phrase "given that" is the key indicator — P(rain tomorrow | rained today).',
  },
  {
    id: 2,
    section: 'A',
    marks: 1,
    question: 'Suppose there is an equal probability of giving birth to a boy or a girl. Your neighbour has two kids, but you do not know their gender. One day, you saw one of his kids, who is a boy. What is the probability that his other kid is also a boy?',
    type: 'mcq',
    options: ['1/8', '1/4', '1/3', '1/2'],
    correctIndex: 2,
    hint: 'The sample space for two children is {BB, BG, GB, GG}. Given at least one boy, eliminate GG → {BB, BG, GB}. Only BB has the other child as a boy: 1/3.',
  },
  {
    id: 3,
    section: 'A',
    marks: 1,
    question: 'Can two events A and B be both mutually exclusive and independent?',
    type: 'mcq',
    options: [
      'Yes, for all cases',
      'Yes, only if at least P(A) or P(B) is zero',
      'Yes, only if P(A) and P(B) are BOTH zero',
      'No, for all cases',
    ],
    correctIndex: 1,
    hint: 'Mutually exclusive: P(A∩B) = 0. Independent: P(A∩B) = P(A)·P(B). Both hold only if P(A)·P(B) = 0, i.e., at least one has probability zero.',
  },
  {
    id: 4,
    section: 'A',
    marks: 1,
    question: 'Customers are known to arrive at a burger shop following a Poisson distribution at a rate of 2 customers per hour. You are given that `dist = scipy.stats.poisson(mu=2)`. Which expression below computes the probability that at most 3 customers arrive in the first hour?',
    type: 'mcq',
    options: [
      'dist.pmf(3)',
      'dist.ppf(3)',
      'dist.cdf(3)',
      'dist.sf(3)',
    ],
    correctIndex: 2,
    hint: '"At most 3" means P(X ≤ 3) — that is the CDF. pmf gives P(X = 3), ppf is inverse CDF, sf gives P(X > 3).',
  },
  {
    id: 5,
    section: 'A',
    marks: 1,
    question: 'X follows a normal distribution N(3, 8). Which of the following statements is FALSE?',
    type: 'mcq',
    options: [
      'P(X < 2) < P(X < 3)',
      'P(X < 2) = P(X > 4)',
      'P(X > 3) = 0.5',
      'P(X < 4) < 0.5',
    ],
    correctIndex: 3,
    hint: 'N(3, 8) means μ=3, σ²=8. P(X > 3) = 0.5 by symmetry ✓. P(X < 2) = P(X > 4) by symmetry ✓. P(X < 4) > 0.5 since 4 > μ, so D is FALSE.',
  },

  // ─── Section B: Multi-select (1 question, 2 marks) ──────────────────
  {
    id: 6,
    section: 'B',
    marks: 2,
    question: 'The lifetime (in hours) of a certain type of light bulb follows an exponential distribution with a mean of 10 hours. Let X be the lifetime of a bulb. Which of the following statement(s) is/are TRUE? (Select all that apply)',
    type: 'multi-select',
    options: [
      'The rate parameter λ = 10',
      'The probability that a bulb lasts more than 15 hours is approximately 0.223',
      'The 75th percentile of the lifetime distribution is approximately 13.86 hours',
      'The variance of X is 100',
    ],
    correctIndices: [1, 2, 3],
    hint: 'Mean = 10 → λ = 1/10 = 0.1 (A is false). P(X > 15) = e^(−1.5) ≈ 0.223 (B true). ppf(0.75) = −10·ln(0.25) ≈ 13.86 (C true). Var = 1/λ² = 100 (D true).',
  },

  // ─── Section C: Short Questions ─────────────────────────────────────
  // Q7: ATM PIN (3 sub-parts, 6 marks total)
  {
    id: 7,
    section: 'C',
    marks: 2,
    context: 'You are issued with a new ATM card from your bank. The new card is initialized with a random 6-digit PIN, consisting of digits from 0 to 9. You may assume that each digit is independently and randomly chosen from 0 to 9.',
    question: '(a) Find the probability of receiving a PIN that does not contain any zeroes (to 2 decimal places).',
    type: 'short-answer',
    answer: '0.53',
    tolerance: 0.01,
    hint: 'Each digit has 9/10 chance of not being zero. P = (9/10)⁶ = 0.531441 ≈ 0.53.',
  },
  {
    id: 8,
    section: 'C',
    marks: 2,
    context: 'You are issued with a new ATM card from your bank. The new card is initialized with a random 6-digit PIN, consisting of digits from 0 to 9. You may assume that each digit is independently and randomly chosen from 0 to 9.',
    question: '(b) Find the probability of receiving a PIN with at least two zeros (i.e., ≥ 2) (to 2 decimal places).',
    type: 'short-answer',
    answer: '0.11',
    tolerance: 0.01,
    hint: 'P(≥2) = 1 − P(0 zeros) − P(1 zero). P(0) = (9/10)⁶ ≈ 0.5314. P(1) = C(6,1)·(1/10)·(9/10)⁵ ≈ 0.3543. P(≥2) ≈ 0.11.',
  },
  {
    id: 9,
    section: 'C',
    marks: 2,
    context: 'You are issued with a new ATM card from your bank. The new card is initialized with a random 6-digit PIN, consisting of digits from 0 to 9. You may assume that each digit is independently and randomly chosen from 0 to 9.',
    question: '(c) Find the probability of receiving a PIN with less than two ones (to 2 decimal places).',
    type: 'short-answer',
    answer: '0.89',
    tolerance: 0.01,
    hint: 'P(<2 ones) = P(0 ones) + P(1 one) = (9/10)⁶ + C(6,1)·(1/10)·(9/10)⁵ ≈ 0.5314 + 0.3543 = 0.89.',
  },
  // Q8: Hospital ER (2 sub-parts, 4 marks total)
  {
    id: 10,
    section: 'C',
    marks: 2,
    context: 'A hospital administrator is analysing patient inflow to the Emergency Room (ER) to plan staffing and bed capacity. The number of ER patients per day is assumed to be a normal distribution X with μ_X = 120 and σ²_X = 50² = 2500.',
    question: '(a) Calculate the probability that the number of ER patients in a day is between 90 and 160 patients (to four decimal places).',
    type: 'short-answer',
    answer: '0.5765',
    tolerance: 0.001,
    hint: 'X ~ N(120, 50²). P(90 < X < 160) = cdf(160) − cdf(90) ≈ 0.7881 − 0.2119 = 0.5763.',
  },
  {
    id: 11,
    section: 'C',
    marks: 2,
    context: 'A hospital administrator is analysing patient inflow to the Emergency Room (ER) to plan staffing and bed capacity. The number of ER patients per day is assumed to be a normal distribution X with μ_X = 120 and σ²_X = 50² = 2500.',
    question: '(b) To ensure sufficient staffing on most days, the administrator wants to choose a capacity level that will be sufficient for 95% of the days. What daily patient threshold should be used? Show the result to an integer value.',
    type: 'short-answer',
    answer: '203',
    tolerance: 1,
    hint: 'ppf(0.95, 120, 50) = 120 + 1.645·50 ≈ 202.2 → round up to 203.',
  },
]

export const totalMarks = 17

export const sectionInfo: readonly { readonly section: string; readonly title: string; readonly marks: number; readonly description: string }[] = [
  { section: 'A', title: 'Multiple Choice', marks: 5, description: '5 questions, 1 mark each. Select one answer.' },
  { section: 'B', title: 'Multi-select', marks: 2, description: '1 question, 2 marks. Select all correct answers.' },
  { section: 'C', title: 'Short Questions', marks: 10, description: '2 questions with sub-parts. Enter numeric answers.' },
]
