export interface Question {
  readonly id: number
  readonly session: number
  readonly question: string
  readonly options: readonly string[]
  readonly correctIndex: number
}

export const questions: readonly Question[] = [
  // ============================================================
  // SESSION 1: Foundations (ids 1–20)
  // ============================================================
  {
    id: 1,
    session: 1,
    question: "A survey records customers' favourite colour (red, blue, green). What type of data is this?",
    options: [
      "Nominal",
      "Ordinal",
      "Discrete",
      "Continuous"
    ],
    correctIndex: 0
  },
  {
    id: 2,
    session: 1,
    question: "Student satisfaction rated as 'Poor', 'Fair', 'Good', 'Excellent' is an example of which data type?",
    options: [
      "Nominal",
      "Ordinal",
      "Continuous",
      "Discrete"
    ],
    correctIndex: 1
  },
  {
    id: 3,
    session: 1,
    question: "The number of cars passing a toll booth per hour is best classified as:",
    options: [
      "Continuous",
      "Nominal",
      "Ordinal",
      "Discrete"
    ],
    correctIndex: 3
  },
  {
    id: 4,
    session: 1,
    question: "Body temperature measured in degrees Celsius is an example of:",
    options: [
      "Nominal data",
      "Ordinal data",
      "Discrete data",
      "Continuous data"
    ],
    correctIndex: 3
  },
  {
    id: 5,
    session: 1,
    question: "Which statement best distinguishes Frequentist from Bayesian statistics?",
    options: [
      "Frequentists use sample data; Bayesians do not",
      "Bayesians incorporate prior beliefs and update them with data; Frequentists treat parameters as fixed",
      "Frequentists assign probabilities to parameters; Bayesians do not",
      "Bayesian methods never use likelihood functions"
    ],
    correctIndex: 1
  },
  {
    id: 6,
    session: 1,
    question: "In the Frequentist framework, what does a 95% confidence interval mean?",
    options: [
      "There is a 95% probability the parameter lies in this specific interval",
      "95% of the data falls within the interval",
      "If we repeated the procedure many times, about 95% of the constructed intervals would contain the true parameter",
      "The parameter is 95% likely to equal the sample estimate"
    ],
    correctIndex: 2
  },
  {
    id: 7,
    session: 1,
    question: "Which CRISP-DM phase involves understanding the business objectives and requirements?",
    options: [
      "Data Understanding",
      "Data Preparation",
      "Business Understanding",
      "Modelling"
    ],
    correctIndex: 2
  },
  {
    id: 8,
    session: 1,
    question: "In CRISP-DM, cleaning, transforming, and feature engineering happen in which phase?",
    options: [
      "Business Understanding",
      "Data Understanding",
      "Data Preparation",
      "Evaluation"
    ],
    correctIndex: 2
  },
  {
    id: 9,
    session: 1,
    question: "Which of the following is NOT one of the five pillars of a statistical mindset?",
    options: [
      "Data are not just numbers — context matters",
      "Variation is everywhere and must be accounted for",
      "Larger samples always guarantee correct conclusions",
      "Correlation does not imply causation"
    ],
    correctIndex: 2
  },
  {
    id: 10,
    session: 1,
    question: "What is the primary purpose of NumPy compared to Pandas?",
    options: [
      "NumPy is for labelled tabular data; Pandas is for numerical arrays",
      "NumPy provides fast numerical array operations; Pandas provides labelled DataFrames for tabular data",
      "NumPy replaces Pandas entirely",
      "Pandas is faster for element-wise mathematical operations on arrays"
    ],
    correctIndex: 1
  },
  {
    id: 11,
    session: 1,
    question: "In Pandas, df.loc[0:3, 'Age'] selects rows by:",
    options: [
      "Integer position, exclusive of the endpoint",
      "Label-based indexing, inclusive of both endpoints",
      "Integer position, inclusive of the endpoint",
      "Label-based indexing, exclusive of the endpoint"
    ],
    correctIndex: 1
  },
  {
    id: 12,
    session: 1,
    question: "In Pandas, df.iloc[0:3] selects:",
    options: [
      "Rows at positions 0, 1, 2 (endpoint exclusive)",
      "Rows at positions 0, 1, 2, 3 (endpoint inclusive)",
      "Rows with label values 0 through 3",
      "The first and last 3 rows"
    ],
    correctIndex: 0
  },
  {
    id: 13,
    session: 1,
    question: "What is the default ddof (delta degrees of freedom) for numpy.std()?",
    options: [
      "1 (sample standard deviation)",
      "0 (population standard deviation)",
      "n (number of elements)",
      "It has no default; you must specify it"
    ],
    correctIndex: 1
  },
  {
    id: 14,
    session: 1,
    question: "What is the default ddof for pandas Series.std()?",
    options: [
      "0 (population standard deviation)",
      "1 (sample standard deviation)",
      "2",
      "It matches NumPy's default of 0"
    ],
    correctIndex: 1
  },
  {
    id: 15,
    session: 1,
    question: "When numpy.std() and pandas .std() are called on the same data with default settings, which gives a larger value?",
    options: [
      "numpy.std() because it divides by n-1",
      "pandas .std() because it divides by n-1 (Bessel's correction)",
      "They always return the same value",
      "numpy.std() because it divides by n+1"
    ],
    correctIndex: 1
  },
  {
    id: 16,
    session: 1,
    question: "CRISP-DM is best described as:",
    options: [
      "A linear, one-pass methodology for data projects",
      "An iterative, cross-industry standard process for data mining",
      "A programming framework for machine learning",
      "A statistical test for model validation"
    ],
    correctIndex: 1
  },
  {
    id: 17,
    session: 1,
    question: "Which pillar of the statistical mindset warns against assuming a pattern in a sample will hold in the population?",
    options: [
      "Data are not just numbers",
      "Variation is everywhere",
      "Sampling matters — who/what/how you sample affects conclusions",
      "Correlation does not imply causation"
    ],
    correctIndex: 2
  },
  {
    id: 18,
    session: 1,
    question: "Zip codes are numeric but are best classified as:",
    options: [
      "Discrete quantitative data",
      "Continuous quantitative data",
      "Nominal categorical data",
      "Ordinal categorical data"
    ],
    correctIndex: 2
  },
  {
    id: 19,
    session: 1,
    question: "In the Bayesian framework, what represents your belief about a parameter before seeing data?",
    options: [
      "Posterior distribution",
      "Likelihood function",
      "Prior distribution",
      "Sampling distribution"
    ],
    correctIndex: 2
  },
  {
    id: 20,
    session: 1,
    question: "Which CRISP-DM phase checks whether the model meets the business objectives defined in the first phase?",
    options: [
      "Modelling",
      "Deployment",
      "Data Understanding",
      "Evaluation"
    ],
    correctIndex: 3
  },

  // ============================================================
  // SESSION 2: Descriptive Statistics (ids 21–40)
  // ============================================================
  {
    id: 21,
    session: 2,
    question: "A dataset of household incomes is heavily right-skewed. Which measure of central tendency best represents the 'typical' income?",
    options: [
      "Mean",
      "Median",
      "Mode",
      "Range"
    ],
    correctIndex: 1
  },
  {
    id: 22,
    session: 2,
    question: "When is the mode the most appropriate measure of central tendency?",
    options: [
      "When data are continuous and symmetric",
      "When you need the arithmetic average",
      "When data are categorical (nominal)",
      "When the dataset has no repeated values"
    ],
    correctIndex: 2
  },
  {
    id: 23,
    session: 2,
    question: "The interquartile range (IQR) is calculated as:",
    options: [
      "Q3 − Q1",
      "Q2 − Q1",
      "Max − Min",
      "Q3 − Q2"
    ],
    correctIndex: 0
  },
  {
    id: 24,
    session: 2,
    question: "Given Q1 = 20 and Q3 = 50, the upper fence for boxplot outlier detection is:",
    options: [
      "50 + 1.5 × 30 = 95",
      "50 + 1.5 × 50 = 125",
      "20 + 1.5 × 30 = 65",
      "50 + 3 × 30 = 140"
    ],
    correctIndex: 0
  },
  {
    id: 25,
    session: 2,
    question: "Given Q1 = 20 and Q3 = 50, the lower fence for boxplot outlier detection is:",
    options: [
      "20 − 1.5 × 50 = −55",
      "20 − 1.5 × 30 = −25",
      "0",
      "50 − 1.5 × 30 = 5"
    ],
    correctIndex: 1
  },
  {
    id: 26,
    session: 2,
    question: "Why does the sample variance formula use n − 1 instead of n in the denominator (Bessel's correction)?",
    options: [
      "To make the variance smaller and more conservative",
      "Because dividing by n systematically underestimates the population variance; n − 1 gives an unbiased estimate",
      "It is simply a convention with no mathematical justification",
      "To account for outliers in the sample"
    ],
    correctIndex: 1
  },
  {
    id: 27,
    session: 2,
    question: "A distribution has a skewness value of +2.1. This indicates:",
    options: [
      "A symmetric distribution",
      "A left-skewed (negatively skewed) distribution",
      "A right-skewed (positively skewed) distribution with a long right tail",
      "A bimodal distribution"
    ],
    correctIndex: 2
  },
  {
    id: 28,
    session: 2,
    question: "For a left-skewed distribution, which relationship among mean, median, and mode is typically true?",
    options: [
      "Mean > Median > Mode",
      "Mean = Median = Mode",
      "Mean < Median < Mode",
      "Mode < Mean < Median"
    ],
    correctIndex: 2
  },
  {
    id: 29,
    session: 2,
    question: "You want to show the distribution shape of a single continuous variable. Which chart is most appropriate?",
    options: [
      "Bar chart",
      "Pie chart",
      "Histogram",
      "Scatter plot"
    ],
    correctIndex: 2
  },
  {
    id: 30,
    session: 2,
    question: "Which chart is best for comparing a continuous variable's distribution across multiple categories?",
    options: [
      "Pie chart",
      "Boxplot (grouped)",
      "Line chart",
      "Stacked bar chart"
    ],
    correctIndex: 1
  },
  {
    id: 31,
    session: 2,
    question: "Data is Missing Completely At Random (MCAR) when:",
    options: [
      "The probability of being missing depends on the missing value itself",
      "The probability of being missing depends on other observed variables",
      "The probability of being missing is unrelated to any observed or unobserved data",
      "All values in the dataset are missing"
    ],
    correctIndex: 2
  },
  {
    id: 32,
    session: 2,
    question: "In a medical study, sicker patients are more likely to skip follow-up visits, so their health outcomes are missing. This is an example of:",
    options: [
      "MCAR — Missing Completely At Random",
      "MAR — Missing At Random",
      "MNAR — Missing Not At Random",
      "Systematic sampling error"
    ],
    correctIndex: 2
  },
  {
    id: 33,
    session: 2,
    question: "Replacing missing values with the column mean will:",
    options: [
      "Increase the variance of that column",
      "Decrease the variance (underestimate spread) because added values cluster at the centre",
      "Have no effect on the variance",
      "Always introduce bias in the mean"
    ],
    correctIndex: 1
  },
  {
    id: 34,
    session: 2,
    question: "A dataset has values: 3, 7, 7, 10, 15. The mean is 8.4. Which statement is correct?",
    options: [
      "The median is 8.4",
      "The median is 7",
      "The mode is 10",
      "The median is 7 and the mode is 7"
    ],
    correctIndex: 3
  },
  {
    id: 35,
    session: 2,
    question: "The standard deviation is preferred over the variance for interpretation because:",
    options: [
      "It is always a larger number",
      "It is in the same units as the original data",
      "It is unaffected by outliers",
      "It accounts for skewness"
    ],
    correctIndex: 1
  },
  {
    id: 36,
    session: 2,
    question: "A skewness value close to 0 indicates:",
    options: [
      "Heavy tails",
      "An approximately symmetric distribution",
      "A uniform distribution",
      "The data has no outliers"
    ],
    correctIndex: 1
  },
  {
    id: 37,
    session: 2,
    question: "Which type of chart is best for showing the relationship between two continuous variables?",
    options: [
      "Histogram",
      "Boxplot",
      "Scatter plot",
      "Bar chart"
    ],
    correctIndex: 2
  },
  {
    id: 38,
    session: 2,
    question: "MAR (Missing At Random) means:",
    options: [
      "Data is missing for no reason at all",
      "The probability of being missing depends on other observed variables but not on the missing value itself",
      "The probability of being missing depends on the missing value itself",
      "The missing data can be safely ignored without any adjustments"
    ],
    correctIndex: 1
  },
  {
    id: 39,
    session: 2,
    question: "Imputing missing values with the median instead of the mean is generally preferred when:",
    options: [
      "The data is perfectly symmetric",
      "The data is heavily skewed or contains outliers",
      "The data is categorical",
      "You have a very large sample size"
    ],
    correctIndex: 1
  },
  {
    id: 40,
    session: 2,
    question: "A kurtosis value much greater than 3 (excess kurtosis >> 0) for a distribution indicates:",
    options: [
      "A flat-topped (platykurtic) distribution with thin tails",
      "A peaked (leptokurtic) distribution with heavy tails — more outliers than a normal distribution",
      "The distribution is perfectly normal",
      "The distribution is left-skewed"
    ],
    correctIndex: 1
  },

  // ============================================================
  // SESSION 3: Probability & Distributions (ids 41–70)
  // ============================================================
  {
    id: 41,
    session: 3,
    question: "How many ways can you arrange 5 distinct books on a shelf? This is a:",
    options: [
      "Combination: C(5,5) = 1",
      "Permutation: 5! = 120",
      "Combination: 5! / 2! = 60",
      "Permutation: 5^5 = 3125"
    ],
    correctIndex: 1
  },
  {
    id: 42,
    session: 3,
    question: "A committee of 3 is chosen from 10 people. The number of possible committees is:",
    options: [
      "P(10,3) = 720",
      "C(10,3) = 120",
      "10^3 = 1000",
      "3! × 10 = 60"
    ],
    correctIndex: 1
  },
  {
    id: 43,
    session: 3,
    question: "If P(A) = 0.3 and P(B) = 0.4, and A and B are mutually exclusive, what is P(A or B)?",
    options: [
      "0.12",
      "0.70",
      "0.58",
      "0.30"
    ],
    correctIndex: 1
  },
  {
    id: 44,
    session: 3,
    question: "If P(A) = 0.5, P(B) = 0.4, and P(A and B) = 0.2, what is P(A | B)?",
    options: [
      "0.5",
      "0.4",
      "0.8",
      "0.2 / 0.4 = 0.5"
    ],
    correctIndex: 3
  },
  {
    id: 45,
    session: 3,
    question: "Two events A and B are independent if and only if:",
    options: [
      "P(A and B) = P(A) + P(B)",
      "P(A | B) = P(A)",
      "P(A or B) = P(A) × P(B)",
      "P(A and B) = 0"
    ],
    correctIndex: 1
  },
  {
    id: 46,
    session: 3,
    question: "A fair die is rolled. What is the probability of getting an even number OR a number greater than 4?",
    options: [
      "P = 3/6 + 2/6 − 1/6 = 4/6 = 2/3",
      "P = 3/6 + 2/6 = 5/6",
      "P = 3/6 × 2/6 = 1/6",
      "P = 1/2"
    ],
    correctIndex: 0
  },
  {
    id: 47,
    session: 3,
    question: "You flip a coin 10 times. The number of heads follows which distribution?",
    options: [
      "Poisson",
      "Normal",
      "Binomial",
      "Uniform"
    ],
    correctIndex: 2
  },
  {
    id: 48,
    session: 3,
    question: "The number of customer arrivals at a store per hour, given a constant average rate, follows which distribution?",
    options: [
      "Binomial",
      "Poisson",
      "Exponential",
      "Uniform"
    ],
    correctIndex: 1
  },
  {
    id: 49,
    session: 3,
    question: "The waiting time between consecutive Poisson events follows which distribution?",
    options: [
      "Poisson",
      "Binomial",
      "Normal",
      "Exponential"
    ],
    correctIndex: 3
  },
  {
    id: 50,
    session: 3,
    question: "In scipy.stats, randint(low=1, high=7) models a discrete uniform distribution over which values?",
    options: [
      "1, 2, 3, 4, 5, 6, 7 (inclusive of high)",
      "1, 2, 3, 4, 5, 6 (high is exclusive)",
      "0, 1, 2, 3, 4, 5, 6",
      "1 through 7 with unequal weights"
    ],
    correctIndex: 1
  },
  {
    id: 51,
    session: 3,
    question: "In scipy.stats.expon, if the true rate is λ = 2 events per minute, what should the scale parameter be?",
    options: [
      "scale = 2",
      "scale = 1/2 = 0.5",
      "scale = 2²= 4",
      "scale = √2"
    ],
    correctIndex: 1
  },
  {
    id: 52,
    session: 3,
    question: "In scipy.stats.norm(loc, scale), the 'scale' parameter represents:",
    options: [
      "The variance σ²",
      "The mean μ",
      "The standard deviation σ",
      "The standard error"
    ],
    correctIndex: 2
  },
  {
    id: 53,
    session: 3,
    question: "For a discrete random variable, P(X ≥ 5) is computed using scipy.stats as:",
    options: [
      "1 − cdf(5)",
      "1 − cdf(4) or equivalently sf(4)",
      "sf(5)",
      "pmf(5)"
    ],
    correctIndex: 1
  },
  {
    id: 54,
    session: 3,
    question: "For a continuous random variable, P(X ≥ 5) is computed as:",
    options: [
      "1 − cdf(4)",
      "1 − cdf(5) or equivalently sf(5)",
      "pmf(5)",
      "cdf(5)"
    ],
    correctIndex: 1
  },
  {
    id: 55,
    session: 3,
    question: "Why does the distinction between P(X ≥ k) and P(X > k) matter for discrete but not continuous distributions?",
    options: [
      "Continuous distributions have higher variance",
      "For continuous distributions P(X = k) = 0, so P(X ≥ k) = P(X > k)",
      "Discrete distributions cannot use CDF",
      "The distinction matters equally for both"
    ],
    correctIndex: 1
  },
  {
    id: 56,
    session: 3,
    question: "If events occur at a rate of 6 per hour, what is the Poisson rate parameter λ for a 10-minute interval?",
    options: [
      "6",
      "60",
      "1",
      "0.6"
    ],
    correctIndex: 2
  },
  {
    id: 57,
    session: 3,
    question: "For a Binomial(n, p) distribution, the expected value E(X) is:",
    options: [
      "n × p",
      "n × p × (1 − p)",
      "p / n",
      "n / p"
    ],
    correctIndex: 0
  },
  {
    id: 58,
    session: 3,
    question: "For a Binomial(n, p) distribution, the variance Var(X) is:",
    options: [
      "n × p",
      "n × p × (1 − p)",
      "p × (1 − p)",
      "(n × p)²"
    ],
    correctIndex: 1
  },
  {
    id: 59,
    session: 3,
    question: "For a Poisson(λ) distribution, E(X) and Var(X) are:",
    options: [
      "E(X) = λ, Var(X) = λ²",
      "E(X) = λ, Var(X) = λ",
      "E(X) = 1/λ, Var(X) = 1/λ²",
      "E(X) = λ², Var(X) = λ"
    ],
    correctIndex: 1
  },
  {
    id: 60,
    session: 3,
    question: "For an Exponential distribution with rate λ, the expected value E(X) is:",
    options: [
      "λ",
      "λ²",
      "1/λ",
      "1/λ²"
    ],
    correctIndex: 2
  },
  {
    id: 61,
    session: 3,
    question: "A company ships 100 items and each has a 2% defect rate independently. The expected number of defective items is:",
    options: [
      "0.02",
      "2",
      "20",
      "0.2"
    ],
    correctIndex: 1
  },
  {
    id: 62,
    session: 3,
    question: "The pmf function gives P(X = k). When should you use pmf instead of cdf?",
    options: [
      "When computing cumulative probabilities",
      "When computing the probability of a specific single value for a discrete variable",
      "When working with continuous distributions",
      "When computing P(X > k)"
    ],
    correctIndex: 1
  },
  {
    id: 63,
    session: 3,
    question: "Using the empirical CDF: if 15 out of 50 observations are ≤ 10, then F̂(10) =",
    options: [
      "15/50 = 0.30",
      "10/50 = 0.20",
      "15/10 = 1.50",
      "50/15 = 3.33"
    ],
    correctIndex: 0
  },
  {
    id: 64,
    session: 3,
    question: "A factory produces widgets with a defect rate of 0.01. You inspect 500 widgets. Which distribution best models the number of defects?",
    options: [
      "Normal distribution",
      "Poisson distribution (λ = 5) as an approximation to Binomial",
      "Exponential distribution",
      "Uniform distribution"
    ],
    correctIndex: 1
  },
  {
    id: 65,
    session: 3,
    question: "The Normal distribution is fully characterised by which two parameters?",
    options: [
      "n and p",
      "λ and k",
      "μ (mean) and σ (standard deviation)",
      "α and β"
    ],
    correctIndex: 2
  },
  {
    id: 66,
    session: 3,
    question: "For the standard normal distribution Z ~ N(0,1), approximately what percentage of values lie within ±1.96 standard deviations?",
    options: [
      "68%",
      "90%",
      "95%",
      "99%"
    ],
    correctIndex: 2
  },
  {
    id: 67,
    session: 3,
    question: "You want to model whether each of 20 patients responds to a drug (yes/no) with a known success probability. Which distribution applies?",
    options: [
      "Poisson",
      "Binomial",
      "Exponential",
      "Normal"
    ],
    correctIndex: 1
  },
  {
    id: 68,
    session: 3,
    question: "The survival function sf(x) = 1 − cdf(x) gives:",
    options: [
      "P(X ≤ x)",
      "P(X = x)",
      "P(X > x)",
      "The density at x"
    ],
    correctIndex: 2
  },
  {
    id: 69,
    session: 3,
    question: "A discrete uniform distribution on {1, 2, 3, 4, 5} has E(X) =",
    options: [
      "2.5",
      "3",
      "3.5",
      "5"
    ],
    correctIndex: 1
  },
  {
    id: 70,
    session: 3,
    question: "If two events are mutually exclusive, they cannot be independent (assuming both have nonzero probability). Why?",
    options: [
      "Because mutually exclusive events always occur together",
      "Because if A occurs, P(B|A) = 0 ≠ P(B), violating the independence condition",
      "Because their probabilities must sum to 1",
      "This statement is false — mutually exclusive events can be independent"
    ],
    correctIndex: 1
  },

  // ============================================================
  // SESSION 4: CLT & Confidence Intervals (ids 71–85)
  // ============================================================
  {
    id: 71,
    session: 4,
    question: "The Central Limit Theorem (CLT) states that as sample size n increases:",
    options: [
      "The population distribution becomes normal",
      "The sampling distribution of the sample mean approaches a normal distribution",
      "The sample standard deviation approaches zero",
      "Individual observations become normally distributed"
    ],
    correctIndex: 1
  },
  {
    id: 72,
    session: 4,
    question: "Which of the following does the CLT NOT guarantee?",
    options: [
      "The sampling distribution of the mean is approximately normal for large n",
      "The standard error decreases as n increases",
      "The original population distribution is normal",
      "The mean of the sampling distribution equals the population mean"
    ],
    correctIndex: 2
  },
  {
    id: 73,
    session: 4,
    question: "The standard error of the sample mean is calculated as:",
    options: [
      "σ × √n",
      "σ / √n",
      "σ / n",
      "σ² / n"
    ],
    correctIndex: 1
  },
  {
    id: 74,
    session: 4,
    question: "If you quadruple the sample size, the standard error of the mean is:",
    options: [
      "Quartered",
      "Halved",
      "Doubled",
      "Unchanged"
    ],
    correctIndex: 1
  },
  {
    id: 75,
    session: 4,
    question: "You should use the t-distribution instead of the Z-distribution when:",
    options: [
      "The sample size is large (n > 30) and σ is known",
      "The population standard deviation σ is unknown and estimated by s",
      "The data is not normally distributed",
      "You are working with proportions"
    ],
    correctIndex: 1
  },
  {
    id: 76,
    session: 4,
    question: "A 95% confidence interval for a population mean is (12.3, 18.7). Which interpretation is correct?",
    options: [
      "95% of the population values lie between 12.3 and 18.7",
      "There is a 95% probability that the true mean is between 12.3 and 18.7",
      "We are 95% confident that this interval contains the true population mean; if we repeated the sampling process many times, about 95% of such intervals would contain the true mean",
      "The sample mean is exactly 15.5 with 95% certainty"
    ],
    correctIndex: 2
  },
  {
    id: 77,
    session: 4,
    question: "Increasing the sample size while keeping the confidence level constant will:",
    options: [
      "Widen the confidence interval",
      "Narrow the confidence interval",
      "Not change the width of the confidence interval",
      "Change the confidence level"
    ],
    correctIndex: 1
  },
  {
    id: 78,
    session: 4,
    question: "Increasing the confidence level (e.g., from 90% to 99%) while keeping sample size constant will:",
    options: [
      "Narrow the confidence interval",
      "Widen the confidence interval",
      "Not change the width",
      "Reduce the sample size needed"
    ],
    correctIndex: 1
  },
  {
    id: 79,
    session: 4,
    question: "A 95% CI for the difference in means (μ₁ − μ₂) is (−3.2, 5.8). What can we conclude?",
    options: [
      "The means are significantly different because the interval is wide",
      "The means are significantly different because 5.8 > 3.2",
      "We cannot conclude the means are different because the interval contains 0",
      "μ₁ is definitely larger than μ₂"
    ],
    correctIndex: 2
  },
  {
    id: 80,
    session: 4,
    question: "A 95% CI for (μ₁ − μ₂) is (2.1, 8.4). What can we conclude?",
    options: [
      "There is no significant difference between the means",
      "μ₁ is significantly greater than μ₂ because the entire interval is positive",
      "μ₂ is greater than μ₁",
      "We need more data to conclude anything"
    ],
    correctIndex: 1
  },
  {
    id: 81,
    session: 4,
    question: "The rule of thumb for the CLT to apply (sampling distribution of the mean is approximately normal) is typically:",
    options: [
      "n > 5",
      "n > 10",
      "n ≥ 30",
      "n > 100"
    ],
    correctIndex: 2
  },
  {
    id: 82,
    session: 4,
    question: "As degrees of freedom increase, the t-distribution:",
    options: [
      "Becomes more spread out with heavier tails",
      "Approaches the standard normal (Z) distribution",
      "Becomes skewed to the right",
      "Becomes a uniform distribution"
    ],
    correctIndex: 1
  },
  {
    id: 83,
    session: 4,
    question: "A sample of n = 64 has mean x̄ = 50 and s = 8. The standard error is:",
    options: [
      "8 / √64 = 1.0",
      "8 × √64 = 64",
      "8 / 64 = 0.125",
      "50 / √64 = 6.25"
    ],
    correctIndex: 0
  },
  {
    id: 84,
    session: 4,
    question: "Which statement about the CLT is TRUE?",
    options: [
      "The CLT requires the population to be normally distributed",
      "The CLT only applies to the sampling distribution of the mean, not to individual observations",
      "The CLT makes the population distribution normal",
      "The CLT eliminates all sampling bias"
    ],
    correctIndex: 1
  },
  {
    id: 85,
    session: 4,
    question: "When constructing a CI for the difference between two independent population means with unknown σ, we use:",
    options: [
      "A paired t-test",
      "A Z-interval because n is always large",
      "A two-sample t-interval",
      "A chi-squared interval"
    ],
    correctIndex: 2
  },

  // ============================================================
  // SESSION 5: Hypothesis Testing (ids 86–100)
  // ============================================================
  {
    id: 86,
    session: 5,
    question: "The null hypothesis (H₀) typically represents:",
    options: [
      "The research hypothesis we want to prove",
      "The status quo or no-effect / no-difference claim",
      "The alternative to what we believe",
      "A hypothesis that is always true"
    ],
    correctIndex: 1
  },
  {
    id: 87,
    session: 5,
    question: "A researcher wants to test if a new drug lowers blood pressure. The alternative hypothesis should be:",
    options: [
      "H₁: μ_new = μ_old (no difference)",
      "H₁: μ_new > μ_old (new is higher)",
      "H₁: μ_new < μ_old (new is lower)",
      "H₁: μ_new ≠ μ_old (two-tailed)"
    ],
    correctIndex: 2
  },
  {
    id: 88,
    session: 5,
    question: "A test to determine whether a coin is fair (not biased in either direction) would use:",
    options: [
      "A one-tailed test (right)",
      "A one-tailed test (left)",
      "A two-tailed test",
      "No hypothesis test is needed"
    ],
    correctIndex: 2
  },
  {
    id: 89,
    session: 5,
    question: "The p-value is best interpreted as:",
    options: [
      "The probability that the null hypothesis is true",
      "The probability of observing data as extreme as (or more extreme than) the sample, assuming H₀ is true",
      "The probability of making a Type II error",
      "The significance level α"
    ],
    correctIndex: 1
  },
  {
    id: 90,
    session: 5,
    question: "If the p-value is 0.03 and α = 0.05, we should:",
    options: [
      "Accept H₀",
      "Fail to reject H₀",
      "Reject H₀ in favour of H₁",
      "Increase the sample size"
    ],
    correctIndex: 2
  },
  {
    id: 91,
    session: 5,
    question: "When the population is normal and σ is known, which test should be used for a single mean?",
    options: [
      "t-test",
      "Z-test",
      "Chi-squared test",
      "Mann-Whitney U test"
    ],
    correctIndex: 1
  },
  {
    id: 92,
    session: 5,
    question: "When σ is unknown and the sample size is small (n < 30), which test is appropriate for a single mean (assuming normality)?",
    options: [
      "Z-test",
      "t-test",
      "Mann-Whitney U test",
      "Kruskal-Wallis test"
    ],
    correctIndex: 1
  },
  {
    id: 93,
    session: 5,
    question: "A Type I error occurs when:",
    options: [
      "We fail to reject a false H₀",
      "We reject a true H₀",
      "We accept H₁ when it is true",
      "The sample size is too small"
    ],
    correctIndex: 1
  },
  {
    id: 94,
    session: 5,
    question: "A Type II error occurs when:",
    options: [
      "We reject a true H₀",
      "We fail to reject a false H₀ (miss a real effect)",
      "We set α too low",
      "We use a two-tailed test instead of one-tailed"
    ],
    correctIndex: 1
  },
  {
    id: 95,
    session: 5,
    question: "After conducting a hypothesis test with p-value = 0.12 and α = 0.05, the correct conclusion is:",
    options: [
      "Accept H₀ — there is no effect",
      "Reject H₀ — the evidence supports H₁",
      "Fail to reject H₀ — there is not enough evidence to conclude H₁",
      "The test is inconclusive and must be repeated"
    ],
    correctIndex: 2
  },
  {
    id: 96,
    session: 5,
    question: "Why do we say 'fail to reject H₀' instead of 'accept H₀'?",
    options: [
      "Because failing to reject sounds more scientific",
      "Because not finding enough evidence against H₀ is not the same as proving H₀ is true",
      "Because H₀ is always false",
      "They mean the same thing — it is just convention"
    ],
    correctIndex: 1
  },
  {
    id: 97,
    session: 5,
    question: "The Shapiro-Wilk test is used to:",
    options: [
      "Test whether two groups have equal means",
      "Test whether data comes from a normal distribution",
      "Test for homogeneity of variances",
      "Test for independence of observations"
    ],
    correctIndex: 1
  },
  {
    id: 98,
    session: 5,
    question: "If a Shapiro-Wilk test returns p = 0.002, what do we conclude at α = 0.05?",
    options: [
      "The data is normally distributed",
      "We fail to reject normality",
      "We reject normality — the data is likely not normally distributed",
      "The test is invalid for this sample size"
    ],
    correctIndex: 2
  },
  {
    id: 99,
    session: 5,
    question: "You have two independent groups, the data is not normally distributed, and you want to compare their central tendencies. Which test is appropriate?",
    options: [
      "Independent samples t-test",
      "Paired t-test",
      "Mann-Whitney U test",
      "One-sample Z-test"
    ],
    correctIndex: 2
  },
  {
    id: 100,
    session: 5,
    question: "The Wilcoxon signed-rank test is the non-parametric alternative to:",
    options: [
      "Independent samples t-test",
      "Paired samples t-test",
      "One-way ANOVA",
      "Chi-squared test"
    ],
    correctIndex: 1
  },
  {
    id: 101,
    session: 5,
    question: "A Kolmogorov-Smirnov (KS) test compares:",
    options: [
      "The means of two groups",
      "The cumulative distribution function of sample data against a reference distribution",
      "The variances of two samples",
      "The modes of two distributions"
    ],
    correctIndex: 1
  },
  {
    id: 102,
    session: 5,
    question: "Which of the following is a parametric test?",
    options: [
      "Mann-Whitney U",
      "Wilcoxon signed-rank",
      "Kruskal-Wallis",
      "Independent samples t-test"
    ],
    correctIndex: 3
  },
  {
    id: 103,
    session: 5,
    question: "Parametric tests generally require which assumption about the data?",
    options: [
      "The data must be categorical",
      "The data (or sampling distribution) is approximately normal and measured on at least an interval scale",
      "The data must have outliers",
      "No assumptions are needed"
    ],
    correctIndex: 1
  },
  {
    id: 104,
    session: 3,
    question: "For a continuous distribution, P(X = 5) equals:",
    options: [
      "A small positive number",
      "Exactly 0",
      "The value of the PDF at 5",
      "The value of the CDF at 5"
    ],
    correctIndex: 1
  },
  {
    id: 105,
    session: 3,
    question: "Which scipy.stats method gives the value x such that P(X ≤ x) = q?",
    options: [
      "cdf(q)",
      "ppf(q) — the percent point function (inverse CDF)",
      "sf(q)",
      "pmf(q)"
    ],
    correctIndex: 1
  },
  // ============================================================
  // SESSION 6: Hypothesis Testing II — Comparing Groups (ids 106–125)
  // ============================================================
  {
    id: 106,
    session: 6,
    question: "One-Way ANOVA tests the null hypothesis that:",
    options: [
      "All group variances are equal",
      "All group means are equal",
      "At least two group medians differ",
      "The data is normally distributed"
    ],
    correctIndex: 1
  },
  {
    id: 107,
    session: 6,
    question: "The F-statistic in ANOVA is calculated as:",
    options: [
      "SSW / SSG",
      "MSG / MSW (between-group variance ÷ within-group variance)",
      "MSW / MSG",
      "SST / (n − 1)"
    ],
    correctIndex: 1
  },
  {
    id: 108,
    session: 6,
    question: "Which Python function performs a One-Way ANOVA directly and returns (F-statistic, p-value)?",
    options: [
      "stats.ttest_ind(a, b, c)",
      "stats.f_oneway(group1, group2, group3)",
      "stats.kruskal(group1, group2, group3)",
      "sm.stats.anova_lm(model)"
    ],
    correctIndex: 1
  },
  {
    id: 109,
    session: 6,
    question: "In the OLS approach to ANOVA, what does df.melt() do?",
    options: [
      "Removes missing values from the DataFrame",
      "Converts wide-format data (one column per group) to long format with 'group' and 'value' columns",
      "Computes the mean of each group",
      "Transposes the DataFrame"
    ],
    correctIndex: 1
  },
  {
    id: 110,
    session: 6,
    question: "After a significant One-Way ANOVA result, which post-hoc test identifies which specific pairs of groups differ?",
    options: [
      "Shapiro-Wilk test",
      "Tukey HSD (Honestly Significant Differences)",
      "Levene's test",
      "Kolmogorov-Smirnov test"
    ],
    correctIndex: 1
  },
  {
    id: 111,
    session: 6,
    question: "In pairwise_tukeyhsd(endog, groups, alpha), what is the 'endog' parameter?",
    options: [
      "The group labels",
      "The response variable (the values being compared)",
      "The significance level",
      "The number of groups"
    ],
    correctIndex: 1
  },
  {
    id: 112,
    session: 6,
    question: "Which two assumptions of ANOVA can be checked statistically (as opposed to by experimental design)?",
    options: [
      "Independence and continuity",
      "Normality of residuals and homogeneity of variances",
      "Random sampling and large sample size",
      "Equal group sizes and no outliers"
    ],
    correctIndex: 1
  },
  {
    id: 113,
    session: 6,
    question: "The Shapiro-Wilk test checks ANOVA residuals for:",
    options: [
      "Equal variances across groups",
      "Normality — H₀: residuals come from a normal distribution",
      "Independence of observations",
      "Whether group means are equal"
    ],
    correctIndex: 1
  },
  {
    id: 114,
    session: 6,
    question: "Levene's test checks whether:",
    options: [
      "Residuals are normally distributed",
      "The variances across groups are equal (homogeneity of variances)",
      "At least one group mean is different",
      "The data contains outliers"
    ],
    correctIndex: 1
  },
  {
    id: 115,
    session: 6,
    question: "In Two-Way ANOVA, the formula 'Score ~ Treatment + Gender + Treatment:Gender' tests:",
    options: [
      "Only the effect of Treatment",
      "Treatment effect, Gender effect, and their interaction effect",
      "Only the interaction between Treatment and Gender",
      "Whether Treatment and Gender are correlated"
    ],
    correctIndex: 1
  },
  {
    id: 116,
    session: 6,
    question: "If the interaction term in Two-Way ANOVA has p > 0.05, this means:",
    options: [
      "Neither factor is significant",
      "The interaction between the two factors is not statistically significant",
      "Both factors must be removed from the model",
      "The main effects are also not significant"
    ],
    correctIndex: 1
  },
  {
    id: 117,
    session: 6,
    question: "When should you use the Kruskal-Wallis test instead of One-Way ANOVA?",
    options: [
      "When you have exactly two groups",
      "When the data may not be normally distributed or ANOVA assumptions are violated",
      "When all groups have equal sample sizes",
      "When you want to test paired samples"
    ],
    correctIndex: 1
  },
  {
    id: 118,
    session: 6,
    question: "The Kruskal-Wallis test is a non-parametric alternative that works with:",
    options: [
      "Means and standard deviations",
      "Ranks of the data rather than raw values",
      "Only normally distributed data",
      "Paired observations"
    ],
    correctIndex: 1
  },
  {
    id: 119,
    session: 6,
    question: "After a significant Kruskal-Wallis result, which post-hoc test is used?",
    options: [
      "Tukey HSD",
      "Dunn's test (from scikit_posthocs)",
      "Levene's test",
      "Shapiro-Wilk test"
    ],
    correctIndex: 1
  },
  {
    id: 120,
    session: 6,
    question: "The Chi-Square Test of Independence tests whether:",
    options: [
      "Two continuous variables are correlated",
      "Two categorical variables are associated (not independent)",
      "A sample mean equals a hypothesized value",
      "Group variances are equal"
    ],
    correctIndex: 1
  },
  {
    id: 121,
    session: 6,
    question: "In chi2_contingency(matrix, correction=False), what does correction=False do?",
    options: [
      "Disables the chi-square calculation entirely",
      "Disables Yates' continuity correction (use for tables larger than 2×2 or when expected counts ≥ 5)",
      "Forces p-value to be exactly 0.05",
      "Applies Bonferroni correction"
    ],
    correctIndex: 1
  },
  {
    id: 122,
    session: 6,
    question: "Yates' continuity correction should be applied when:",
    options: [
      "All contingency tables regardless of size",
      "You have a 2×2 table with at least one expected count < 5",
      "The chi-square statistic is larger than 10",
      "You are testing more than two groups"
    ],
    correctIndex: 1
  },
  {
    id: 123,
    session: 6,
    question: "A standardized residual greater than 2 (or less than −2) in a chi-square test indicates:",
    options: [
      "The overall test is not significant",
      "That specific cell deviates significantly from its expected value",
      "The data is normally distributed",
      "Yates' correction is needed"
    ],
    correctIndex: 1
  },
  {
    id: 124,
    session: 6,
    question: "The standardized residual formula in a chi-square test is:",
    options: [
      "(Expected − Observed) / Observed",
      "(Observed − Expected) / √Expected",
      "(Observed − Expected) / Expected",
      "√(Observed − Expected)"
    ],
    correctIndex: 1
  },
  {
    id: 125,
    session: 6,
    question: "You have 4 groups with small, unequal sample sizes and suspect non-normality. Which test should you use?",
    options: [
      "One-Way ANOVA with Tukey HSD",
      "Kruskal-Wallis test with Dunn's post-hoc",
      "Two-Way ANOVA",
      "Chi-Square Test of Independence"
    ],
    correctIndex: 1
  }
] as const
