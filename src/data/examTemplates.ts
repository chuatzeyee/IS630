// Question-type generators: pick the exam scenario you see, get the FULL answer
// scaffold (test -> hypotheses -> code -> conclusion template) ready for Examena.
import type { GenField } from './codegen'

export interface ExamTemplate {
  readonly id: string
  readonly group: string
  readonly title: string
  readonly trigger: string // "When the question says..."
  readonly fields: readonly GenField[]
  readonly generate: (v: Record<string, string>) => string
}

const n = (v: string, f = '0') => (v?.trim() ? v.trim() : f)

export const examTemplates: readonly ExamTemplate[] = [
  // ─── Section B: short probability ──────────────────────────────
  {
    id: 't-binom',
    group: 'Probability (short answer)',
    title: 'Probability of k successes in n trials',
    trigger: 'When it says: "n trials, probability p of success, find P of exactly / at least / at most k".',
    fields: [
      { id: 'n', label: 'n (trials)', type: 'number', default: '16' },
      { id: 'p', label: 'p (success prob)', type: 'number', default: '0.25' },
      { id: 'k', label: 'k', type: 'number', default: '6' },
      { id: 'kind', label: 'wording', type: 'select', default: 'exactly k', options: ['exactly k', 'at most k', 'at least k', 'fewer than k', 'more than k'] },
      { id: 'dp', label: 'decimal places', type: 'number', default: '3' },
    ],
    generate: (v) => {
      const nn = n(v.n, '16'), p = n(v.p, '0.25'), k = n(v.k, '6'), dp = n(v.dp, '3')
      const map: Record<string, string> = {
        'exactly k': `stats.binom.pmf(${k}, ${nn}, ${p})`,
        'at most k': `stats.binom.cdf(${k}, ${nn}, ${p})`,
        'at least k': `stats.binom.sf(${k} - 1, ${nn}, ${p})`,
        'fewer than k': `stats.binom.cdf(${k} - 1, ${nn}, ${p})`,
        'more than k': `stats.binom.sf(${k}, ${nn}, ${p})`,
      }
      return `# Recognise: fixed number of independent trials -> BINOMIAL
# If only mean & variance given: np = mean, npq = variance -> solve p and n first.
from scipy import stats

prob = ${map[v.kind ?? 'exactly k']}
print(round(prob, ${dp}))
# Answer: write the printed value to ${dp} d.p.`
    },
  },
  {
    id: 't-poisson',
    group: 'Probability (short answer)',
    title: 'Probability of k events at a given rate',
    trigger: 'When it says: "events happen at an average rate per unit time/area; find P of k events".',
    fields: [
      { id: 'rate', label: 'rate (per unit)', type: 'number', default: '1.5' },
      { id: 'interval', label: 'interval (units)', type: 'number', default: '10' },
      { id: 'k', label: 'k', type: 'number', default: '5' },
      { id: 'kind', label: 'wording', type: 'select', default: 'exactly k', options: ['exactly k', 'at most k', 'at least k', 'more than k'] },
    ],
    generate: (v) => {
      const r = n(v.rate, '1.5'), iv = n(v.interval, '10'), k = n(v.k, '5')
      const map: Record<string, string> = {
        'exactly k': `stats.poisson.pmf(${k}, mu)`,
        'at most k': `stats.poisson.cdf(${k}, mu)`,
        'at least k': `stats.poisson.sf(${k} - 1, mu)`,
        'more than k': `stats.poisson.sf(${k}, mu)`,
      }
      return `# Recognise: COUNT of events over an interval -> POISSON
from scipy import stats

mu = ${r} * ${iv}   # mu = rate x interval (scale the rate to the interval!)
prob = ${map[v.kind ?? 'exactly k']}
print(round(prob, 3))`
    },
  },
  {
    id: 't-normal',
    group: 'Probability (short answer)',
    title: 'Probability for a normally distributed value',
    trigger: 'When it says: "X is normally distributed with mean and sd; find P below / above / between, or the cutoff value".',
    fields: [
      { id: 'mu', label: 'mean', type: 'number', default: '100' },
      { id: 'sd', label: 'std dev', type: 'number', default: '15' },
      { id: 'x', label: 'x', type: 'number', default: '120' },
      { id: 'x2', label: 'x2 (for between)', type: 'number', default: '130' },
      { id: 'pct', label: 'percentile (for cutoff)', type: 'number', default: '0.95' },
      { id: 'kind', label: 'wording', type: 'select', default: 'P(X <= x)', options: ['P(X <= x)', 'P(X >= x)', 'P(x <= X <= x2)', 'cutoff at percentile'] },
    ],
    generate: (v) => {
      const mu = n(v.mu, '100'), sd = n(v.sd, '15'), x = n(v.x, '120'), x2 = n(v.x2, '130'), pct = n(v.pct, '0.95')
      const map: Record<string, string> = {
        'P(X <= x)': `stats.norm.cdf(${x}, loc=${mu}, scale=${sd})`,
        'P(X >= x)': `stats.norm.sf(${x}, loc=${mu}, scale=${sd})`,
        'P(x <= X <= x2)': `stats.norm.cdf(${x2}, loc=${mu}, scale=${sd}) - stats.norm.cdf(${x}, loc=${mu}, scale=${sd})`,
        'cutoff at percentile': `stats.norm.ppf(${pct}, loc=${mu}, scale=${sd})`,
      }
      return `# Recognise: continuous, bell-shaped -> NORMAL
from scipy import stats

result = ${map[v.kind ?? 'P(X <= x)']}
print(round(result, 3))`
    },
  },
  {
    id: 't-expon',
    group: 'Probability (short answer)',
    title: 'Waiting time between events',
    trigger: 'When it says: "events occur as a Poisson process; find P that the TIME until / between events is less / more than t".',
    fields: [
      { id: 'mean', label: 'mean wait (= 1/lambda)', type: 'number', default: '10' },
      { id: 'x', label: 't', type: 'number', default: '15' },
      { id: 'x2', label: 't2 (for between)', type: 'number', default: '20' },
      { id: 'kind', label: 'wording', type: 'select', default: 'within t (<=)', options: ['within t (<=)', 'longer than t (>=)', 'between t and t2'] },
    ],
    generate: (v) => {
      const sc = n(v.mean, '10'), x = n(v.x, '15'), x2 = n(v.x2, '20')
      const map: Record<string, string> = {
        'within t (<=)': `stats.expon.cdf(${x}, scale=${sc})`,
        'longer than t (>=)': `stats.expon.sf(${x}, scale=${sc})`,
        'between t and t2': `stats.expon.cdf(${x2}, scale=${sc}) - stats.expon.cdf(${x}, scale=${sc})`,
      }
      return `# Recognise: TIME between Poisson events -> EXPONENTIAL (memoryless)
# scale = mean wait = 1/lambda. If given lambda, use scale = 1/lambda.
from scipy import stats

prob = ${map[v.kind ?? 'within t (<=)']}
print(round(prob, 3))`
    },
  },
  {
    id: 't-cond-table',
    group: 'Probability (short answer)',
    title: 'Probability from a contingency table',
    trigger: 'When you are given a two-way table and asked P(A), P(A and B), or P(A | B).',
    fields: [
      { id: 'favourable', label: 'favourable count', type: 'number', default: '250' },
      { id: 'total', label: 'relevant total (the "given" group)', type: 'number', default: '400' },
    ],
    generate: (v) =>
      `# Read counts directly from the table.
# P(A | B) = (count in A and B) / (total in B)   <- denominator is the GIVEN group
# P(A and B) = (count in A and B) / grand total
prob = ${n(v.favourable, '250')} / ${n(v.total, '400')}
print(round(prob, 3))`,
  },
  {
    id: 't-bayes',
    group: 'Probability (short answer)',
    title: 'Reverse / Bayes probability',
    trigger: 'When it says: "given that B happened, find the probability it came from A" (the condition is reversed).',
    fields: [
      { id: 'bGivenA', label: 'P(B | A)', type: 'number', default: '0.9' },
      { id: 'pA', label: 'P(A)', type: 'number', default: '0.2' },
      { id: 'pB', label: 'P(B) (or leave for total prob)', type: 'number', default: '0.3' },
    ],
    generate: (v) =>
      `# Recognise: condition is REVERSED -> BAYES
# P(A | B) = P(B | A) * P(A) / P(B)
# If P(B) not given: P(B) = P(B|A)P(A) + P(B|not A)P(not A)
P_A_given_B = (${n(v.bGivenA, '0.9')} * ${n(v.pA, '0.2')}) / ${n(v.pB, '0.3')}
print(round(P_A_given_B, 3))`,
  },
  {
    id: 't-comb',
    group: 'Probability (short answer)',
    title: 'Counting / classical probability',
    trigger: 'When it says: "choose r from n", "what is the probability that the selected are ...".',
    fields: [
      { id: 'favN', label: 'favourable: n', type: 'number', default: '12' },
      { id: 'favR', label: 'favourable: r', type: 'number', default: '2' },
      { id: 'totN', label: 'total: n', type: 'number', default: '24' },
      { id: 'totR', label: 'total: r', type: 'number', default: '4' },
    ],
    generate: (v) =>
      `# Classical probability = favourable outcomes / total outcomes
import math
favourable = math.comb(${n(v.favN, '12')}, ${n(v.favR, '2')})
total = math.comb(${n(v.totN, '24')}, ${n(v.totR, '4')})
print(round(favourable / total, 3))`,
  },
  {
    id: 't-critical',
    group: 'Inference (short answer)',
    title: 'Critical value (z or t)',
    trigger: 'When asked for the critical value / z-score / t-score for a confidence level or alpha.',
    fields: [
      { id: 'conf', label: 'confidence', type: 'select', default: '0.95', options: ['0.90', '0.95', '0.99'] },
      { id: 'tail', label: 'tail', type: 'select', default: 'two-sided', options: ['two-sided', 'one-sided'] },
      { id: 'dist', label: 'distribution', type: 'select', default: 'z (known var)', options: ['z (known var)', 't (unknown var)'] },
      { id: 'df', label: 'df (for t = n-1)', type: 'number', default: '9' },
    ],
    generate: (v) => {
      const conf = n(v.conf, '0.95'), df = n(v.df, '9')
      const pct = v.tail === 'one-sided' ? conf : `1 - (1 - ${conf})/2`
      const call = v.dist === 't (unknown var)' ? `stats.t.ppf(${pct}, df=${df})` : `stats.norm.ppf(${pct})`
      return `# two-sided -> use 1 - alpha/2 ; one-sided -> use the confidence directly
from scipy import stats
crit = ${call}
print(round(crit, 4))`
    },
  },
  {
    id: 't-ci',
    group: 'Inference (short answer)',
    title: 'Construct a confidence interval',
    trigger: 'When it says: "construct a 95% confidence interval for the mean".',
    fields: [
      { id: 'mode', label: 'what you are given', type: 'select', default: 'summary, known var (z)', options: ['summary, known var (z)', 'summary, unknown var (t)', 'raw data (t)'] },
      { id: 'mean', label: 'sample mean', type: 'number', default: '50' },
      { id: 'sd', label: 'std (pop or sample)', type: 'number', default: '10' },
      { id: 'nn', label: 'sample size', type: 'number', default: '30' },
      { id: 'data', label: 'raw data (comma-sep)', type: 'text', default: '52, 48, 55, 50, 53, 49, 51, 54' },
      { id: 'conf', label: 'confidence', type: 'select', default: '0.95', options: ['0.90', '0.95', '0.99'] },
    ],
    generate: (v) => {
      const mean = n(v.mean, '50'), sd = n(v.sd, '10'), nn = n(v.nn, '30'), data = n(v.data, '1,2,3'), conf = n(v.conf, '0.95')
      if (v.mode === 'raw data (t)') {
        return `# Unknown variance + raw data -> t interval
from scipy import stats
import numpy as np
sample = [${data}]
ci = stats.t.interval(${conf}, df=len(sample)-1, loc=np.mean(sample), scale=stats.sem(sample))
print(f"${conf} CI: [{ci[0]:.3f}, {ci[1]:.3f}]")`
      }
      if (v.mode === 'summary, unknown var (t)') {
        return `# Unknown population variance -> use t
from scipy import stats
import numpy as np
mean, s, n_ = ${mean}, ${sd}, ${nn}
margin = stats.t.ppf(1 - (1-${conf})/2, df=n_-1) * s/np.sqrt(n_)
print(f"${conf} CI: [{mean-margin:.3f}, {mean+margin:.3f}]")`
      }
      return `# Known population variance -> use z (normal)
from scipy import stats
import numpy as np
mean, sigma, n_ = ${mean}, ${sd}, ${nn}
margin = stats.norm.ppf(1 - (1-${conf})/2) * sigma/np.sqrt(n_)
print(f"${conf} CI: [{mean-margin:.3f}, {mean+margin:.3f}]")
# NOTE: a CI only generalises to the population the sample was drawn from.`
    },
  },
  // ─── Section C: structured (full scaffold) ─────────────────────
  {
    id: 't-1samp',
    group: 'Structured (full answer)',
    title: 'Is a mean less / greater / different from a value?',
    trigger: 'When it says: "determine whether the average X is less than / greater than / different from V".',
    fields: [
      { id: 'data', label: 'sample (comma-sep) - replace with your data', type: 'text', default: '52, 48, 55, 50, 53, 49, 51, 54' },
      { id: 'mu', label: 'V (value claimed in H0) - replace with your value', type: 'number', default: '50' },
      { id: 'dir', label: 'claim direction', type: 'select', default: 'greater than V', options: ['less than V', 'greater than V', 'different from V'] },
    ],
    generate: (v) => {
      const mu = n(v.mu, '50'), data = n(v.data, '1,2,3')
      const alt = v.dir === 'greater than V' ? 'greater' : v.dir === 'different from V' ? 'two-sided' : 'less'
      const h = alt === 'greater' ? `H0: mu <= ${mu}\n# H1: mu > ${mu}` : alt === 'two-sided' ? `H0: mu = ${mu}\n# H1: mu != ${mu}` : `H0: mu >= ${mu}\n# H1: mu < ${mu}`
      return `# STEP 1 - Test: One-sample t-test (one sample vs a value, unknown population variance)
# STEP 2 - Hypotheses:
# ${h}

# STEP 3 - Code:
from scipy import stats
sample = [${data}]
t_stat, p_value = stats.ttest_1samp(sample, popmean=${mu}, alternative='${alt}')
print("t =", round(t_stat, 3), " p =", round(p_value, 4))

# STEP 4 - Conclusion (read the printed p_value):
# Since p_value (___) is [< / >] 0.05, we [reject / fail to reject] H0.
# There is [sufficient / insufficient] evidence that the average is ${v.dir ?? 'less than V'}.`
    },
  },
  {
    id: 't-2samp',
    group: 'Structured (full answer)',
    title: 'Do two groups differ?',
    trigger: 'When it says: "is there a difference between group 1 and group 2" (two independent samples).',
    fields: [
      { id: 'g1', label: 'group 1 (comma-sep)', type: 'text', default: '80, 75, 90, 60, 55, 78, 59, 88, 75, 90' },
      { id: 'g2', label: 'group 2 (comma-sep)', type: 'text', default: '98, 75, 89, 96, 77, 69, 80, 90, 74, 93' },
      { id: 'eqvar', label: 'equal variances?', type: 'select', default: 'No (Welch)', options: ['No (Welch)', 'Yes'] },
      { id: 'dir', label: 'claim', type: 'select', default: 'different', options: ['different', 'group1 less', 'group1 greater'] },
    ],
    generate: (v) => {
      const eq = v.eqvar === 'Yes' ? 'True' : 'False'
      const alt = v.dir === 'group1 less' ? 'less' : v.dir === 'group1 greater' ? 'greater' : 'two-sided'
      const h = alt === 'two-sided' ? 'H0: mu1 = mu2\n# H1: mu1 != mu2' : alt === 'less' ? 'H0: mu1 >= mu2\n# H1: mu1 < mu2' : 'H0: mu1 <= mu2\n# H1: mu1 > mu2'
      return `# STEP 1 - Test: Two-sample (independent) t-test${eq === 'False' ? ' - Welch (unequal variances)' : ''}
# STEP 2 - Hypotheses:
# ${h}

# STEP 3 - Code:
from scipy import stats
group1 = [${n(v.g1, '1,2,3')}]
group2 = [${n(v.g2, '1,2,3')}]
t_stat, p_value = stats.ttest_ind(group1, group2, equal_var=${eq}, alternative='${alt}')
print("t =", round(t_stat, 3), " p =", round(p_value, 4))

# STEP 4 - Conclusion:
# Since p_value (___) is [< / >] 0.05, we [reject / fail to reject] H0.
# There is [sufficient / insufficient] evidence that the two groups differ.`
    },
  },
  {
    id: 't-anova',
    group: 'Structured (full answer)',
    title: 'Do 3 or more groups differ?',
    trigger: 'When it says: "is there a difference in the mean across 3+ groups / programs / treatments".',
    fields: [
      { id: 'g1', label: 'group 1', type: 'text', default: '9, 12, 14, 11, 13' },
      { id: 'g2', label: 'group 2', type: 'text', default: '8, 9, 6, 9, 10' },
      { id: 'g3', label: 'group 3', type: 'text', default: '12, 14, 11, 13, 11' },
      { id: 'g4', label: 'group 4 (optional)', type: 'text', default: '9, 8, 10, 7, 8' },
    ],
    generate: (v) => {
      const data: string[] = []
      ;['g1', 'g2', 'g3', 'g4'].forEach((g, i) => {
        const val = (v[g] ?? '').trim()
        if (val) data.push(`'G${i + 1}': [${val}]`)
      })
      const labels = data.map((_, i) => `g${i + 1}`)
      const groupArgs = labels.map((_, i) => `data['G${i + 1}']`).join(', ')
      return `# STEP 1 - Test: One-way ANOVA (compare means across 3+ groups)
# STEP 2 - Hypotheses:
# H0: all group means are equal
# H1: at least one group mean differs

# STEP 3 - Code:
from scipy import stats
from statsmodels.stats.multicomp import pairwise_tukeyhsd

data = {
    ${data.join(',\n    ')}
}
f_stat, p_value = stats.f_oneway(${groupArgs})
print("F =", round(f_stat, 3), " p =", round(p_value, 4))

# STEP 4 - Post-hoc (only if ANOVA is significant): which pairs differ?
vals, labels = [], []
for name, arr in data.items():
    vals += arr
    labels += [name] * len(arr)
print(pairwise_tukeyhsd(vals, labels, alpha=0.05))

# STEP 5 - Conclusion:
# ANOVA: since p (___) is [< / >] 0.05, [reject / fail to reject] H0.
# Tukey: pairs with reject=True differ significantly. Compare group means to say which is highest/lowest.`
    },
  },
  {
    id: 't-chi2',
    group: 'Structured (full answer)',
    title: 'Is there an association between two categories?',
    trigger: 'When it says: "is there an association between [categorical X] and [categorical Y]" with a table.',
    fields: [
      { id: 'rows', label: 'table rows (semicolon between rows)', type: 'text', default: '60, 40; 30, 70; 50, 50' },
    ],
    generate: (v) => {
      const raw = n(v.rows, '1,2;3,4')
      const rows = raw.split(';').map((r) => `    [${r.trim()}]`).join(',\n')
      return `# STEP 1 - Test: Chi-square test of independence (two categorical variables)
# STEP 2 - Hypotheses:
# H0: the two variables are independent (no association)
# H1: the two variables are associated

# STEP 3 - Code:
from scipy.stats import chi2_contingency
import numpy as np
matrix = np.array([
${rows}
])
chi2, p, dof, expected = chi2_contingency(matrix, correction=False)
print("chi2 =", round(chi2, 3), " dof =", dof, " p =", round(p, 4))
# dof = (rows - 1) x (cols - 1)

# STEP 4 - Conclusion:
# Since p (___) is [< / >] 0.05, we [reject / fail to reject] H0.
# There is [sufficient / insufficient] evidence of an association.`
    },
  },
  {
    id: 't-corr',
    group: 'Structured (full answer)',
    title: 'Measure the relationship between two variables',
    trigger: 'When it says: "is there a relationship / correlation between two numeric variables".',
    fields: [
      { id: 'x', label: 'x (comma-sep)', type: 'text', default: '1, 2, 3, 4, 5' },
      { id: 'y', label: 'y (comma-sep)', type: 'text', default: '2, 4, 5, 4, 6' },
      { id: 'kind', label: 'method', type: 'select', default: 'Pearson (linear)', options: ['Pearson (linear)', 'Spearman (monotonic / non-parametric)'] },
    ],
    generate: (v) => {
      const fn = v.kind?.startsWith('Spearman') ? 'spearmanr' : 'pearsonr'
      return `# Pearson = linear relationship; Spearman = monotonic (non-parametric, for ranks/non-normal)
# r near +1/-1 = strong; r near 0 = no LINEAR relationship (non-linear may still exist)
from scipy.stats import ${fn}
x = [${n(v.x, '1,2,3')}]
y = [${n(v.y, '1,2,3')}]
r, p_value = ${fn}(x, y)
print("r =", round(r, 3), " p =", round(p_value, 4))
# Conclusion: r = ___ indicates a [weak/moderate/strong] [positive/negative] relationship;
# p [< / >] 0.05 means it [is / is not] statistically significant.`
    },
  },
  {
    id: 't-regression',
    group: 'Structured (full answer)',
    title: 'Interpret a regression output (no code)',
    trigger: 'When given an OLS summary table and asked about significance, R-squared, or adding/removing variables.',
    fields: [
      { id: 'fp', label: 'F-test p-value', type: 'number', default: '0.001' },
      { id: 'alpha', label: 'alpha', type: 'number', default: '0.05' },
    ],
    generate: (v) =>
      `# No code needed - read the summary table. Checklist:

# 1. Model significant? Look at Prob (F-statistic).
#    F p-value = ${n(v.fp, '0.001')}  vs alpha ${n(v.alpha, '0.05')}
#    -> [< alpha = significant: at least one predictor matters | > alpha = not significant]

# 2. Which predictors are significant? Each row's P>|t| < alpha -> that predictor is significant.

# 3. Coefficient meaning: a 1-unit rise in the predictor changes y by 'coef' (holding others fixed).

# 4. add_constant / intercept: without sm.add_constant there is no 'const' row (no-intercept model).

# 5. Adding a predictor:
#    R-squared  -> stays same or INCREASES (never falls).
#    Adjusted R-squared -> increases only if the new predictor adds real explanatory power;
#                          decreases if it does not (it penalises useless predictors).`,
  },
]

export const examTemplateGroups = [...new Set(examTemplates.map((t) => t.group))]

const byId = (id: string) => examTemplates.find((t) => t.id === id)

export function templateById(id: string): ExamTemplate | undefined {
  return byId(id)
}

// Resolve a question's free-text topic to the most relevant code template.
export function templateForTopic(topic: string): ExamTemplate | undefined {
  const t = topic.toLowerCase()
  const has = (...ks: string[]) => ks.some((k) => t.includes(k))

  if (has('welch', 'two-sample', '2-sample')) return byId('t-2samp')
  if (has('1-sample', 'one-sample')) return byId('t-1samp')
  if (has('anova', 'tukey')) return byId('t-anova')
  if (has('chi-square', 'chi square', 'chi2')) return byId('t-chi2')
  if (has('correlation')) return byId('t-corr')
  if (has('ols', 'regression')) return byId('t-regression')
  if (has('confidence interval')) return byId('t-ci')
  if (has('bayes', 'total probability')) return byId('t-bayes')
  if (has('combination', 'permutation', 'counting')) return byId('t-comb')
  if (has('binomial')) return byId('t-binom')
  if (has('poisson')) return byId('t-poisson')
  if (has('exponential')) return byId('t-expon')
  if (has('normal', 'sampling distribution', 'central limit', 'standard error')) return byId('t-normal')
  if (has('conditional probability')) return byId('t-bayes')
  if (has('hypothesis testing', 'p-value')) return byId('t-1samp')
  return undefined
}
