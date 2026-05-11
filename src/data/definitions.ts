export interface Definition {
  readonly term: string
  readonly description: string
}

export const definitions: readonly Definition[] = [
  {
    term: "Addition Principle",
    description:
      "If events A and B are mutually exclusive, the probability of A or B occurring is P(A) + P(B). For non-mutually exclusive events, subtract the overlap: P(A) + P(B) - P(A ∩ B).",
  },
  {
    term: "Alternative Hypothesis",
    description:
      "The hypothesis (Hₐ or H₁) that contradicts the null hypothesis, representing the effect or difference the researcher aims to detect.",
  },
  {
    term: "Anscombe's Quartet",
    description:
      "Four datasets with nearly identical summary statistics (mean, variance, correlation) but vastly different distributions, demonstrating why visualizing data is essential before relying on statistics alone.",
  },
  {
    term: "Bayesian Inference",
    description:
      "A statistical approach that updates the probability of a hypothesis as new evidence is observed, combining prior beliefs with the likelihood of observed data to produce a posterior distribution.",
  },
  {
    term: "Bessel's Correction",
    description:
      "Dividing by n − 1 instead of n when calculating sample variance or standard deviation to correct the bias that arises from estimating a population parameter from a sample.",
  },
  {
    term: "Binomial Distribution",
    description:
      "A discrete probability distribution that models the number of successes in a fixed number of independent Bernoulli trials, each with the same probability of success p.",
  },
  {
    term: "Boxplot",
    description:
      "A visualization that displays the five-number summary (minimum, Q1, median, Q3, maximum) of a dataset, with whiskers extending to non-outlier extremes and individual points for outliers.",
  },
  {
    term: "CDF",
    description:
      "Cumulative Distribution Function. Returns the probability that a random variable takes a value less than or equal to a given point: F(x) = P(X ≤ x).",
  },
  {
    term: "Central Limit Theorem",
    description:
      "States that the sampling distribution of the sample mean approaches a normal distribution as the sample size increases, regardless of the population's original distribution.",
  },
  {
    term: "Central Tendency",
    description:
      "A measure that identifies a single value as representative of a dataset, typically the mean, median, or mode.",
  },
  {
    term: "Combination",
    description:
      "A selection of items from a set where order does not matter. The number of ways to choose k items from n is C(n, k) = n! / (k!(n − k)!).",
  },
  {
    term: "Complement",
    description:
      "The complement of event A is the set of all outcomes in the sample space that are not in A. P(Aᶜ) = 1 − P(A).",
  },
  {
    term: "Conditional Probability",
    description:
      "The probability of event A occurring given that event B has already occurred, calculated as P(A|B) = P(A ∩ B) / P(B).",
  },
  {
    term: "Confidence Interval",
    description:
      "A range of values, derived from sample data, that is likely to contain the true population parameter at a specified confidence level (e.g., 95%).",
  },
  {
    term: "Confidence Level",
    description:
      "The probability (e.g., 95%) that the confidence interval procedure will capture the true population parameter if the study were repeated many times.",
  },
  {
    term: "Confounding Variable",
    description:
      "An extraneous variable that correlates with both the independent and dependent variables, potentially leading to a spurious association between them.",
  },
  {
    term: "Continuous Data",
    description:
      "Quantitative data that can take any value within a range, including decimals and fractions, such as height, weight, or temperature.",
  },
  {
    term: "Continuous Uniform",
    description:
      "A continuous probability distribution where every value in the interval [a, b] is equally likely, with constant density f(x) = 1 / (b − a).",
  },
  {
    term: "Correlation",
    description:
      "A statistical measure (typically Pearson's r) that quantifies the strength and direction of the linear relationship between two variables, ranging from −1 to +1.",
  },
  {
    term: "CRISP-DM",
    description:
      "Cross-Industry Standard Process for Data Mining. A six-phase methodology: Business Understanding, Data Understanding, Data Preparation, Modeling, Evaluation, and Deployment.",
  },
  {
    term: "Critical Value",
    description:
      "The threshold value on a test statistic's distribution that defines the boundary of the rejection region. If the test statistic exceeds this value, the null hypothesis is rejected.",
  },
  {
    term: "Data Science",
    description:
      "An interdisciplinary field at the intersection of computer science, mathematics/statistics, and domain expertise, focused on extracting knowledge and insights from data.",
  },
  {
    term: "ddof",
    description:
      "Delta Degrees of Freedom. A parameter in NumPy and pandas that controls the divisor (n − ddof) when computing variance or standard deviation. Use ddof=1 for sample statistics (Bessel's correction).",
  },
  {
    term: "Descriptive Statistics",
    description:
      "Methods for summarizing and organizing data using measures of central tendency, variability, and visualizations without making inferences about a larger population.",
  },
  {
    term: "Discrete Data",
    description:
      "Quantitative data that can only take specific, countable values, such as the number of students in a class or the count of defective items.",
  },
  {
    term: "Discrete Uniform",
    description:
      "A discrete probability distribution where each of a finite number of equally spaced values has the same probability, such as rolling a fair die.",
  },
  {
    term: "EDA",
    description:
      "Exploratory Data Analysis. An approach to analyzing datasets by summarizing their main characteristics using statistics and visualizations before formal modeling.",
  },
  {
    term: "Empirical Distribution",
    description:
      "A distribution derived directly from observed data rather than a theoretical model, representing the actual frequencies or proportions of values in a sample.",
  },
  {
    term: "Empirical Probability",
    description:
      "The probability of an event estimated from observed data as the ratio of the number of times the event occurred to the total number of trials.",
  },
  {
    term: "Event",
    description:
      "A specific outcome or set of outcomes from a random experiment; a subset of the sample space.",
  },
  {
    term: "Expectation",
    description:
      "The expected value (mean) of a random variable, calculated as the weighted average of all possible values using their probabilities: E(X) = Σ xᵢP(xᵢ).",
  },
  {
    term: "Experiment",
    description:
      "A data collection method where the researcher manipulates one or more independent variables and observes the effect on a dependent variable while controlling for confounding factors.",
  },
  {
    term: "Exponential Distribution",
    description:
      "A continuous probability distribution that models the time between events in a Poisson process, characterized by a constant rate parameter λ. Memoryless property.",
  },
  {
    term: "Fail to Reject",
    description:
      "The conclusion when the test statistic does not fall in the rejection region, meaning there is insufficient evidence to reject the null hypothesis. This is not the same as accepting it.",
  },
  {
    term: "Frequentist Inference",
    description:
      "A statistical framework where probability is defined as the long-run frequency of events, and parameters are fixed but unknown values estimated from data.",
  },
  {
    term: "Histogram",
    description:
      "A bar chart that displays the frequency distribution of continuous data by dividing it into bins (intervals) and showing the count or density of observations in each bin.",
  },
  {
    term: "Hypothesis Testing",
    description:
      "A formal statistical procedure that uses sample data to evaluate two competing hypotheses (null and alternative) about a population parameter.",
  },
  {
    term: "Imputation",
    description:
      "The process of replacing missing data with substituted values, such as the mean, median, or values predicted by a model, to create a complete dataset for analysis.",
  },
  {
    term: "Independence",
    description:
      "Two events are independent if the occurrence of one does not affect the probability of the other: P(A ∩ B) = P(A) × P(B).",
  },
  {
    term: "Inferential Statistics",
    description:
      "Methods for drawing conclusions about a population based on data from a sample, including hypothesis testing, confidence intervals, and regression analysis.",
  },
  {
    term: "Interquartile Range",
    description:
      "The range between the first quartile (Q1, 25th percentile) and third quartile (Q3, 75th percentile): IQR = Q3 − Q1. A robust measure of spread unaffected by outliers.",
  },
  {
    term: "ISF",
    description:
      "Inverse Survival Function. Returns the value x such that the probability of the random variable exceeding x equals the given probability. ISF(p) = PPF(1 − p).",
  },
  {
    term: "Kolmogorov-Smirnov Test",
    description:
      "A non-parametric test that compares a sample distribution to a reference distribution (or two sample distributions) by measuring the maximum distance between their CDFs.",
  },
  {
    term: "Mann-Whitney U Test",
    description:
      "A non-parametric test that compares two independent samples to determine whether their populations have the same distribution, without assuming normality.",
  },
  {
    term: "MAR",
    description:
      "Missing At Random. A missing data mechanism where the probability of missingness depends on observed data but not on the missing values themselves.",
  },
  {
    term: "Marginal Probability",
    description:
      "The probability of a single event occurring regardless of other variables, obtained by summing or integrating over the other variables in a joint distribution.",
  },
  {
    term: "MCAR",
    description:
      "Missing Completely At Random. A missing data mechanism where the probability of missingness is unrelated to both observed and unobserved data.",
  },
  {
    term: "Mean",
    description:
      "The arithmetic average of a dataset, calculated by summing all values and dividing by the count. Sensitive to outliers.",
  },
  {
    term: "Median",
    description:
      "The middle value of an ordered dataset. If the dataset has an even number of values, it is the average of the two middle values. Robust to outliers.",
  },
  {
    term: "Missing Data",
    description:
      "Data values that are not recorded or available for analysis. Classified by mechanism as MCAR, MAR, or MNAR, each requiring different handling strategies.",
  },
  {
    term: "MNAR",
    description:
      "Missing Not At Random. A missing data mechanism where the probability of missingness depends on the unobserved (missing) values themselves.",
  },
  {
    term: "Mode",
    description:
      "The most frequently occurring value in a dataset. A dataset can be unimodal, bimodal, or multimodal.",
  },
  {
    term: "Monty Hall Problem",
    description:
      "A probability puzzle where switching doors after a non-winning door is revealed gives a 2/3 chance of winning, demonstrating how conditional probability defies intuition.",
  },
  {
    term: "Multiplication Principle",
    description:
      "If one task can be done in m ways and a second independent task in n ways, then the two tasks together can be done in m × n ways.",
  },
  {
    term: "Mutually Exclusive",
    description:
      "Two events that cannot occur simultaneously. If A and B are mutually exclusive, then P(A ∩ B) = 0.",
  },
  {
    term: "Nominal Data",
    description:
      "Categorical data with no inherent order or ranking, such as colors, gender, or country of origin. Only equality comparisons are meaningful.",
  },
  {
    term: "Non-Parametric Test",
    description:
      "A statistical test that makes no assumptions about the underlying population distribution. Used when data violates parametric assumptions such as normality.",
  },
  {
    term: "Normal Distribution",
    description:
      "A symmetric, bell-shaped continuous probability distribution defined by mean μ and standard deviation σ. Approximately 68-95-99.7% of data falls within 1-2-3 standard deviations of the mean.",
  },
  {
    term: "Null Hypothesis",
    description:
      "The default hypothesis (H₀) that assumes no effect, no difference, or no relationship. It is tested against the alternative hypothesis and rejected only when evidence is sufficiently strong.",
  },
  {
    term: "NumPy",
    description:
      "A foundational Python library for numerical computing that provides support for large multi-dimensional arrays, matrices, and a collection of mathematical functions.",
  },
  {
    term: "One-Tailed Test",
    description:
      "A hypothesis test where the rejection region is entirely in one tail of the distribution, used when the alternative hypothesis specifies a direction (greater than or less than).",
  },
  {
    term: "Ordinal Data",
    description:
      "Categorical data with a meaningful order or ranking but no consistent measurable difference between categories, such as education level or satisfaction ratings.",
  },
  {
    term: "Outlier",
    description:
      "A data point that lies significantly outside the overall pattern of a dataset. Often defined as values below Q1 − 1.5×IQR or above Q3 + 1.5×IQR.",
  },
  {
    term: "P-value",
    description:
      "The probability of observing a test statistic as extreme as, or more extreme than, the one calculated from the sample data, assuming the null hypothesis is true.",
  },
  {
    term: "Paired Samples",
    description:
      "Two samples where each observation in one sample is naturally matched or linked to an observation in the other, such as before-and-after measurements on the same subjects.",
  },
  {
    term: "Pandas",
    description:
      "A Python library built on NumPy that provides DataFrame and Series data structures for efficient data manipulation, cleaning, and analysis.",
  },
  {
    term: "Parameter",
    description:
      "A numerical value that describes a characteristic of an entire population, such as the population mean (μ) or population standard deviation (σ).",
  },
  {
    term: "Parametric Test",
    description:
      "A statistical test that assumes the data follows a specific probability distribution (typically normal) and makes inferences about population parameters.",
  },
  {
    term: "Permutation",
    description:
      "An arrangement of items from a set where order matters. The number of ways to arrange k items from n is P(n, k) = n! / (n − k)!.",
  },
  {
    term: "PMF",
    description:
      "Probability Mass Function. Gives the probability that a discrete random variable equals a specific value: P(X = x).",
  },
  {
    term: "Point Estimate",
    description:
      "A single value calculated from sample data that serves as the best estimate of an unknown population parameter, such as the sample mean estimating the population mean.",
  },
  {
    term: "Poisson Distribution",
    description:
      "A discrete probability distribution that models the number of events occurring in a fixed interval of time or space, given a known constant mean rate λ.",
  },
  {
    term: "Pooled Variance",
    description:
      "A weighted average of the variances from two or more groups, used in two-sample t-tests when equal variances are assumed across groups.",
  },
  {
    term: "Population",
    description:
      "The complete set of all individuals, items, or observations of interest in a study from which samples may be drawn.",
  },
  {
    term: "Posterior",
    description:
      "In Bayesian inference, the updated probability distribution of a parameter after incorporating observed data, calculated by combining the prior and the likelihood.",
  },
  {
    term: "Power",
    description:
      "The probability that a hypothesis test correctly rejects a false null hypothesis (1 − β). Higher power means a greater ability to detect a true effect.",
  },
  {
    term: "PPF",
    description:
      "Percent Point Function (inverse CDF). Returns the value x at which the cumulative probability equals a given value p: PPF(p) = x such that P(X ≤ x) = p.",
  },
  {
    term: "Prior",
    description:
      "In Bayesian inference, the probability distribution representing beliefs about a parameter before observing data.",
  },
  {
    term: "Qualitative Data",
    description:
      "Data that describes categories, attributes, or qualities rather than numerical quantities. Includes nominal and ordinal data types.",
  },
  {
    term: "Quantitative Data",
    description:
      "Numerical data that represents measurable quantities and supports arithmetic operations. Includes both discrete and continuous data types.",
  },
  {
    term: "Random Variable",
    description:
      "A variable whose value is determined by the outcome of a random experiment. Can be discrete (countable outcomes) or continuous (any value in an interval).",
  },
  {
    term: "Range",
    description:
      "The simplest measure of spread, calculated as the difference between the maximum and minimum values in a dataset. Highly sensitive to outliers.",
  },
  {
    term: "Sample",
    description:
      "A subset of a population selected for analysis, used to make inferences about the population when studying the entire population is impractical.",
  },
  {
    term: "Sample Space",
    description:
      "The set of all possible outcomes of a random experiment, denoted by S or Ω.",
  },
  {
    term: "Sampling Distribution",
    description:
      "The probability distribution of a statistic (e.g., the sample mean) obtained from all possible samples of a given size drawn from a population.",
  },
  {
    term: "Semi-Structured Data",
    description:
      "Data that does not conform to a rigid tabular schema but contains tags, markers, or keys that provide some organizational structure, such as JSON or XML.",
  },
  {
    term: "SF",
    description:
      "Survival Function. Returns the probability that a random variable exceeds a given value: SF(x) = P(X > x) = 1 − CDF(x).",
  },
  {
    term: "Shapiro-Wilk Test",
    description:
      "A statistical test that assesses whether a sample comes from a normally distributed population. One of the most powerful normality tests for small to moderate sample sizes.",
  },
  {
    term: "Significance Level",
    description:
      "The threshold probability (α, typically 0.05) below which the p-value leads to rejection of the null hypothesis. It represents the maximum acceptable probability of a Type I error.",
  },
  {
    term: "Skewness",
    description:
      "A measure of the asymmetry of a distribution. Positive skew means the right tail is longer; negative skew means the left tail is longer. Zero skew indicates symmetry.",
  },
  {
    term: "Standard Deviation",
    description:
      "The square root of the variance, expressing the average distance of data points from the mean in the same units as the data.",
  },
  {
    term: "Standard Error",
    description:
      "The standard deviation of a sampling distribution, measuring how much a sample statistic (e.g., the sample mean) is expected to vary from sample to sample. SE = σ / √n.",
  },
  {
    term: "Standard Normal",
    description:
      "A special case of the normal distribution with mean μ = 0 and standard deviation σ = 1. Any normal distribution can be converted to it using the z-score formula: z = (x − μ) / σ.",
  },
  {
    term: "Statistic",
    description:
      "A numerical value calculated from sample data that estimates a population parameter, such as the sample mean (x̄) or sample standard deviation (s).",
  },
  {
    term: "Structured Data",
    description:
      "Data organized in a predefined format with rows and columns, such as relational databases or spreadsheets, where each field has a defined data type.",
  },
  {
    term: "Student's t-Distribution",
    description:
      "A probability distribution similar to the normal distribution but with heavier tails, used for inference about the mean when the sample size is small or the population standard deviation is unknown.",
  },
  {
    term: "Survey",
    description:
      "A data collection method that gathers information from respondents through questionnaires or interviews, used when direct observation or experimentation is impractical.",
  },
  {
    term: "Test Statistic",
    description:
      "A standardized value computed from sample data during a hypothesis test, used to decide whether to reject the null hypothesis by comparing it to a known distribution.",
  },
  {
    term: "Two-Tailed Test",
    description:
      "A hypothesis test where the rejection region is split between both tails of the distribution, used when the alternative hypothesis does not specify a direction (≠).",
  },
  {
    term: "Type I Error",
    description:
      "Rejecting the null hypothesis when it is actually true (false positive). The probability of a Type I error is equal to the significance level α.",
  },
  {
    term: "Type II Error",
    description:
      "Failing to reject the null hypothesis when it is actually false (false negative). The probability of a Type II error is denoted β, and power equals 1 − β.",
  },
  {
    term: "Unstructured Data",
    description:
      "Data with no predefined format or organization, such as free text, images, audio, and video, requiring specialized processing techniques to analyze.",
  },
  {
    term: "Valence",
    description:
      "In discrete probability, the number of possible outcomes or values that a random variable can take.",
  },
  {
    term: "Variance",
    description:
      "A measure of dispersion that quantifies the average squared deviation of each data point from the mean. Population variance divides by n; sample variance uses n − 1 (Bessel's correction).",
  },
  {
    term: "Welch's t-test",
    description:
      "A variant of the two-sample t-test that does not assume equal variances between groups, using adjusted degrees of freedom via the Welch-Satterthwaite equation.",
  },
  {
    term: "Wilcoxon Signed-Rank Test",
    description:
      "A non-parametric test for comparing two related (paired) samples by ranking the absolute differences between pairs and testing whether the median difference is zero.",
  },
  {
    term: "Z-Distribution",
    description:
      "Another name for the standard normal distribution (μ = 0, σ = 1), commonly used in hypothesis testing and confidence intervals when the population standard deviation is known and sample size is large.",
  },
]
