export interface Formula {
  readonly name: string
  readonly formula: string
  readonly description: string
  readonly variables: readonly string[]
  readonly pythonCode?: string
  readonly gotcha?: string
}

export interface FormulaCategory {
  readonly id: string
  readonly title: string
  readonly description: string
  readonly formulas: readonly Formula[]
}

export const formulaCategories: readonly FormulaCategory[] = [
  {
    id: 'descriptive',
    title: 'Descriptive Statistics',
    description: 'Measures of center and spread for summarizing data',
    formulas: [
      {
        name: 'Population Mean',
        formula: 'μ = (Σ xᵢ) / N',
        description: 'Average of all values in the entire population.',
        variables: ['μ = population mean', 'xᵢ = each data value', 'N = population size'],
        pythonCode: 'np.mean(data)',
      },
      {
        name: 'Sample Mean',
        formula: 'x̄ = (Σ xᵢ) / n',
        description: 'Average of values in a sample drawn from the population.',
        variables: ['x̄ = sample mean', 'xᵢ = each data value', 'n = sample size'],
        pythonCode: 'np.mean(sample)',
      },
      {
        name: 'Population Variance',
        formula: 'σ² = Σ(xᵢ − μ)² / N',
        description: 'Average squared deviation from the population mean. Divide by N.',
        variables: ['σ² = population variance', 'xᵢ = each value', 'μ = population mean', 'N = population size'],
        pythonCode: 'np.var(data)  # ddof=0 by default',
        gotcha: 'Pandas .var() defaults to ddof=1 (sample). Use .var(ddof=0) for population.',
      },
      {
        name: 'Sample Variance',
        formula: 's² = Σ(xᵢ − x̄)² / (n − 1)',
        description: 'Estimated variance from a sample. Divide by n−1 (Bessel\'s correction) to get an unbiased estimate.',
        variables: ['s² = sample variance', 'xᵢ = each value', 'x̄ = sample mean', 'n − 1 = degrees of freedom'],
        pythonCode: 'np.var(data, ddof=1)  # or pd.Series(data).var()',
      },
      {
        name: 'Population Std Dev',
        formula: 'σ = √(σ²) = √(Σ(xᵢ − μ)² / N)',
        description: 'Square root of population variance. Same units as the data.',
        variables: ['σ = population std dev'],
        pythonCode: 'np.std(data)  # ddof=0 by default',
        gotcha: 'Pandas .std() defaults to ddof=1 (sample). Use .std(ddof=0) for population.',
      },
      {
        name: 'Sample Std Dev',
        formula: 's = √(s²) = √(Σ(xᵢ − x̄)² / (n − 1))',
        description: 'Square root of sample variance.',
        variables: ['s = sample std dev'],
        pythonCode: 'np.std(data, ddof=1)  # or pd.Series(data).std()',
      },
      {
        name: 'Range',
        formula: 'Range = max − min',
        description: 'Difference between the largest and smallest values.',
        variables: ['max = maximum value', 'min = minimum value'],
        pythonCode: 'np.ptp(data)  # or data.max() - data.min()',
      },
      {
        name: 'Interquartile Range (IQR)',
        formula: 'IQR = Q₃ − Q₁',
        description: 'Range of the middle 50% of the data. Robust to outliers.',
        variables: ['Q₁ = 25th percentile', 'Q₃ = 75th percentile'],
        pythonCode: 'np.percentile(data, 75) - np.percentile(data, 25)',
      },
    ],
  },
  {
    id: 'z-scores',
    title: 'Z-Scores & Standardization',
    description: 'Converting values to standard units for comparison',
    formulas: [
      {
        name: 'Z-Score (Population)',
        formula: 'z = (x − μ) / σ',
        description: 'How many standard deviations x is from the population mean. Positive = above mean, negative = below.',
        variables: ['z = z-score', 'x = observed value', 'μ = population mean', 'σ = population std dev'],
        pythonCode: 'z = (x - mu) / sigma',
      },
      {
        name: 'Z-Score (Sample)',
        formula: 'z = (x − x̄) / s',
        description: 'Standardized score using the sample mean and sample std dev.',
        variables: ['x̄ = sample mean', 's = sample std dev'],
        pythonCode: 'z = (x - x_bar) / s',
      },
    ],
  },
  {
    id: 'sampling',
    title: 'Sampling Distribution',
    description: 'How sample means behave — the foundation of CLT',
    formulas: [
      {
        name: 'Standard Error of the Mean',
        formula: 'SE = σ / √n',
        description: 'Std dev of the sampling distribution of x̄. Measures how much sample means vary from sample to sample. Averaging n values reduces variability by √n.',
        variables: ['SE = standard error', 'σ = population std dev', 'n = sample size'],
        pythonCode: 'se = sigma / np.sqrt(n)',
        gotcha: 'Quadrupling n only halves SE — diminishing returns.',
      },
      {
        name: 'Why σ/√n (the math)',
        formula: 'Var(x̄) = Var(Σxᵢ / n) = nσ² / n² = σ² / n  →  SD(x̄) = σ / √n',
        description: 'Variances add when summing independent variables (nσ²), then dividing by n squares to 1/n². Take the square root to get σ/√n.',
        variables: ['Var(x̄) = variance of the sample mean', 'nσ² = variance of the sum of n values', '1/n² = scaling factor from dividing by n'],
      },
      {
        name: 'Sampling Distribution of x̄ (CLT)',
        formula: 'x̄ ~ N(μ, σ²/n)  when n ≥ 30 (or population is normal)',
        description: 'By the Central Limit Theorem, the distribution of sample means is approximately normal regardless of the population shape, as long as n is large enough.',
        variables: ['μ = population mean (center of sampling dist)', 'σ²/n = variance of sampling dist', 'n ≥ 30 = rule of thumb for CLT'],
        pythonCode: 'stats.norm(loc=mu, scale=sigma/np.sqrt(n))',
      },
      {
        name: 'Estimated Standard Error',
        formula: 'SE = s / √n',
        description: 'When population σ is unknown, use sample std dev s as an estimate. Used in t-tests and t-based confidence intervals.',
        variables: ['s = sample std dev (ddof=1)', 'n = sample size'],
        pythonCode: 'se = np.std(data, ddof=1) / np.sqrt(len(data))',
      },
    ],
  },
  {
    id: 'distributions',
    title: 'Distribution Parameters',
    description: 'Mean and variance for the key distributions',
    formulas: [
      {
        name: 'Binomial Distribution',
        formula: 'X ~ Bin(n, p)  →  E(X) = np,  Var(X) = np(1−p)',
        description: 'Number of successes in n independent trials, each with probability p.',
        variables: ['n = number of trials', 'p = probability of success per trial', 'E(X) = expected value = np', 'Var(X) = np(1−p)'],
        pythonCode: 'stats.binom(n=n, p=p)',
      },
      {
        name: 'Poisson Distribution',
        formula: 'X ~ Poisson(λ)  →  E(X) = λ,  Var(X) = λ',
        description: 'Number of events in a fixed interval. Mean equals variance.',
        variables: ['λ = average rate (events per interval)'],
        pythonCode: 'stats.poisson(mu=lam)',
        gotcha: 'Convert rate to match the interval: if 360/hour, then λ = 360/3600 × interval_seconds.',
      },
      {
        name: 'Normal Distribution',
        formula: 'X ~ N(μ, σ²)  →  E(X) = μ,  Var(X) = σ²',
        description: 'Symmetric bell curve. 68-95-99.7 rule: ~68% within ±1σ, ~95% within ±2σ, ~99.7% within ±3σ.',
        variables: ['μ = mean (center)', 'σ² = variance', 'σ = std dev (spread)'],
        pythonCode: 'stats.norm(loc=mu, scale=sigma)',
        gotcha: 'N(μ, σ²) notation — second param is variance. scipy scale param is σ (std dev), NOT σ².',
      },
      {
        name: 'Exponential Distribution',
        formula: 'X ~ Exp(λ)  →  E(X) = 1/λ,  Var(X) = 1/λ²',
        description: 'Time between events in a Poisson process.',
        variables: ['λ = rate (events per unit time)', '1/λ = mean time between events'],
        pythonCode: 'stats.expon(scale=1/lam)',
        gotcha: 'scipy scale = 1/λ, NOT λ itself.',
      },
      {
        name: 'Uniform Distribution',
        formula: 'X ~ U(a, b)  →  E(X) = (a+b)/2,  Var(X) = (b−a)²/12',
        description: 'All values between a and b are equally likely.',
        variables: ['a = lower bound', 'b = upper bound'],
        pythonCode: 'stats.uniform(loc=a, scale=b-a)',
        gotcha: 'scipy scale = b−a (range width), not b.',
      },
    ],
  },
  {
    id: 'confidence-intervals',
    title: 'Confidence Intervals',
    description: 'Estimating population parameters from sample data',
    formulas: [
      {
        name: 'CI for Mean (σ known)',
        formula: 'x̄ ± z* · (σ / √n)',
        description: 'Use the normal distribution when population σ is known.',
        variables: ['x̄ = sample mean', 'z* = critical value from N(0,1)', 'σ / √n = standard error'],
        pythonCode: 'stats.norm(loc=x_bar, scale=sigma/np.sqrt(n)).interval(0.95)',
      },
      {
        name: 'CI for Mean (σ unknown)',
        formula: 'x̄ ± t* · (s / √n)',
        description: 'Use the t-distribution when population σ is unknown. Wider interval than z-based CI due to extra uncertainty.',
        variables: ['t* = critical value from t(df=n−1)', 's = sample std dev', 's / √n = estimated standard error'],
        pythonCode: 'stats.t(df=n-1, loc=x_bar, scale=s/np.sqrt(n)).interval(0.95)',
        gotcha: 'scale is s/√n (the standard error), not just s.',
      },
      {
        name: 'Two-Sample CI (Equal Variance)',
        formula: '(x̄₁ − x̄₂) ± t* · sₚ · √(1/n₁ + 1/n₂)',
        description: 'Pooled t confidence interval when population variances are assumed equal.',
        variables: ['sₚ = pooled std dev', 'df = n₁ + n₂ − 2'],
        pythonCode: 'stats.ttest_ind(a, b, equal_var=True).confidence_interval(0.95)',
      },
      {
        name: 'Two-Sample CI (Unequal Variance)',
        formula: '(x̄₁ − x̄₂) ± t* · √(s₁²/n₁ + s₂²/n₂)',
        description: 'Welch\'s t CI when population variances are NOT assumed equal.',
        variables: ['df = Welch-Satterthwaite approximation'],
        pythonCode: 'stats.ttest_ind(a, b, equal_var=False).confidence_interval(0.95)',
      },
      {
        name: 'Paired CI',
        formula: 'd̄ ± t* · (s_d / √n)',
        description: 'CI for mean difference of paired observations. Compute differences first, then apply one-sample CI.',
        variables: ['d̄ = mean of differences', 's_d = std dev of differences', 'n = number of pairs'],
        pythonCode: 'stats.ttest_rel(after, before).confidence_interval(0.95)',
      },
      {
        name: 'CI Interpretation',
        formula: '"We are C% confident that the true population mean lies within [L, U]"',
        description: 'A CI is about the procedure, not the parameter. If we repeated this 100 times, ~C% of intervals would contain the true mean.',
        variables: ['C% = confidence level (e.g. 95%)', '[L, U] = lower and upper bounds'],
        gotcha: 'Wrong: "there is a 95% probability the mean is in this interval." The true mean is fixed — the interval is random.',
      },
    ],
  },
  {
    id: 'hypothesis-testing',
    title: 'Hypothesis Testing',
    description: 'Test statistics, p-values, and decision rules',
    formulas: [
      {
        name: 'Z-Test Statistic (σ known)',
        formula: 'z = (x̄ − μ₀) / (σ / √n)',
        description: 'Test statistic when population σ is known. Measures how many standard errors x̄ is from the hypothesized mean.',
        variables: ['x̄ = sample mean', 'μ₀ = hypothesized mean (from H₀)', 'σ / √n = standard error'],
        pythonCode: 'z = (x_bar - mu0) / (sigma / np.sqrt(n))',
      },
      {
        name: 'T-Test Statistic (σ unknown)',
        formula: 't = (x̄ − μ₀) / (s / √n)',
        description: 'Test statistic when population σ is unknown. Uses sample std dev s and t-distribution with df = n−1.',
        variables: ['s = sample std dev', 'df = n − 1'],
        pythonCode: 'stats.ttest_1samp(data, popmean=mu0, alternative="two-sided")',
      },
      {
        name: 'Two-Tailed P-Value (Z)',
        formula: 'p = 2 · P(Z > |z|) = 2 · sf(|z|)',
        description: 'Probability of getting a test statistic as extreme as z in either direction, assuming H₀ is true.',
        variables: ['|z| = absolute value of z-statistic', 'sf = survival function = 1 − CDF'],
        pythonCode: 'p = 2 * stats.norm.sf(abs(z_stat))',
        gotcha: 'For one-tailed: don\'t multiply by 2. Use alternative="greater" or "less" in scipy.',
      },
      {
        name: 'Decision Rule',
        formula: 'Reject H₀ if p-value < α',
        description: 'Compare p-value to significance level α. Equivalently, reject if |test stat| > critical value.',
        variables: ['α = significance level (typically 0.05)', 'p-value = probability of observed result under H₀'],
        gotcha: '"Do not reject H₀" ≠ "accept H₀". We never prove H₀ is true.',
      },
      {
        name: 'Pooled Std Dev (Equal Variance)',
        formula: 'sₚ = √(((n₁−1)s₁² + (n₂−1)s₂²) / (n₁ + n₂ − 2))',
        description: 'Weighted average of two sample variances, used in pooled t-tests when equal variance is assumed.',
        variables: ['s₁, s₂ = sample std devs', 'n₁, n₂ = sample sizes', 'df = n₁ + n₂ − 2'],
        pythonCode: 'stats.ttest_ind(a, b, equal_var=True)',
      },
      {
        name: 'Critical Values',
        formula: 'z* = ppf(1 − α) for one-tail,  z* = ppf(1 − α/2) for two-tail',
        description: 'The threshold value that separates the rejection region from the non-rejection region.',
        variables: ['α = significance level', 'ppf = percent point function (inverse CDF)'],
        pythonCode: 'stats.norm.ppf(1 - alpha)  # one-tail\nstats.norm.ppf(1 - alpha/2)  # two-tail',
      },
    ],
  },
  {
    id: 'counting',
    title: 'Counting & Probability',
    description: 'Combinatorics and basic probability rules',
    formulas: [
      {
        name: 'Permutation',
        formula: 'P(n, r) = n! / (n − r)!',
        description: 'Number of ways to arrange r items from n, where order matters.',
        variables: ['n = total items', 'r = items to arrange'],
        pythonCode: 'math.perm(n, r)',
      },
      {
        name: 'Combination',
        formula: 'C(n, r) = n! / (r!(n − r)!)',
        description: 'Number of ways to choose r items from n, where order does NOT matter.',
        variables: ['n = total items', 'r = items to choose'],
        pythonCode: 'math.comb(n, r)',
      },
      {
        name: 'Addition Rule',
        formula: 'P(A ∪ B) = P(A) + P(B) − P(A ∩ B)',
        description: 'Probability of A or B occurring. Subtract the intersection to avoid double-counting.',
        variables: ['P(A ∪ B) = probability of A or B', 'P(A ∩ B) = probability of both A and B'],
      },
      {
        name: 'Conditional Probability',
        formula: 'P(A | B) = P(A ∩ B) / P(B)',
        description: 'Probability of A given that B has occurred.',
        variables: ['P(A | B) = probability of A given B', 'P(B) > 0'],
      },
      {
        name: 'Independence',
        formula: 'A and B independent  iff  P(A ∩ B) = P(A) · P(B)',
        description: 'Two events are independent if knowing one gives no information about the other.',
        variables: [],
      },
      {
        name: 'Complement Rule',
        formula: 'P(not A) = 1 − P(A)',
        description: 'Probability of A NOT happening. Useful when computing P(X >= 1) = 1 - P(X = 0).',
        variables: [],
      },
    ],
  },
]

export const formulaCount = formulaCategories.reduce(
  (sum, cat) => sum + cat.formulas.length,
  0
)
