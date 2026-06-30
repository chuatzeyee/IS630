// Parameterised code generators for the open-book offline exam.
// Each generator exposes input fields; generate() returns ready-to-run Python.

export interface GenField {
  readonly id: string
  readonly label: string
  readonly type: 'number' | 'text' | 'select'
  readonly default: string
  readonly options?: readonly string[]
  readonly placeholder?: string
  readonly help?: string
}

export interface CodeGen {
  readonly id: string
  readonly category: string
  readonly title: string
  readonly description: string
  readonly fields: readonly GenField[]
  readonly generate: (v: Record<string, string>) => string
}

const n = (v: string, fallback = '0') => (v.trim() === '' ? fallback : v.trim())

export const codeGenerators: readonly CodeGen[] = [
  // ─── Distributions ─────────────────────────────────────────────
  {
    id: 'binomial',
    category: 'Distributions',
    title: 'Binomial distribution',
    description: 'P(X = k), P(X <= k), or P(X >= k) for n trials with success prob p. Mean = np, Var = np(1-p).',
    fields: [
      { id: 'n', label: 'n (trials)', type: 'number', default: '16' },
      { id: 'p', label: 'p (success prob)', type: 'number', default: '0.25' },
      { id: 'k', label: 'k (successes)', type: 'number', default: '6' },
      { id: 'kind', label: 'Probability', type: 'select', default: 'exactly k', options: ['exactly k', 'at most k', 'at least k', 'fewer than k', 'more than k'] },
    ],
    generate: (v) => {
      const nn = n(v.n, '16'), p = n(v.p, '0.25'), k = n(v.k, '6')
      const map: Record<string, string> = {
        'exactly k': `stats.binom.pmf(${k}, ${nn}, ${p})`,
        'at most k': `stats.binom.cdf(${k}, ${nn}, ${p})`,
        'at least k': `stats.binom.sf(${k} - 1, ${nn}, ${p})   # P(X >= k) = sf(k-1)`,
        'fewer than k': `stats.binom.cdf(${k} - 1, ${nn}, ${p})   # P(X < k)`,
        'more than k': `stats.binom.sf(${k}, ${nn}, ${p})   # P(X > k)`,
      }
      return `from scipy import stats\n\n# n=${nn}, p=${p}, k=${k}\nprob = ${map[v.kind ?? 'exactly k']}\nprint(round(prob, 3))`
    },
  },
  {
    id: 'poisson',
    category: 'Distributions',
    title: 'Poisson distribution',
    description: 'Count of rare independent events over an interval. mu = rate x interval.',
    fields: [
      { id: 'rate', label: 'rate (per unit)', type: 'number', default: '1.5' },
      { id: 'interval', label: 'interval (units)', type: 'number', default: '10', help: 'mu = rate x interval' },
      { id: 'k', label: 'k (events)', type: 'number', default: '5' },
      { id: 'kind', label: 'Probability', type: 'select', default: 'exactly k', options: ['exactly k', 'at most k', 'at least k', 'fewer than k', 'more than k'] },
    ],
    generate: (v) => {
      const rate = n(v.rate, '1.5'), iv = n(v.interval, '10'), k = n(v.k, '5')
      const map: Record<string, string> = {
        'exactly k': `stats.poisson.pmf(${k}, mu)`,
        'at most k': `stats.poisson.cdf(${k}, mu)`,
        'at least k': `stats.poisson.sf(${k} - 1, mu)   # P(X >= k)`,
        'fewer than k': `stats.poisson.cdf(${k} - 1, mu)   # P(X < k)`,
        'more than k': `stats.poisson.sf(${k}, mu)   # P(X > k)`,
      }
      return `from scipy import stats\n\nmu = ${rate} * ${iv}   # rate x interval\nprob = ${map[v.kind ?? 'exactly k']}\nprint(round(prob, 3))`
    },
  },
  {
    id: 'normal',
    category: 'Distributions',
    title: 'Normal distribution',
    description: 'P below/above x, between two values, or the x for a given percentile.',
    fields: [
      { id: 'mu', label: 'mean', type: 'number', default: '0' },
      { id: 'sd', label: 'std dev', type: 'number', default: '1' },
      { id: 'x', label: 'x (value)', type: 'number', default: '1.96' },
      { id: 'x2', label: 'x2 (for between)', type: 'number', default: '2.5' },
      { id: 'kind', label: 'Compute', type: 'select', default: 'P(X <= x)', options: ['P(X <= x)', 'P(X >= x)', 'P(x <= X <= x2)', 'x at percentile (ppf)'] },
      { id: 'pct', label: 'percentile (for ppf)', type: 'number', default: '0.975' },
    ],
    generate: (v) => {
      const mu = n(v.mu, '0'), sd = n(v.sd, '1'), x = n(v.x, '1.96'), x2 = n(v.x2, '2.5'), pct = n(v.pct, '0.975')
      const map: Record<string, string> = {
        'P(X <= x)': `stats.norm.cdf(${x}, loc=${mu}, scale=${sd})`,
        'P(X >= x)': `stats.norm.sf(${x}, loc=${mu}, scale=${sd})`,
        'P(x <= X <= x2)': `stats.norm.cdf(${x2}, loc=${mu}, scale=${sd}) - stats.norm.cdf(${x}, loc=${mu}, scale=${sd})`,
        'x at percentile (ppf)': `stats.norm.ppf(${pct}, loc=${mu}, scale=${sd})`,
      }
      return `from scipy import stats\n\nresult = ${map[v.kind ?? 'P(X <= x)']}\nprint(round(result, 3))`
    },
  },
  {
    id: 'exponential',
    category: 'Distributions',
    title: 'Exponential distribution',
    description: 'Time between Poisson events. scale = 1/lambda = mean wait time. Memoryless.',
    fields: [
      { id: 'mean', label: 'mean wait (scale)', type: 'number', default: '10', help: 'scale = 1/lambda' },
      { id: 'x', label: 'x (time)', type: 'number', default: '15' },
      { id: 'x2', label: 'x2 (for between)', type: 'number', default: '20' },
      { id: 'kind', label: 'Compute', type: 'select', default: 'P(X <= x)', options: ['P(X <= x)', 'P(X >= x)', 'P(x <= X <= x2)'] },
    ],
    generate: (v) => {
      const sc = n(v.mean, '10'), x = n(v.x, '15'), x2 = n(v.x2, '20')
      const map: Record<string, string> = {
        'P(X <= x)': `stats.expon.cdf(${x}, scale=${sc})`,
        'P(X >= x)': `stats.expon.sf(${x}, scale=${sc})`,
        'P(x <= X <= x2)': `stats.expon.cdf(${x2}, scale=${sc}) - stats.expon.cdf(${x}, scale=${sc})`,
      }
      return `from scipy import stats\n\n# scale = mean wait = 1/lambda = ${sc}\nprob = ${map[v.kind ?? 'P(X <= x)']}\nprint(round(prob, 3))`
    },
  },
  // ─── Probability ───────────────────────────────────────────────
  {
    id: 'combinations',
    category: 'Probability',
    title: 'Combinations / permutations',
    description: 'Count ways to choose / arrange. Useful for classical probability (favourable / total).',
    fields: [
      { id: 'nn', label: 'n (total)', type: 'number', default: '24' },
      { id: 'r', label: 'r (chosen)', type: 'number', default: '4' },
      { id: 'kind', label: 'Type', type: 'select', default: 'combination nCr', options: ['combination nCr', 'permutation nPr'] },
    ],
    generate: (v) => {
      const nn = n(v.nn, '24'), r = n(v.r, '4')
      return v.kind === 'permutation nPr'
        ? `import math\n\nprint(math.perm(${nn}, ${r}))`
        : `import math\n\nprint(math.comb(${nn}, ${r}))`
    },
  },
  {
    id: 'bayes',
    category: 'Probability',
    title: "Bayes' theorem",
    description: 'P(A|B) = P(B|A)P(A) / P(B). E.g. P(Cloudy|Rain) from P(Rain|Cloudy), P(Cloudy), P(Rain).',
    fields: [
      { id: 'bGivenA', label: 'P(B|A)', type: 'number', default: '0.9' },
      { id: 'pA', label: 'P(A)', type: 'number', default: '0.2' },
      { id: 'pB', label: 'P(B)', type: 'number', default: '0.3' },
    ],
    generate: (v) =>
      `# P(A|B) = P(B|A) * P(A) / P(B)\nP_A_given_B = (${n(v.bGivenA, '0.9')} * ${n(v.pA, '0.2')}) / ${n(v.pB, '0.3')}\nprint(round(P_A_given_B, 3))`,
  },
  {
    id: 'total-prob',
    category: 'Probability',
    title: 'Law of total probability',
    description: 'P(E) = P(E|A)P(A) + P(E|B)P(B) over two sources/branches.',
    fields: [
      { id: 'pA', label: 'P(A)', type: 'number', default: '0.6' },
      { id: 'eGivenA', label: 'P(E|A)', type: 'number', default: '0.03' },
      { id: 'pB', label: 'P(B)', type: 'number', default: '0.4' },
      { id: 'eGivenB', label: 'P(E|B)', type: 'number', default: '0.02' },
    ],
    generate: (v) =>
      `P_E = ${n(v.eGivenA, '0.03')} * ${n(v.pA, '0.6')} + ${n(v.eGivenB, '0.02')} * ${n(v.pB, '0.4')}\nprint(round(P_E, 4))`,
  },
  // ─── Confidence Intervals ──────────────────────────────────────
  {
    id: 'ci-known',
    category: 'Confidence Intervals',
    title: 'CI — known population variance (z)',
    description: 'Confidence interval for the mean when population std is known. Uses the normal (z) distribution.',
    fields: [
      { id: 'mean', label: 'sample mean', type: 'number', default: '1500' },
      { id: 'sd', label: 'population std', type: 'number', default: '200' },
      { id: 'n', label: 'sample size', type: 'number', default: '60' },
      { id: 'conf', label: 'confidence', type: 'select', default: '0.95', options: ['0.90', '0.95', '0.99'] },
    ],
    generate: (v) => {
      const mean = n(v.mean, '1500'), sd = n(v.sd, '200'), nn = n(v.n, '60'), conf = n(v.conf, '0.95')
      return `from scipy import stats\nimport numpy as np\n\nmean, sd, n_ = ${mean}, ${sd}, ${nn}\nalpha = 1 - ${conf}\nlower = mean - stats.norm.ppf(1 - alpha/2) * sd/np.sqrt(n_)\nupper = mean + stats.norm.ppf(1 - alpha/2) * sd/np.sqrt(n_)\nprint(f"${conf} CI: [{lower:.3f}, {upper:.3f}]")`
    },
  },
  {
    id: 'ci-unknown',
    category: 'Confidence Intervals',
    title: 'CI — unknown variance (t) from data',
    description: 'Confidence interval for the mean from raw sample data using the t distribution.',
    fields: [
      { id: 'data', label: 'sample data (comma-sep)', type: 'text', default: '1550, 1790, 1750, 1750, 1610, 1600, 1800, 1520, 1640, 1440' },
      { id: 'conf', label: 'confidence', type: 'select', default: '0.95', options: ['0.90', '0.95', '0.99'] },
    ],
    generate: (v) => {
      const data = n(v.data, '1,2,3'), conf = n(v.conf, '0.95')
      return `from scipy import stats\nimport numpy as np\n\nsample = [${data}]\nmean = np.mean(sample)\nsem = stats.sem(sample)   # std error, ddof=1\nci = stats.t.interval(${conf}, df=len(sample)-1, loc=mean, scale=sem)\nprint(f"${conf} CI: [{ci[0]:.3f}, {ci[1]:.3f}]")`
    },
  },
  // ─── Hypothesis Tests ──────────────────────────────────────────
  {
    id: 'ttest-1samp',
    category: 'Hypothesis Tests',
    title: '1-sample t-test',
    description: 'Test whether a sample mean differs from a hypothesised value mu. Unknown population variance.',
    fields: [
      { id: 'data', label: 'sample (comma-sep)', type: 'text', default: '1550, 1790, 1750, 1750, 1610, 1600, 1800, 1520, 1640, 1440' },
      { id: 'mu', label: 'mu (H0 value)', type: 'number', default: '1790' },
      { id: 'alt', label: 'alternative', type: 'select', default: 'less', options: ['two-sided', 'less', 'greater'] },
    ],
    generate: (v) =>
      `from scipy import stats\n\nsample = [${n(v.data, '1,2,3')}]\nt_stat, p_value = stats.ttest_1samp(sample, popmean=${n(v.mu, '0')}, alternative='${v.alt ?? 'two-sided'}')\nprint("t =", round(t_stat, 3), " p =", round(p_value, 4))\n# reject H0 if p < alpha`,
  },
  {
    id: 'ttest-ind',
    category: 'Hypothesis Tests',
    title: '2-sample (independent) t-test',
    description: 'Compare means of two independent groups. Set equal_var=False if variances differ (Welch).',
    fields: [
      { id: 'g1', label: 'group 1 (comma-sep)', type: 'text', default: '80, 75, 90, 60, 55, 78, 59, 88, 75, 90' },
      { id: 'g2', label: 'group 2 (comma-sep)', type: 'text', default: '98, 75, 89, 96, 77, 69, 80, 90, 74, 93' },
      { id: 'eqvar', label: 'equal variance?', type: 'select', default: 'False (Welch)', options: ['False (Welch)', 'True'] },
      { id: 'alt', label: 'alternative', type: 'select', default: 'two-sided', options: ['two-sided', 'less', 'greater'] },
    ],
    generate: (v) => {
      const eq = v.eqvar === 'True' ? 'True' : 'False'
      return `from scipy import stats\n\ngroup1 = [${n(v.g1, '1,2,3')}]\ngroup2 = [${n(v.g2, '1,2,3')}]\nt_stat, p_value = stats.ttest_ind(group1, group2, equal_var=${eq}, alternative='${v.alt ?? 'two-sided'}')\nprint("t =", round(t_stat, 3), " p =", round(p_value, 4))`
    },
  },
  {
    id: 'ztest-1samp',
    category: 'Hypothesis Tests',
    title: '1-sample test from summary stats',
    description: 'Manual t-statistic + critical value / p-value from mean, std, n (no raw data needed).',
    fields: [
      { id: 'mean', label: 'sample mean', type: 'number', default: '1650' },
      { id: 'mu', label: 'mu (H0)', type: 'number', default: '1790' },
      { id: 'sd', label: 'sample std', type: 'number', default: '120' },
      { id: 'n', label: 'sample size', type: 'number', default: '10' },
      { id: 'alt', label: 'alternative', type: 'select', default: 'less', options: ['two-sided', 'less', 'greater'] },
    ],
    generate: (v) => {
      const mean = n(v.mean, '0'), mu = n(v.mu, '0'), sd = n(v.sd, '1'), nn = n(v.n, '10')
      const tail =
        v.alt === 'greater' ? `p_value = stats.t.sf(t_stat, df=n_-1)`
          : v.alt === 'two-sided' ? `p_value = 2 * stats.t.sf(abs(t_stat), df=n_-1)`
            : `p_value = stats.t.cdf(t_stat, df=n_-1)`
      return `from scipy import stats\nimport numpy as np\n\nmean, mu, sd, n_ = ${mean}, ${mu}, ${sd}, ${nn}\nt_stat = (mean - mu) / (sd / np.sqrt(n_))\n${tail}\nprint("t =", round(t_stat, 3), " p =", round(p_value, 4))`
    },
  },
  // ─── Chi-Square ────────────────────────────────────────────────
  {
    id: 'chi2',
    category: 'Categorical',
    title: 'Chi-square test of independence',
    description: 'Association between two categorical variables from a contingency table. Returns chi2, p, dof, expected.',
    fields: [
      { id: 'rows', label: 'rows (semicolon between rows, comma within)', type: 'text', default: '125, 1732; 8, 538; 6, 32; 10, 42; 12, 133; 7, 23', help: 'each row = one category; values comma-separated' },
    ],
    generate: (v) => {
      const raw = n(v.rows, '1,2;3,4')
      const matrixRows = raw.split(';').map((r) => `    [${r.trim()}]`).join(',\n')
      return `from scipy.stats import chi2_contingency\nimport numpy as np\n\nmatrix = np.array([\n${matrixRows}\n])\nchi2, p, dof, expected = chi2_contingency(matrix, correction=False)\nprint("chi2 =", round(chi2, 3))\nprint("dof =", dof)\nprint("p =", round(p, 4))\nprint("expected:\\n", np.round(expected, 2))`
    },
  },
  // ─── ANOVA ─────────────────────────────────────────────────────
  {
    id: 'anova',
    category: 'ANOVA',
    title: 'One-way ANOVA + Tukey HSD',
    description: 'Compare means across 3+ groups, then post-hoc Tukey to find which pairs differ.',
    fields: [
      { id: 'g1', label: 'group 1', type: 'text', default: '9, 12, 14, 11, 13' },
      { id: 'g2', label: 'group 2', type: 'text', default: '8, 9, 6, 9, 10' },
      { id: 'g3', label: 'group 3', type: 'text', default: '12, 14, 11, 13, 11' },
      { id: 'g4', label: 'group 4 (optional)', type: 'text', default: '9, 8, 10, 7, 8' },
    ],
    generate: (v) => {
      const groups: string[] = []
      const data: string[] = []
      ;['g1', 'g2', 'g3', 'g4'].forEach((g, i) => {
        const val = (v[g] ?? '').trim()
        if (val) {
          groups.push(`g${i + 1}`)
          data.push(`'Group${i + 1}': [${val}]`)
        }
      })
      const defs = groups.map((_, i) => `g${i + 1} = data['Group${i + 1}']`).join('\n')
      return `from scipy import stats\nfrom statsmodels.stats.multicomp import pairwise_tukeyhsd\nimport pandas as pd\n\ndata = {\n    ${data.join(',\n    ')}\n}\n${defs}\n\n# ANOVA\nf_stat, p_value = stats.f_oneway(${groups.join(', ')})\nprint("F =", round(f_stat, 3), " p =", round(p_value, 4))\n\n# Tukey HSD (post-hoc) if ANOVA is significant\nvals, labels = [], []\nfor name, arr in data.items():\n    vals += arr\n    labels += [name] * len(arr)\nprint(pairwise_tukeyhsd(vals, labels, alpha=0.05))`
    },
  },
  // ─── Correlation & Regression ──────────────────────────────────
  {
    id: 'correlation',
    category: 'Correlation & Regression',
    title: 'Correlation (Pearson / Spearman)',
    description: 'Strength of relationship between two numeric variables. Pearson = linear; Spearman = monotonic (non-parametric).',
    fields: [
      { id: 'x', label: 'x (comma-sep)', type: 'text', default: '1, 2, 3, 4, 5' },
      { id: 'y', label: 'y (comma-sep)', type: 'text', default: '2, 4, 5, 4, 6' },
      { id: 'kind', label: 'method', type: 'select', default: 'Pearson', options: ['Pearson', 'Spearman'] },
    ],
    generate: (v) => {
      const fn = v.kind === 'Spearman' ? 'spearmanr' : 'pearsonr'
      return `from scipy.stats import ${fn}\n\nx = [${n(v.x, '1,2,3')}]\ny = [${n(v.y, '1,2,3')}]\nr, p_value = ${fn}(x, y)\nprint("r =", round(r, 3), " p =", round(p_value, 4))`
    },
  },
  {
    id: 'ols',
    category: 'Correlation & Regression',
    title: 'OLS linear regression',
    description: 'Fit y on one or more predictors with statsmodels. add_constant gives the intercept. summary() shows coefs, p-values, R-squared.',
    fields: [
      { id: 'formula', label: 'formula', type: 'text', default: 'cnt ~ temp + hum + windspeed', help: 'dependent ~ predictor1 + predictor2' },
      { id: 'df', label: 'dataframe name', type: 'text', default: 'df' },
    ],
    generate: (v) =>
      `import statsmodels.formula.api as smf\n\nmodel = smf.ols('${n(v.formula, 'y ~ x')}', data=${n(v.df, 'df')}).fit()\nprint(model.summary())\n# read coef, P>|t| (significance), R-squared / Adj. R-squared`,
  },
]

export const codeGenCategories = [...new Set(codeGenerators.map((g) => g.category))]
