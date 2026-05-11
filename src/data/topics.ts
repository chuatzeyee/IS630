export interface Topic {
  readonly title: string
  readonly summary?: string
  readonly points: readonly string[]
  readonly tip?: string
  readonly important?: string
  readonly relatedTerms?: readonly string[]
}

export interface Session {
  readonly id: number
  readonly title: string
  readonly topics: readonly Topic[]
}

export const sessions: readonly Session[] = [
  {
    id: 1,
    title: "Foundations of Statistical Thinking",
    topics: [
      {
        title: "What is Data Science?",
        summary:
          "Data Science sits at the intersection of three fields: Computer Science (hacking skills), Mathematics/Statistics (math & stats knowledge), and Domain Expertise (substantive expertise). All three must overlap to be effective.",
        points: [
          "Computer Science provides the tools (programming, databases, algorithms) to work with data at scale",
          "Mathematics & Statistics provides the theory (probability, inference, modeling) to extract meaning from data",
          "Domain Expertise provides the context to ask the right questions and interpret results correctly",
          "The intersection of CS + Stats without domain expertise produces 'machine learning' that may lack practical relevance",
          "The intersection of CS + Domain without stats produces 'danger zone' — pattern-finding without rigor",
          "The intersection of Stats + Domain without CS limits scalability — traditional research methods only",
          "True Data Science requires all three fields working together"
        ],
        tip: "The Venn diagram of the 3 fields is a classic exam question. Know what each pairwise intersection represents and why all three are needed.",
        relatedTerms: ["CRISP-DM", "EDA", "Machine Learning"]
      },
      {
        title: "Types of Data",
        summary:
          "Data is classified by structure (structured, semi-structured, unstructured) and by measurement level (qualitative nominal/ordinal, quantitative discrete/continuous). Knowing the type determines which statistical methods are valid.",
        points: [
          "Structured data: organized in rows and columns (e.g., relational databases, spreadsheets)",
          "Semi-structured data: has some organization but not rigid schema (e.g., JSON, XML, email)",
          "Unstructured data: no predefined format (e.g., images, audio, free text) — ~80% of real-world data",
          "Qualitative Nominal: categories with no inherent order (e.g., color, gender, country)",
          "Qualitative Ordinal: categories with a meaningful order but unequal intervals (e.g., education level, satisfaction rating)",
          "Quantitative Discrete: countable numeric values with gaps (e.g., number of children, defects per batch)",
          "Quantitative Continuous: measurable numeric values on a continuous scale (e.g., weight, temperature, time)"
        ],
        tip: "Ask yourself: 'Can I compute a meaningful mean?' If yes, it is quantitative. If no, it is qualitative. Ordinal data has order but the intervals are NOT guaranteed equal, so the mean may be misleading.",
        important:
          "Never treat nominal data as numeric for statistical operations. Encoding 'Red=1, Blue=2, Green=3' does NOT make color ordinal or continuous.",
        relatedTerms: [
          "Nominal",
          "Ordinal",
          "Discrete",
          "Continuous",
          "Structured Data"
        ]
      },
      {
        title: "Data Collection Methods",
        summary:
          "Data can be gathered through experiments (controlled manipulation of variables), observational studies (no intervention), surveys/questionnaires, or from existing sources. The collection method affects what conclusions you can draw.",
        points: [
          "Experimental: researcher manipulates independent variable and measures effect on dependent variable (supports causal claims)",
          "Observational: researcher observes without intervention (correlation only, not causation)",
          "Survey/Questionnaire: self-reported data, subject to response bias and sampling bias",
          "Existing/Secondary data: data collected by others for a different purpose (census, logs, public datasets)",
          "Random sampling is essential to avoid selection bias and ensure generalizability",
          "Population: the entire group of interest; Sample: a subset drawn from the population",
          "A parameter describes a population; a statistic describes a sample"
        ],
        tip: "Exam questions often test whether you can distinguish parameters (population, Greek letters like mu, sigma) from statistics (sample, Roman letters like x-bar, s).",
        relatedTerms: [
          "Population",
          "Sample",
          "Parameter",
          "Statistic",
          "Sampling Bias"
        ]
      },
      {
        title: "The Statistical Mindset — 5 Pillars",
        summary:
          "Statistical thinking rests on five pillars that guide how we approach data problems: data awareness, skepticism, probabilistic thinking, understanding variability, and evidence-based decision making.",
        points: [
          "Pillar 1 — Data Awareness: understand what data you have, its quality, limitations, and context before analysis",
          "Pillar 2 — Skepticism: question data sources, methods, assumptions, and conclusions; avoid confirmation bias",
          "Pillar 3 — Probabilistic Thinking: embrace uncertainty; most real-world outcomes are probabilistic, not deterministic",
          "Pillar 4 — Understanding Variability: variation is natural and expected; the goal is to distinguish signal from noise",
          "Pillar 5 — Evidence-Based Decision Making: let data guide decisions, but always consider practical significance alongside statistical significance"
        ],
        tip: "The 5 pillars frame the entire course. When in doubt on an exam question, think about which pillar applies — it often points you toward the right answer.",
        relatedTerms: [
          "Variability",
          "Uncertainty",
          "Significance",
          "Bias"
        ]
      },
      {
        title: "Frequentist vs Bayesian Approaches",
        summary:
          "Two dominant philosophies of probability and inference. Frequentist treats probability as long-run frequency of events; Bayesian treats probability as a degree of belief that can be updated with data.",
        points: [
          "Frequentist: probability is the limit of relative frequency over infinite trials (objective)",
          "Bayesian: probability is a measure of belief/confidence, updated via Bayes' theorem as new evidence arrives (subjective prior + data = posterior)",
          "Frequentist inference: uses p-values, confidence intervals, and hypothesis tests",
          "Bayesian inference: uses prior distributions, likelihood, and posterior distributions",
          "Frequentist approach dominates this course (IS630) — confidence intervals and hypothesis testing are frequentist tools",
          "Bayesian approach shines when prior knowledge is available or sample sizes are small",
          "Key difference: frequentists say 'the parameter is fixed, the data varies'; Bayesians say 'the data is fixed, the parameter has a distribution'"
        ],
        tip: "This course primarily uses the frequentist framework. Know the conceptual difference, but focus on frequentist methods for exams.",
        relatedTerms: [
          "P-value",
          "Confidence Interval",
          "Prior",
          "Posterior",
          "Bayes Theorem"
        ]
      },
      {
        title: "CRISP-DM Framework",
        summary:
          "Cross-Industry Standard Process for Data Mining. A 6-phase iterative methodology for data science projects that provides structure from business understanding through deployment.",
        points: [
          "Phase 1 — Business Understanding: define objectives, success criteria, and project requirements",
          "Phase 2 — Data Understanding: collect initial data, explore it (EDA), assess quality, discover initial insights",
          "Phase 3 — Data Preparation: clean, transform, and engineer features; handle missing values; 60-80% of project time is spent here",
          "Phase 4 — Modeling: select and apply modeling techniques, tune parameters, evaluate models",
          "Phase 5 — Evaluation: assess model against business objectives (not just statistical metrics), decide if model is deployable",
          "Phase 6 — Deployment: put the model into production, monitor, maintain, and iterate",
          "The process is iterative — you frequently loop back to earlier phases as you learn more",
          "Data Preparation typically consumes the most time in any data science project"
        ],
        tip: "Remember the order: Business → Data Understanding → Data Prep → Modeling → Evaluation → Deployment. Data Prep is the most time-consuming phase — this is a favorite exam fact.",
        relatedTerms: ["EDA", "Data Cleaning", "Feature Engineering", "ETL"]
      },
      {
        title: "NumPy and Pandas Basics",
        summary:
          "NumPy provides the ndarray for efficient numerical computation; Pandas provides DataFrame and Series for labeled, tabular data manipulation. Both are foundational Python libraries for data science.",
        points: [
          "NumPy ndarray: homogeneous, fixed-size, n-dimensional array; much faster than Python lists for numerical operations",
          "Key NumPy functions: np.mean(), np.std(ddof=), np.var(ddof=), np.median(), np.percentile()",
          "Pandas Series: 1D labeled array; Pandas DataFrame: 2D labeled table (like a spreadsheet or SQL table)",
          "df.loc[row_label, col_label]: label-based indexing (inclusive of endpoint)",
          "df.iloc[row_index, col_index]: integer position-based indexing (exclusive of endpoint, like standard Python slicing)",
          "ddof parameter: degrees of freedom correction. Use ddof=1 for sample statistics (default in Pandas), ddof=0 for population statistics (default in NumPy)",
          "Common Pandas methods: .describe(), .info(), .value_counts(), .groupby(), .fillna(), .dropna(), .apply()",
          "Pandas uses NaN (Not a Number) to represent missing values; use .isna() or .isnull() to detect them"
        ],
        tip: "The ddof difference between NumPy (default ddof=0, population) and Pandas (default ddof=1, sample) is an exam trap. Always specify ddof explicitly to be safe.",
        important:
          "loc is label-based and INCLUSIVE of the endpoint. iloc is position-based and EXCLUSIVE of the endpoint. Mixing them up is a common source of off-by-one errors.",
        relatedTerms: [
          "ndarray",
          "DataFrame",
          "Series",
          "ddof",
          "Bessel's Correction"
        ]
      }
    ]
  },
  {
    id: 2,
    title: "Descriptive Statistics & EDA",
    topics: [
      {
        title: "EDA Process — 4 Steps",
        summary:
          "Exploratory Data Analysis is a systematic approach to understanding your data before formal modeling. It follows four steps: examine structure, compute summaries, visualize distributions, and investigate relationships.",
        points: [
          "Step 1 — Examine Structure: check shape, data types, column names, and first/last rows (.shape, .dtypes, .info(), .head(), .tail())",
          "Step 2 — Compute Summary Statistics: use .describe() to get count, mean, std, min, 25%, 50%, 75%, max for numeric columns",
          "Step 3 — Visualize Distributions: use histograms for shape, boxplots for spread/outliers, bar charts for categorical counts",
          "Step 4 — Investigate Relationships: use scatter plots for two continuous variables, heatmaps for correlation matrices, groupby for categorical comparisons",
          "EDA is iterative — findings in later steps may send you back to earlier steps",
          "Always check for missing values early: .isna().sum() gives count of NaN per column"
        ],
        tip: "EDA is the foundation for all later analysis. Skipping it leads to garbage-in-garbage-out. On exams, be ready to describe the 4-step process and name appropriate visualizations for each step.",
        relatedTerms: [
          "Descriptive Statistics",
          "Histogram",
          "Boxplot",
          "Scatter Plot",
          "Heatmap"
        ]
      },
      {
        title: "Descriptive vs Inferential Statistics",
        summary:
          "Descriptive statistics summarize and describe the data you have. Inferential statistics use sample data to make generalizations about a larger population. This course covers both, building from descriptive to inferential.",
        points: [
          "Descriptive: summarize data using measures of center (mean, median, mode) and spread (range, IQR, variance, std dev)",
          "Descriptive: also includes visualization (charts, graphs, tables) to reveal patterns",
          "Inferential: uses sample data to estimate population parameters (confidence intervals) or test hypotheses (hypothesis tests)",
          "Inferential: requires assumptions about the data (e.g., normality, independence, random sampling)",
          "Descriptive answers 'What does my data look like?' — Inferential answers 'What can I conclude about the population?'",
          "Sessions 1-2 focus on descriptive; Sessions 4-5 focus on inferential; Session 3 (probability) bridges them"
        ],
        tip: "If a question asks you to 'describe' or 'summarize' data, use descriptive statistics. If it asks you to 'conclude', 'generalize', or 'test', use inferential statistics.",
        relatedTerms: [
          "Mean",
          "Standard Deviation",
          "Confidence Interval",
          "Hypothesis Test",
          "Population",
          "Sample"
        ]
      },
      {
        title: "Measures of Central Tendency",
        summary:
          "Central tendency describes the 'center' of a dataset. The three main measures are mean (arithmetic average), median (middle value), and mode (most frequent value). Each has different strengths and sensitivities.",
        points: [
          "Mean (x-bar): sum of all values divided by the count; sensitive to outliers and skewness",
          "Median: the middle value when data is sorted; robust to outliers, preferred for skewed data",
          "Mode: the most frequently occurring value; the only measure valid for nominal data",
          "For symmetric distributions: mean ≈ median ≈ mode",
          "For right-skewed distributions: mean > median > mode (mean is pulled toward the long right tail)",
          "For left-skewed distributions: mean < median < mode (mean is pulled toward the long left tail)",
          "Python: np.mean(x), np.median(x), scipy.stats.mode(x); Pandas: df['col'].mean(), .median(), .mode()"
        ],
        tip: "Outliers pull the mean toward them. If you see outliers or skewness, report the median as the better measure of center. Exam questions love testing mean vs median for skewed data.",
        important:
          "The relationship mean > median > mode for right-skewed data is an approximation for unimodal distributions. It is not a universal law.",
        relatedTerms: ["Mean", "Median", "Mode", "Skewness", "Outlier"]
      },
      {
        title: "Measures of Variation",
        summary:
          "Variation (spread/dispersion) measures how far data values are from the center. Key measures include range, interquartile range (IQR), variance, and standard deviation. Understanding spread is critical — the mean alone never tells the whole story.",
        points: [
          "Range = max - min; simplest measure but extremely sensitive to outliers",
          "IQR = Q3 - Q1 (75th percentile minus 25th percentile); captures the middle 50% of data, robust to outliers",
          "Variance (s²): average of squared deviations from the mean; uses (n-1) for sample, (n) for population",
          "Standard Deviation (s): square root of variance; in the same units as the original data, making it more interpretable",
          "Coefficient of Variation (CV) = (s / x-bar) × 100%: allows comparison of variability across datasets with different units or scales",
          "Low variation → data points clustered near the center; High variation → data points spread widely",
          "Python: np.var(x, ddof=1), np.std(x, ddof=1), scipy.stats.iqr(x); Pandas: df['col'].var(), .std()"
        ],
        tip: "Always report a measure of spread alongside a measure of center. A mean of 50 tells you very different things if the standard deviation is 2 vs 20.",
        relatedTerms: [
          "Range",
          "IQR",
          "Variance",
          "Standard Deviation",
          "Coefficient of Variation"
        ]
      },
      {
        title: "Bessel's Correction (n-1 vs n)",
        summary:
          "When computing sample variance and standard deviation, we divide by (n-1) instead of (n). This is Bessel's correction. It corrects for the fact that a sample underestimates population variance because sample values tend to be closer to the sample mean than to the population mean.",
        points: [
          "Population variance σ² = Σ(xi - μ)² / N — divide by N (the entire population size)",
          "Sample variance s² = Σ(xi - x̄)² / (n-1) — divide by (n-1) where n is sample size",
          "Why (n-1)? The sample mean x̄ is estimated from the data, consuming 1 degree of freedom",
          "Without correction, sample variance is a biased estimator (systematically underestimates σ²)",
          "With (n-1), sample variance becomes an unbiased estimator of population variance",
          "Degrees of freedom (df) = n-1 for a single sample; represents the number of values free to vary",
          "In Python: use ddof=1 for sample (Pandas default), ddof=0 for population (NumPy default)"
        ],
        tip: "If a problem says 'sample', use n-1 (ddof=1). If it says 'population', use n (ddof=0). This distinction appears in nearly every computational question.",
        important:
          "NumPy defaults to ddof=0 (population). Pandas defaults to ddof=1 (sample). Always specify ddof explicitly to avoid subtle bugs.",
        relatedTerms: [
          "Degrees of Freedom",
          "Bias",
          "Sample Variance",
          "Population Variance",
          "ddof"
        ]
      },
      {
        title: "Skewness",
        summary:
          "Skewness measures the asymmetry of a distribution. A symmetric distribution has skewness near 0. Right (positive) skew has a long tail to the right; left (negative) skew has a long tail to the left. Bulmer's rule of thumb classifies severity.",
        points: [
          "Skewness = 0: perfectly symmetric (e.g., normal distribution)",
          "Positive skewness (right-skewed): long tail to the right, bulk of data on the left (e.g., income, house prices)",
          "Negative skewness (left-skewed): long tail to the left, bulk of data on the right (e.g., exam scores in an easy test)",
          "Bulmer's Rule of Thumb: |skew| < 0.5 → approximately symmetric; 0.5 ≤ |skew| < 1.0 → moderately skewed; |skew| ≥ 1.0 → highly skewed",
          "Right-skewed: mean > median (mean pulled toward right tail)",
          "Left-skewed: mean < median (mean pulled toward left tail)",
          "Python: scipy.stats.skew(x) or df['col'].skew()",
          "Skewness affects which measures of center and spread to report (median + IQR for skewed; mean + std for symmetric)"
        ],
        tip: "Memorize Bulmer's thresholds: <0.5 symmetric, 0.5-1.0 moderate, ≥1.0 highly skewed. These specific cutoffs are frequently tested.",
        relatedTerms: [
          "Symmetric",
          "Right-Skewed",
          "Left-Skewed",
          "Mean",
          "Median",
          "Bulmer"
        ]
      },
      {
        title: "Anscombe's Quartet",
        summary:
          "Four datasets that have nearly identical summary statistics (mean, variance, correlation, regression line) but look completely different when graphed. This powerfully demonstrates why visualization is essential — summary statistics alone can be misleading.",
        points: [
          "All four datasets have the same mean of x (~9), mean of y (~7.5), variance of x (~11), variance of y (~4.12)",
          "All four have the same correlation coefficient (~0.816) and the same linear regression line (y ≈ 3 + 0.5x)",
          "Dataset 1: normal linear relationship (the 'expected' pattern)",
          "Dataset 2: perfect quadratic/curvilinear relationship (linear model is wrong, but stats don't show it)",
          "Dataset 3: perfect linear relationship with one influential outlier that shifts the regression line",
          "Dataset 4: all points at the same x except one outlier that creates the illusion of a relationship",
          "Lesson: ALWAYS visualize your data. Never rely on summary statistics alone"
        ],
        tip: "Anscombe's Quartet is the textbook argument for EDA and visualization. If asked 'why is visualization important?', this is the gold-standard example.",
        relatedTerms: [
          "EDA",
          "Correlation",
          "Outlier",
          "Visualization",
          "Summary Statistics"
        ]
      },
      {
        title: "Boxplot Anatomy",
        summary:
          "A boxplot (box-and-whisker plot) provides a visual five-number summary of a distribution: minimum, Q1, median, Q3, maximum. It also flags outliers using the IQR fence rule. Boxplots are excellent for comparing distributions across groups.",
        points: [
          "The box spans from Q1 (25th percentile) to Q3 (75th percentile), containing the middle 50% of data",
          "The line inside the box represents the median (Q2, 50th percentile)",
          "IQR = Q3 - Q1 (the width/height of the box)",
          "Lower fence = Q1 - 1.5 × IQR; Upper fence = Q3 + 1.5 × IQR",
          "Whiskers extend from the box to the most extreme data points within the fences (NOT to the fences themselves)",
          "Points beyond the fences are plotted individually as outliers (dots or diamonds)",
          "A narrow box indicates low variability; a wide box indicates high variability",
          "Comparing boxplots side-by-side reveals differences in center, spread, and skewness across groups"
        ],
        tip: "The whiskers go to the last data point within the fence, NOT to the fence value itself. This subtle distinction is a common exam mistake. Also remember: 1.5×IQR is the standard outlier rule.",
        important:
          "Whiskers extend to actual data points within the fences, not to the calculated fence values. The fence is a threshold; the whisker endpoint is a data point.",
        relatedTerms: [
          "Q1",
          "Q3",
          "Median",
          "IQR",
          "Outlier",
          "Five-Number Summary"
        ]
      },
      {
        title: "Missing Data: MCAR, MAR, MNAR",
        summary:
          "Missing data mechanisms determine how missingness relates to the data. The mechanism matters because it dictates which imputation or handling strategies are valid. There are three types: MCAR, MAR, and MNAR.",
        points: [
          "MCAR (Missing Completely At Random): missingness is unrelated to any variable, observed or unobserved. Like data randomly deleted. Safe to drop rows if enough data remains.",
          "MAR (Missing At Random): missingness depends on observed variables but NOT on the missing value itself. E.g., younger people skip income questions — missingness depends on age (observed) not income (missing).",
          "MNAR (Missing Not At Random): missingness depends on the unobserved value itself. E.g., people with very high income are less likely to report income. Most problematic — no simple fix.",
          "MCAR handling: listwise deletion (drop rows) or any imputation method",
          "MAR handling: imputation using observed variables (e.g., predict income from age, education)",
          "MNAR handling: requires domain knowledge, sensitivity analysis, or specialized models",
          "Common imputation: mean/median imputation (simple but distorts variance), regression imputation, KNN imputation, multiple imputation",
          "Python: df.dropna() to remove, df.fillna(value) to impute with a constant"
        ],
        tip: "MCAR is the 'best case' for missing data — analysis is valid but less powerful. MAR is manageable with proper imputation. MNAR is the 'worst case' — no statistical fix, need domain insight.",
        relatedTerms: [
          "Imputation",
          "NaN",
          "dropna",
          "fillna",
          "Listwise Deletion"
        ]
      },
      {
        title: "Data Visualization",
        summary:
          "Choosing the right visualization depends on your data types and the question you are asking. Different chart types reveal different aspects of the data: distribution, relationship, composition, or comparison.",
        points: [
          "Histogram: shows distribution of a single continuous variable; reveals shape (skewness, modality), center, and spread",
          "Boxplot: shows five-number summary and outliers; best for comparing distributions across groups",
          "Scatter plot: shows relationship between two continuous variables; reveals correlation, clusters, and outliers",
          "Heatmap: shows correlation matrix as a colored grid; reveals strength and direction of pairwise relationships",
          "Bar chart: shows counts or values for categorical variables; use for nominal or ordinal data",
          "Use matplotlib (plt.hist, plt.boxplot, plt.scatter) and seaborn (sns.histplot, sns.boxplot, sns.scatterplot, sns.heatmap) in Python",
          "Seaborn is built on matplotlib and provides more attractive defaults and easier syntax for statistical plots",
          "Always label axes, include titles, and use appropriate scales to avoid misleading visualizations"
        ],
        tip: "Match the chart to the question: distribution → histogram/boxplot, relationship → scatter/heatmap, comparison → boxplot/bar, composition → pie/stacked bar. This mapping is commonly tested.",
        relatedTerms: [
          "Histogram",
          "Boxplot",
          "Scatter Plot",
          "Heatmap",
          "Matplotlib",
          "Seaborn"
        ]
      }
    ]
  },
  {
    id: 3,
    title: "Probability & Univariate Distributions",
    topics: [
      {
        title: "Random Experiments & Sample Space",
        summary:
          "A random experiment is a process whose outcome is uncertain. The sample space (S or Omega) is the set of all possible outcomes. An event is a subset of the sample space. These are the building blocks of probability theory.",
        points: [
          "Random experiment: an action or process that leads to one of several possible outcomes (e.g., rolling a die, flipping a coin)",
          "Sample space (S): the complete set of all possible outcomes (e.g., S = {1,2,3,4,5,6} for a die roll)",
          "Event: a subset of the sample space (e.g., A = 'rolling an even number' = {2,4,6})",
          "Simple event: an event with exactly one outcome; Compound event: an event with multiple outcomes",
          "Mutually exclusive events: cannot occur simultaneously (e.g., rolling a 3 and rolling a 5 on one die)",
          "Exhaustive events: together they cover the entire sample space",
          "Complement of event A (A'): all outcomes in S that are NOT in A; P(A') = 1 - P(A)"
        ],
        tip: "Always define the sample space before calculating probabilities. Many probability errors come from an incorrectly defined sample space.",
        relatedTerms: [
          "Sample Space",
          "Event",
          "Mutually Exclusive",
          "Complement",
          "Outcome"
        ]
      },
      {
        title: "Counting Methods",
        summary:
          "Counting methods determine the number of ways an event can occur, which is essential for computing classical probabilities. The four main methods are multiplication rule, addition rule, permutations (order matters), and combinations (order does not matter).",
        points: [
          "Multiplication Rule: if task A has m outcomes and task B has n outcomes, then A followed by B has m × n outcomes",
          "Addition Rule: if events A and B are mutually exclusive, the number of outcomes for A or B is m + n",
          "Permutation: ordered arrangement of r items from n total; P(n,r) = n! / (n-r)!",
          "Combination: unordered selection of r items from n total; C(n,r) = n! / [r! × (n-r)!]",
          "Key question: 'Does order matter?' Yes → permutation; No → combination",
          "Python: math.factorial(n), math.perm(n,r), math.comb(n,r), or scipy.special.comb/perm",
          "Example: choosing a president, VP, treasurer from 10 people → P(10,3) = 720 (order matters)",
          "Example: choosing a committee of 3 from 10 people → C(10,3) = 120 (order does not matter)"
        ],
        tip: "The order question is the single most important decision in counting problems. Ask: 'If I rearrange the selected items, do I get a different outcome?' If yes → permutation. If no → combination.",
        relatedTerms: [
          "Permutation",
          "Combination",
          "Factorial",
          "Multiplication Rule"
        ]
      },
      {
        title: "Three Approaches to Probability",
        summary:
          "Probability can be defined three ways: classical (equally likely outcomes), relative frequency (long-run proportion), and subjective (personal belief). Each approach has different use cases and assumptions.",
        points: [
          "Classical (theoretical): P(A) = number of favorable outcomes / total number of equally likely outcomes. Requires equally likely assumption (e.g., fair die, fair coin)",
          "Relative Frequency (empirical): P(A) = number of times A occurs / total number of trials. Based on observed data; requires many repetitions",
          "Subjective: P(A) is assigned based on personal belief, judgment, or expertise. Used when experiments cannot be repeated (e.g., 'probability this startup succeeds')",
          "All approaches must satisfy: 0 ≤ P(A) ≤ 1 for any event A",
          "P(S) = 1 (something must happen); P(∅) = 0 (impossible event)",
          "Classical approach is exact but limited to equally likely scenarios",
          "Relative frequency converges to the true probability as the number of trials increases (Law of Large Numbers)"
        ],
        tip: "Know which approach to use: fair games/dice → classical; historical data → relative frequency; expert opinion → subjective.",
        relatedTerms: [
          "Classical Probability",
          "Empirical Probability",
          "Subjective Probability",
          "Law of Large Numbers"
        ]
      },
      {
        title: "Rules of Probability",
        summary:
          "Eleven fundamental rules govern how probabilities combine and relate to each other. Mastering these rules is essential for computing probabilities of compound events.",
        points: [
          "Rule 1 (Range): 0 ≤ P(A) ≤ 1",
          "Rule 2 (Sum): P(S) = 1, where S is the sample space",
          "Rule 3 (Complement): P(A') = 1 - P(A)",
          "Rule 4 (Addition/OR): P(A ∪ B) = P(A) + P(B) - P(A ∩ B)",
          "Rule 5 (Mutually Exclusive Addition): If A and B are mutually exclusive, P(A ∪ B) = P(A) + P(B)",
          "Rule 6 (Conditional): P(A|B) = P(A ∩ B) / P(B), provided P(B) > 0",
          "Rule 7 (Multiplication/AND): P(A ∩ B) = P(A|B) × P(B) = P(B|A) × P(A)",
          "Rule 8 (Independence Multiplication): If A and B are independent, P(A ∩ B) = P(A) × P(B)",
          "Rule 9 (Independence Test): A and B are independent if and only if P(A|B) = P(A)",
          "Rule 10 (Marginal via Total Probability): P(A) = P(A|B)P(B) + P(A|B')P(B')",
          "Rule 11 (Bayes' Theorem): P(B|A) = P(A|B)P(B) / P(A)"
        ],
        tip: "The addition rule (Rule 4) requires subtracting the intersection to avoid double-counting. Forgetting to subtract P(A ∩ B) is the most common probability mistake.",
        important:
          "Independent ≠ Mutually Exclusive. Independent events CAN occur together (P(A∩B) = P(A)P(B) > 0). Mutually exclusive events CANNOT occur together (P(A∩B) = 0). If events are mutually exclusive with nonzero probabilities, they are NOT independent.",
        relatedTerms: [
          "Conditional Probability",
          "Independence",
          "Bayes Theorem",
          "Marginal Probability",
          "Joint Probability"
        ]
      },
      {
        title: "Random Variables: Discrete vs Continuous",
        summary:
          "A random variable (RV) maps each outcome of a random experiment to a number. Discrete RVs have countable values described by a PMF. Continuous RVs have uncountable values described by a PDF.",
        points: [
          "Discrete RV: takes countable values (finite or countably infinite); described by a Probability Mass Function (PMF)",
          "Continuous RV: takes any value in an interval; described by a Probability Density Function (PDF)",
          "PMF: P(X = x) gives the probability of each specific value; all PMF values must sum to 1",
          "PDF: f(x) gives probability density (NOT probability); P(a ≤ X ≤ b) = integral of f(x) from a to b",
          "CDF (Cumulative Distribution Function): F(x) = P(X ≤ x); works for both discrete and continuous RVs",
          "For continuous RVs: P(X = exact value) = 0; probability is only meaningful over intervals",
          "Expected value E(X): the mean/average of the RV; E(X) = Σ x·P(x) for discrete, ∫ x·f(x)dx for continuous",
          "Variance Var(X) = E(X²) - [E(X)]²"
        ],
        tip: "For continuous distributions, P(X = 5) = 0 always. You must ask for P(X ≤ 5) or P(4 < X < 6). This distinction trips up many students on exams.",
        important:
          "A PDF value can exceed 1 — it is a density, not a probability. Only probabilities (areas under the curve) must be between 0 and 1.",
        relatedTerms: ["PMF", "PDF", "CDF", "Expected Value", "Variance"]
      },
      {
        title: "Discrete Uniform Distribution",
        summary:
          "The simplest discrete distribution where every outcome is equally likely. Think of a fair die or selecting a random card. Each of the n possible values has probability 1/n.",
        points: [
          "Parameters: a (lower bound) and b (upper bound) — all integers from a to b are equally likely",
          "PMF: P(X = x) = 1/(b - a + 1) for x = a, a+1, ..., b",
          "Mean: E(X) = (a + b) / 2",
          "Variance: Var(X) = [(b - a + 1)² - 1] / 12",
          "Example: fair 6-sided die has a=1, b=6; P(X=x) = 1/6 for each face",
          "Python: scipy.stats.randint(low=a, high=b+1) — note: high is EXCLUSIVE in scipy"
        ],
        tip: "In scipy.stats.randint, the high parameter is exclusive (like Python's range). So for a fair die, use randint(1, 7) not randint(1, 6).",
        relatedTerms: [
          "Uniform",
          "PMF",
          "Equally Likely",
          "Fair Die"
        ]
      },
      {
        title: "Binomial Distribution",
        summary:
          "Models the number of successes in n independent, identical trials, each with success probability p. Used whenever you have a fixed number of yes/no trials (e.g., defective/not defective, pass/fail).",
        points: [
          "Parameters: n (number of trials) and p (probability of success on each trial)",
          "PMF: P(X = k) = C(n,k) × p^k × (1-p)^(n-k)",
          "Mean: E(X) = n × p",
          "Variance: Var(X) = n × p × (1-p)",
          "Assumptions: (1) fixed number of trials n, (2) each trial is independent, (3) each trial has only two outcomes, (4) probability p is constant across trials",
          "X ~ Binomial(n, p) — X counts the number of successes out of n trials",
          "Python: scipy.stats.binom(n=n, p=p); use .pmf(k), .cdf(k), .sf(k), .ppf(q)",
          "When n is large and p is small, binomial can be approximated by Poisson with λ = n × p"
        ],
        tip: "For 'at least k' problems: P(X ≥ k) = 1 - P(X ≤ k-1) = 1 - binom.cdf(k-1, n, p). Alternatively, use binom.sf(k-1, n, p). The survival function sf(k) = P(X > k), so sf(k-1) = P(X ≥ k).",
        important:
          "Check all four assumptions before using the binomial distribution. If trials are not independent or p changes between trials, binomial is not appropriate.",
        relatedTerms: [
          "Bernoulli",
          "Trials",
          "Success Probability",
          "PMF",
          "Poisson"
        ]
      },
      {
        title: "Poisson Distribution",
        summary:
          "Models the number of events occurring in a fixed interval of time or space, given a known average rate. Used for rare events, arrivals, defects, or counts per unit (e.g., calls per hour, typos per page).",
        points: [
          "Parameter: λ (lambda) = average rate of events per interval",
          "PMF: P(X = k) = (e^(-λ) × λ^k) / k!",
          "Mean: E(X) = λ; Variance: Var(X) = λ (mean equals variance — a key property)",
          "Assumptions: (1) events occur independently, (2) average rate is constant, (3) two events cannot occur at exactly the same instant",
          "Rate conversion is critical: if λ = 5 per hour and you want per 30 minutes, use λ = 2.5",
          "X ~ Poisson(λ) — X counts events in one interval",
          "Python: scipy.stats.poisson(mu=lambda_value); use .pmf(k), .cdf(k), .sf(k)",
          "When λ is large (≥ 30), Poisson is well-approximated by Normal(μ=λ, σ=√λ)"
        ],
        tip: "Rate conversion is the #1 source of Poisson errors on exams. Always check that λ matches the interval in the question. If given 'per hour' but asked about 'per 15 minutes', divide λ by 4.",
        important:
          "The Poisson parameter λ must match the interval you are asked about. Always convert the rate before computing probabilities. E.g., λ=12/hour → λ=3/15min → λ=1/5min.",
        relatedTerms: [
          "Rate",
          "Lambda",
          "Rare Events",
          "PMF",
          "Exponential"
        ]
      },
      {
        title: "Continuous Uniform Distribution",
        summary:
          "The continuous analog of the discrete uniform: every value in the interval [a, b] is equally likely. The PDF is flat (constant) between a and b and zero outside. Often used as a 'non-informative' distribution.",
        points: [
          "Parameters: a (lower bound) and b (upper bound)",
          "PDF: f(x) = 1/(b-a) for a ≤ x ≤ b, and 0 otherwise",
          "CDF: F(x) = (x-a)/(b-a) for a ≤ x ≤ b",
          "Mean: E(X) = (a+b)/2",
          "Variance: Var(X) = (b-a)²/12",
          "P(c ≤ X ≤ d) = (d-c)/(b-a) — probability is proportional to interval width",
          "Python: scipy.stats.uniform(loc=a, scale=b-a) — note: scale = b-a, NOT b"
        ],
        tip: "In scipy, uniform(loc=a, scale=b-a) means the distribution goes from a to a + scale = b. A common mistake is passing b as the scale parameter.",
        important:
          "scipy.stats.uniform uses loc and scale, where loc=a and scale=b-a. The distribution spans [loc, loc+scale]. Do NOT pass b as scale — that would create a distribution over [a, a+b].",
        relatedTerms: [
          "Uniform",
          "PDF",
          "CDF",
          "Continuous"
        ]
      },
      {
        title: "Exponential Distribution",
        summary:
          "Models the waiting time between Poisson events. If events occur at rate λ per unit time, the time between consecutive events follows an Exponential distribution. It is the continuous counterpart to the Poisson.",
        points: [
          "Parameter: λ (rate) — same λ as in the related Poisson process",
          "PDF: f(x) = λ × e^(-λx) for x ≥ 0",
          "CDF: F(x) = 1 - e^(-λx)",
          "Mean: E(X) = 1/λ (average waiting time)",
          "Variance: Var(X) = 1/λ²",
          "Memoryless property: P(X > s+t | X > s) = P(X > t) — past waiting does not affect future probability",
          "Python: scipy.stats.expon(scale=1/lambda) — CRITICAL: scale parameter is 1/λ, NOT λ",
          "Poisson-Exponential link: if events arrive at rate λ per unit time (Poisson), then the inter-arrival time is Exponential(λ)"
        ],
        tip: "The memoryless property means 'the distribution does not age.' If you have already waited 5 minutes, the probability of waiting at least 3 more minutes is the same as it was at the start.",
        important:
          "In scipy.stats.expon, the scale parameter is 1/λ (the mean), NOT λ. If λ=0.5 per minute, use scale=1/0.5=2. Getting this wrong is the most common exponential distribution mistake.",
        relatedTerms: [
          "Poisson",
          "Rate",
          "Lambda",
          "Memoryless",
          "Waiting Time"
        ]
      },
      {
        title: "Normal Distribution",
        summary:
          "The most important continuous distribution in statistics. Bell-shaped, symmetric around the mean μ, with spread controlled by σ. The Central Limit Theorem ensures that sample means approach normality regardless of the population distribution.",
        points: [
          "Parameters: μ (mean, center) and σ (standard deviation, spread)",
          "PDF: f(x) = (1/σ√(2π)) × e^(-(x-μ)²/(2σ²))",
          "Symmetric about μ: mean = median = mode",
          "Empirical Rule (68-95-99.7): ~68% of data within μ±1σ, ~95% within μ±2σ, ~99.7% within μ±3σ",
          "Standard Normal: Z ~ N(0,1); any normal X can be standardized: Z = (X-μ)/σ",
          "Python: scipy.stats.norm(loc=mu, scale=sigma) — scale is σ (std dev), NOT σ² (variance)",
          "The normal distribution is completely determined by its first two moments (mean and variance)",
          "Z-scores: how many standard deviations a value is from the mean"
        ],
        tip: "Memorize the empirical rule (68-95-99.7) — it provides quick approximations without tables or computation. Also remember that about 5% of data falls beyond μ±2σ (2.5% in each tail).",
        important:
          "In scipy.stats.norm, scale=σ (standard deviation), NOT σ² (variance). If given variance=16, use scale=4 (the square root). This is tested repeatedly.",
        relatedTerms: [
          "Bell Curve",
          "Z-Score",
          "Standard Normal",
          "Empirical Rule",
          "CLT"
        ]
      },
      {
        title: "Empirical Distributions (Custom PMF)",
        summary:
          "When data does not follow a standard named distribution, you can create an empirical distribution directly from observed frequencies. This is a custom PMF built from your data.",
        points: [
          "Compute relative frequencies from observed data: P(X=x) = count(x) / total observations",
          "All probabilities must sum to 1 (normalize if they do not)",
          "Can compute E(X) = Σ x × P(x) and Var(X) = Σ (x-μ)² × P(x) using the custom PMF",
          "Python: use scipy.stats.rv_discrete(values=(xk, pk)) to create a custom discrete distribution",
          "xk = array of values, pk = array of corresponding probabilities",
          "Once created, use .pmf(), .cdf(), .mean(), .var(), .rvs() just like any scipy distribution",
          "Useful for modeling real data that does not match standard distributions"
        ],
        tip: "When building a custom PMF, always verify that probabilities sum to 1.0. Floating point rounding can cause subtle errors — use np.isclose(sum(pk), 1.0) to check.",
        relatedTerms: [
          "PMF",
          "Relative Frequency",
          "rv_discrete",
          "Expected Value"
        ]
      },
      {
        title: "scipy.stats API Pattern",
        summary:
          "All scipy.stats distributions follow a consistent API. Once you know the pattern for one distribution, you know it for all. The key methods are pmf/pdf, cdf, sf, ppf, isf, and rvs.",
        points: [
          "pmf(k) [discrete] / pdf(x) [continuous]: probability mass/density at a specific value",
          "cdf(x): P(X ≤ x) — cumulative probability from the left (left tail)",
          "sf(x): P(X > x) = 1 - cdf(x) — survival function (right tail)",
          "ppf(q): inverse CDF — given a probability q, returns the value x such that P(X ≤ x) = q (quantile function)",
          "isf(q): inverse survival function — returns x such that P(X > x) = q; isf(q) = ppf(1-q)",
          "rvs(size=n): generate n random samples from the distribution",
          "mean(), var(), std(): compute theoretical mean, variance, and standard deviation",
          "All methods accept the distribution parameters (e.g., binom.pmf(k, n, p), norm.cdf(x, loc, scale))"
        ],
        tip: "For 'at least k' problems: use sf(k-1) which gives P(X > k-1) = P(X ≥ k). For 'at most k': use cdf(k). For 'between a and b inclusive': use cdf(b) - cdf(a-1) for discrete, or cdf(b) - cdf(a) for continuous.",
        important:
          "sf(x) = P(X > x), NOT P(X ≥ x). For discrete distributions, P(X ≥ k) = sf(k-1). Getting the boundary wrong by 1 is an extremely common error.",
        relatedTerms: [
          "pmf",
          "pdf",
          "cdf",
          "sf",
          "ppf",
          "isf",
          "rvs",
          "scipy"
        ]
      }
    ]
  },
  {
    id: 4,
    title: "Central Limit Theorem & Confidence Intervals",
    topics: [
      {
        title: "Central Limit Theorem (CLT)",
        summary:
          "The CLT states that the sampling distribution of the sample mean approaches a normal distribution as sample size increases, regardless of the population distribution. This is the theoretical foundation for most inferential statistics.",
        points: [
          "Statement: If X₁, X₂, ..., Xₙ are iid random variables with mean μ and finite variance σ², then x̄ → N(μ, σ²/n) as n → ∞",
          "The distribution of x̄ becomes approximately normal for sufficiently large n, even if the population is not normal",
          "Rule of thumb: n ≥ 30 is 'large enough' for the CLT to apply for most populations",
          "If the population is already normal, the sampling distribution of x̄ is exactly normal for ANY n",
          "The CLT applies to the distribution of the sample MEAN, not the distribution of individual observations",
          "The CLT does NOT say the population becomes normal — the population shape is unchanged",
          "The CLT does NOT say individual samples become normal — only the distribution of x̄ across many samples"
        ],
        tip: "Common exam trap: 'The CLT says the data becomes normal.' WRONG. The CLT says the distribution of the SAMPLE MEAN becomes normal. The population and individual observations remain whatever shape they are.",
        important:
          "The CLT applies to the sampling distribution of x̄, NOT to the distribution of individual observations. Do not confuse these. The population distribution does not change.",
        relatedTerms: [
          "Sampling Distribution",
          "Standard Error",
          "Normal Distribution",
          "Sample Mean"
        ]
      },
      {
        title: "Sampling Distribution of the Mean",
        summary:
          "If we repeatedly draw samples of size n from a population and compute the mean of each sample, the distribution of those sample means is called the sampling distribution of the mean. Its properties are determined by the population parameters and the sample size.",
        points: [
          "Center: E(x̄) = μ (the mean of the sampling distribution equals the population mean — unbiased)",
          "Spread: SD(x̄) = σ/√n (the standard error — gets smaller as n increases)",
          "Shape: approximately normal for large n (CLT) or exactly normal if population is normal",
          "As n increases, the sampling distribution becomes tighter (less variable) around μ",
          "Quadrupling the sample size halves the standard error (because √4 = 2)",
          "The sampling distribution is a theoretical concept — it represents ALL possible samples of size n"
        ],
        tip: "To reduce the standard error by half, you need to quadruple (4x) the sample size, not double it. This inverse square root relationship is frequently tested.",
        relatedTerms: [
          "Standard Error",
          "CLT",
          "Sample Mean",
          "Population Mean"
        ]
      },
      {
        title: "Standard Error (σ/√n)",
        summary:
          "The standard error (SE) is the standard deviation of the sampling distribution of a statistic (usually the mean). It measures how much the sample mean is expected to vary from sample to sample.",
        points: [
          "SE = σ/√n when population standard deviation σ is known",
          "SE = s/√n when σ is unknown and estimated by sample standard deviation s",
          "SE decreases as sample size n increases — larger samples give more precise estimates",
          "SE is NOT the same as standard deviation: SD measures individual data spread; SE measures sampling variability of a statistic",
          "SE is used in the denominator of test statistics and in the margin of error for confidence intervals",
          "Small SE means the sample mean is a reliable estimate of the population mean"
        ],
        tip: "Do not confuse standard deviation (spread of data) with standard error (spread of the sample mean). SD describes individuals; SE describes the precision of a statistic.",
        important:
          "Standard error uses the square root of n in the denominator. A common mistake is using n instead of √n.",
        relatedTerms: [
          "Standard Deviation",
          "Sample Size",
          "Margin of Error",
          "Precision"
        ]
      },
      {
        title: "Z vs t Distribution",
        summary:
          "Both are symmetric, bell-shaped distributions used for inference. Use Z when the population standard deviation σ is known (or n is very large). Use t when σ is unknown and estimated by the sample s. The t-distribution has heavier tails to account for the extra uncertainty.",
        points: [
          "Z (standard normal): used when σ is known; Z ~ N(0,1); shape does not depend on sample size",
          "t-distribution: used when σ is unknown and estimated by s; shape depends on degrees of freedom (df = n-1)",
          "t has heavier tails than Z (more probability in the extremes) to account for uncertainty in estimating σ",
          "As df increases, t approaches Z; when df > 30, the difference is negligible",
          "When df → ∞, t converges to Z exactly",
          "Decision rule: σ known → Z; σ unknown → t (this is the most common scenario in practice)",
          "Python: scipy.stats.norm for Z, scipy.stats.t(df=n-1) for t"
        ],
        tip: "In practice, σ is almost never known, so you will use the t-distribution far more often than Z. When a problem says 'standard deviation of the sample is...' or 'estimated standard deviation', use t.",
        relatedTerms: [
          "Degrees of Freedom",
          "Standard Normal",
          "t-distribution",
          "Standard Error"
        ]
      },
      {
        title: "Confidence Intervals for a Single Population",
        summary:
          "A confidence interval (CI) gives a range of plausible values for a population parameter based on sample data. The two main formulas are Z-CI (when σ is known) and t-CI (when σ is unknown).",
        points: [
          "Z-CI: x̄ ± z* × (σ/√n) — used when population σ is known",
          "t-CI: x̄ ± t* × (s/√n) — used when σ is unknown (far more common)",
          "z* and t* are critical values determined by the confidence level (e.g., z* = 1.96 for 95% CI)",
          "Margin of Error (ME) = critical value × standard error",
          "Higher confidence level → wider interval (more certain → less precise)",
          "Larger sample size → narrower interval (more data → more precise)",
          "Common confidence levels: 90% (z*=1.645), 95% (z*=1.96), 99% (z*=2.576)",
          "Python: scipy.stats.norm.interval(confidence, loc=xbar, scale=se) for Z; scipy.stats.t.interval(confidence, df=n-1, loc=xbar, scale=se) for t"
        ],
        tip: "Memorize the three common Z critical values: 1.645 (90%), 1.96 (95%), 2.576 (99%). For t critical values, you need the degrees of freedom — use scipy.stats.t.ppf().",
        relatedTerms: [
          "Margin of Error",
          "Critical Value",
          "Confidence Level",
          "Z-CI",
          "t-CI"
        ]
      },
      {
        title: "Confidence Interval Interpretation",
        summary:
          "A 95% confidence interval does NOT mean there is a 95% probability the parameter is in this interval. It means that if we repeated the sampling process many times, approximately 95% of the resulting intervals would contain the true parameter.",
        points: [
          "CORRECT: 'We are 95% confident that the true population mean lies between [lower, upper]'",
          "CORRECT: 'If we repeated this sampling 100 times, about 95 of the intervals would contain the true mean'",
          "WRONG: 'There is a 95% probability that μ is in this interval' — μ is fixed (not random); the interval is random",
          "The confidence level refers to the long-run success rate of the METHOD, not to any single interval",
          "A single computed interval either contains μ or it does not — we just do not know which",
          "Wider intervals are more likely to capture μ but are less useful for decision-making"
        ],
        tip: "The interpretation question is almost guaranteed on the exam. The correct phrasing is about the method's long-run performance, NOT about the probability of a specific interval containing μ.",
        important:
          "NEVER say 'there is a 95% probability that μ is in this interval.' The parameter μ is a fixed (unknown) constant, not a random variable. The interval is what varies from sample to sample.",
        relatedTerms: [
          "Confidence Level",
          "Coverage Probability",
          "Frequentist Interpretation"
        ]
      },
      {
        title: "Two-Population Confidence Intervals",
        summary:
          "When comparing two populations, we construct a CI for the difference in means (μ₁ - μ₂). There are four scenarios depending on whether variances are known and whether samples are independent or paired.",
        points: [
          "Scenario 1 — Known variances (Z-CI): (x̄₁ - x̄₂) ± z* × √(σ₁²/n₁ + σ₂²/n₂). Rare in practice but appears in textbooks.",
          "Scenario 2 — Unknown but EQUAL variances (Pooled t-CI): uses pooled variance sp² = [(n₁-1)s₁² + (n₂-1)s₂²] / (n₁+n₂-2); df = n₁+n₂-2",
          "Scenario 3 — Unknown and UNEQUAL variances (Welch t-CI): uses separate variances; df from Welch-Satterthwaite approximation (messy formula — let Python compute it)",
          "Scenario 4 — Paired samples (Paired t-CI): compute d = x₁ - x₂ for each pair, then do a one-sample t-CI on d̄; df = n-1 where n is the number of pairs",
          "Paired design: same subjects measured twice (before/after), or naturally matched pairs (twins, left/right)",
          "Use Welch (Scenario 3) as the default when unsure about equal variances — it is safer",
          "Python: scipy.stats.ttest_ind(a, b, equal_var=True) for pooled; equal_var=False for Welch"
        ],
        tip: "Default to Welch's t-test (unequal variances) unless the problem explicitly states variances are equal. Welch is robust even when variances happen to be equal, so it is the safer choice.",
        relatedTerms: [
          "Pooled Variance",
          "Welch t-test",
          "Paired t-test",
          "Independent Samples"
        ]
      },
      {
        title: "Interpreting Difference CIs (Contains 0?)",
        summary:
          "When a confidence interval for the difference (μ₁ - μ₂) is computed, check whether it contains 0. This tells you whether there is a statistically significant difference between the two populations at the given confidence level.",
        points: [
          "If CI contains 0 (e.g., [-2.3, 1.5]): the difference is NOT statistically significant — we cannot conclude μ₁ ≠ μ₂",
          "If CI is entirely positive (e.g., [1.2, 4.8]): μ₁ is significantly GREATER than μ₂",
          "If CI is entirely negative (e.g., [-5.1, -0.7]): μ₁ is significantly LESS than μ₂",
          "This is equivalent to hypothesis testing: CI contains 0 ↔ fail to reject H₀: μ₁ = μ₂",
          "CI does NOT contain 0 ↔ reject H₀: μ₁ = μ₂ in favor of H₁: μ₁ ≠ μ₂",
          "The sign and magnitude of the interval give practical information about the direction and size of the effect"
        ],
        tip: "A CI for the difference that just barely contains 0 (e.g., [-0.01, 3.5]) technically means 'not significant,' but it suggests practical significance may exist. Consider the context.",
        relatedTerms: [
          "Statistical Significance",
          "Two-Population CI",
          "Hypothesis Testing",
          "Null Hypothesis"
        ]
      }
    ]
  },
  {
    id: 5,
    title: "Hypothesis Testing",
    topics: [
      {
        title: "7-Step Hypothesis Testing Process",
        summary:
          "Hypothesis testing follows a rigorous 7-step procedure to ensure objectivity. The hypotheses and significance level must be set BEFORE looking at the data to avoid bias.",
        points: [
          "Step 1: State the null hypothesis H₀ (status quo, no effect, no difference)",
          "Step 2: State the alternative hypothesis H₁ (what the researcher wants to show)",
          "Step 3: Choose the significance level α (typically 0.05, 0.01, or 0.10)",
          "Step 4: Select the appropriate test statistic (Z or t) and determine its distribution under H₀",
          "Step 5: Collect data and compute the test statistic value",
          "Step 6: Make a decision — compare test statistic to critical value, or compare p-value to α",
          "Step 7: State the conclusion in context of the original problem using plain language",
          "Steps 1-3 must be done BEFORE collecting or analyzing data"
        ],
        tip: "The 7 steps must be followed in order. Setting hypotheses after seeing data is called 'HARKing' (Hypothesizing After Results are Known) and invalidates the test.",
        important:
          "Always set H₀, H₁, and α BEFORE looking at the data. Changing these after seeing results is a serious statistical error.",
        relatedTerms: [
          "Null Hypothesis",
          "Alternative Hypothesis",
          "Significance Level",
          "Test Statistic",
          "P-value"
        ]
      },
      {
        title: "Null vs Alternative Hypothesis",
        summary:
          "The null hypothesis (H₀) represents the default/status quo position. The alternative hypothesis (H₁ or Hₐ) represents the claim the researcher wants to support. We never 'prove' H₁ — we only find sufficient evidence to reject H₀.",
        points: [
          "H₀ always contains an equality: H₀: μ = μ₀ (or ≤, or ≥)",
          "H₁ is the complement: H₁: μ ≠ μ₀ (two-tailed), μ > μ₀ (right-tailed), or μ < μ₀ (left-tailed)",
          "The burden of proof is on H₁ — we assume H₀ is true until evidence convinces us otherwise",
          "Analogy: H₀ is 'innocent until proven guilty'; rejecting H₀ is the 'guilty' verdict",
          "H₀ is what you assume; H₁ is what you want to show",
          "The research question usually determines H₁; H₀ is its negation",
          "Both hypotheses are about the POPULATION parameter, not the sample statistic"
        ],
        tip: "Read the research question carefully. Words like 'greater than', 'different from', 'increased', 'reduced' tell you the direction of H₁. 'Different from' → two-tailed. 'Greater/less than' → one-tailed.",
        relatedTerms: [
          "Null Hypothesis",
          "Alternative Hypothesis",
          "Status Quo",
          "Burden of Proof"
        ]
      },
      {
        title: "One-Tailed vs Two-Tailed Tests",
        summary:
          "The choice of one-tailed or two-tailed depends on the alternative hypothesis. Two-tailed tests for any difference (H₁: μ ≠ μ₀). One-tailed tests for a specific direction (H₁: μ > μ₀ or H₁: μ < μ₀).",
        points: [
          "Two-tailed (H₁: μ ≠ μ₀): rejection regions in BOTH tails; α/2 in each tail; use when you care about any difference",
          "Right-tailed (H₁: μ > μ₀): rejection region in the RIGHT tail only; all α in the right tail",
          "Left-tailed (H₁: μ < μ₀): rejection region in the LEFT tail only; all α in the left tail",
          "Two-tailed is more conservative (harder to reject H₀) because the critical values are farther from center",
          "One-tailed is more powerful in the specified direction but cannot detect effects in the opposite direction",
          "For two-tailed tests: reject if |test statistic| > critical value",
          "For one-tailed tests: reject if test statistic > +critical value (right) or test statistic < -critical value (left)"
        ],
        tip: "When in doubt, use a two-tailed test — it is the safer, more conservative choice. Only use one-tailed when you have a strong theoretical reason to expect a specific direction.",
        relatedTerms: [
          "Rejection Region",
          "Critical Value",
          "Alpha",
          "Significance Level"
        ]
      },
      {
        title: "Test Statistics: Z-stat and t-stat",
        summary:
          "Test statistics measure how far the sample result is from the null hypothesis value, in standardized units. The Z-stat is used when σ is known; the t-stat when σ is unknown and estimated by s.",
        points: [
          "Z-statistic: Z = (x̄ - μ₀) / (σ/√n) — when population σ is known",
          "t-statistic: t = (x̄ - μ₀) / (s/√n) — when σ is unknown, estimated by sample s; df = n-1",
          "Both measure: (observed - expected) / standard error",
          "Larger absolute value → stronger evidence against H₀",
          "The test statistic follows a known distribution under H₀ (standard normal for Z, t-distribution for t)",
          "Two-population Z-stat: Z = (x̄₁ - x̄₂) / √(σ₁²/n₁ + σ₂²/n₂)",
          "Two-population t-stat: t = (x̄₁ - x̄₂) / √(s₁²/n₁ + s₂²/n₂) for Welch; uses pooled SE for pooled test"
        ],
        tip: "The structure is always the same: (observed difference - hypothesized difference) / standard error. Once you know this pattern, you can construct any test statistic.",
        relatedTerms: [
          "Z-score",
          "t-score",
          "Standard Error",
          "Degrees of Freedom"
        ]
      },
      {
        title: "Critical Value vs P-value Methods",
        summary:
          "Two equivalent methods for making the reject/fail-to-reject decision. The critical value method compares the test statistic to a threshold. The p-value method compares the probability of observing the data (or more extreme) to α.",
        points: [
          "Critical Value Method: find the critical value(s) that define the rejection region; reject H₀ if test statistic falls in the rejection region",
          "P-value Method: compute p-value = P(observing a test statistic as extreme or more extreme than calculated, assuming H₀ is true); reject H₀ if p-value ≤ α",
          "Both methods always give the same decision",
          "P-value for two-tailed test: 2 × P(Z > |z_calc|) or 2 × P(t > |t_calc|)",
          "P-value for right-tailed test: P(Z > z_calc) = sf(z_calc)",
          "P-value for left-tailed test: P(Z < z_calc) = cdf(z_calc)",
          "Small p-value → strong evidence against H₀; large p-value → weak evidence against H₀",
          "The p-value is NOT the probability that H₀ is true"
        ],
        tip: "The p-value method is preferred in practice because it gives the exact strength of evidence, not just a binary decision. Python functions typically return p-values directly.",
        important:
          "The p-value is NOT the probability that H₀ is true. It is the probability of observing data this extreme (or more extreme) IF H₀ were true. Do not confuse these interpretations.",
        relatedTerms: [
          "P-value",
          "Critical Value",
          "Rejection Region",
          "Alpha"
        ]
      },
      {
        title: "Type I and Type II Errors",
        summary:
          "Two kinds of errors can occur in hypothesis testing. Type I (false positive): rejecting H₀ when it is actually true. Type II (false negative): failing to reject H₀ when it is actually false. There is a tradeoff between them.",
        points: [
          "Type I Error (α): rejecting a true H₀ — 'false alarm' or 'false positive'. Probability = α (significance level)",
          "Type II Error (β): failing to reject a false H₀ — 'missed detection' or 'false negative'. Probability = β",
          "Power = 1 - β: the probability of correctly rejecting a false H₀ (detecting a real effect)",
          "α and β are inversely related: decreasing α (more strict) increases β (more likely to miss real effects)",
          "Decreasing both errors simultaneously requires increasing sample size n",
          "α is set by the researcher before the test (typically 0.05); β depends on the true parameter value, n, and α",
          "In practice: Type I error is usually considered worse (e.g., convicting an innocent person), which is why α is set small"
        ],
        tip: "Remember the analogy: Type I = convicting an innocent person (false positive); Type II = letting a guilty person go free (false negative). Which is worse depends on context.",
        important:
          "The only way to reduce both Type I and Type II errors simultaneously is to increase the sample size. You cannot reduce both by simply adjusting α.",
        relatedTerms: [
          "Alpha",
          "Beta",
          "Power",
          "False Positive",
          "False Negative",
          "Sample Size"
        ]
      },
      {
        title: "Single Population Tests: Z-test and t-test",
        summary:
          "Tests whether a population mean μ equals a hypothesized value μ₀. Use a Z-test when σ is known; use a t-test when σ is unknown (much more common).",
        points: [
          "Z-test: H₀: μ = μ₀; Z = (x̄ - μ₀) / (σ/√n); requires known σ and either normal population or n ≥ 30",
          "t-test: H₀: μ = μ₀; t = (x̄ - μ₀) / (s/√n); df = n-1; requires normal population or n ≥ 30",
          "Assumptions: (1) random sample, (2) independence of observations, (3) population approximately normal or n ≥ 30 (CLT)",
          "For small samples (n < 30) from non-normal populations: use non-parametric tests instead",
          "Python Z-test: manual computation or statsmodels.stats.weightstats.ztest",
          "Python t-test: scipy.stats.ttest_1samp(sample, popmean=mu0) returns (t_stat, p_value)",
          "The ttest_1samp p-value is two-tailed by default; divide by 2 for one-tailed tests"
        ],
        tip: "scipy.stats.ttest_1samp returns a two-tailed p-value. For a one-tailed test, divide the p-value by 2 AND check that the test statistic is in the expected direction.",
        relatedTerms: [
          "Z-test",
          "t-test",
          "One-Sample",
          "ttest_1samp",
          "Significance"
        ]
      },
      {
        title: "Two-Population Tests (4 Scenarios)",
        summary:
          "When comparing two population means, the choice of test depends on whether variances are known, whether they are equal, and whether samples are independent or paired. The same four scenarios from CIs apply.",
        points: [
          "Scenario 1 — Known variances (Z-test): Z = (x̄₁ - x̄₂) / √(σ₁²/n₁ + σ₂²/n₂). Rare in practice.",
          "Scenario 2 — Unknown, EQUAL variances (Pooled t-test): uses sp² = [(n₁-1)s₁² + (n₂-1)s₂²] / (n₁+n₂-2); df = n₁+n₂-2. Python: ttest_ind(a, b, equal_var=True)",
          "Scenario 3 — Unknown, UNEQUAL variances (Welch t-test): uses separate variances; df from Welch-Satterthwaite. Python: ttest_ind(a, b, equal_var=False). This is the DEFAULT and safest choice.",
          "Scenario 4 — Paired samples (Paired t-test): t = d̄ / (s_d/√n) where d = x₁ - x₂ for each pair; df = n-1. Python: ttest_rel(a, b)",
          "Key decision: are the samples independent or paired? Then: is σ known? If not, are variances assumed equal?",
          "Levene's test can formally test for equal variances: scipy.stats.levene(a, b)",
          "All tests assume normality of the test statistic (satisfied by CLT for large n or normal populations)"
        ],
        tip: "Use Welch (equal_var=False) as the default for independent samples. It is robust and does not require the equal variance assumption. Only use pooled if you have strong reason to believe variances are equal.",
        important:
          "Paired tests (ttest_rel) require matched observations — the order of data in both arrays must correspond to the same subjects/pairs. Mixing up the pairing invalidates the test.",
        relatedTerms: [
          "Pooled t-test",
          "Welch t-test",
          "Paired t-test",
          "ttest_ind",
          "ttest_rel",
          "Levene's Test"
        ]
      },
      {
        title: "Normality Tests",
        summary:
          "Many parametric tests assume the data (or residuals) are normally distributed. Normality tests help verify this assumption. The two most common are Shapiro-Wilk (best for small samples) and Kolmogorov-Smirnov (for larger samples or testing against any distribution).",
        points: [
          "Shapiro-Wilk test: H₀: data is normally distributed; H₁: data is not normally distributed. Best for n < 50.",
          "Kolmogorov-Smirnov (KS) test: H₀: data follows a specified distribution; H₁: it does not. More general — can test against any distribution.",
          "Both tests: p-value > α → fail to reject H₀ → data is consistent with normality (but does not prove it)",
          "Both tests: p-value ≤ α → reject H₀ → data significantly deviates from normality",
          "Python: scipy.stats.shapiro(data) returns (statistic, p_value)",
          "Python: scipy.stats.kstest(data, 'norm', args=(mean, std)) for KS test against normal",
          "Also use visual methods: Q-Q plot (points on diagonal = normal), histogram with normal overlay",
          "For large samples (n > 50), normality tests are very sensitive — even trivial deviations cause rejection"
        ],
        tip: "For small samples, prefer Shapiro-Wilk (more powerful for normality). For large samples, normality tests may reject even for negligible deviations — supplement with Q-Q plots for visual assessment.",
        important:
          "Failing to reject H₀ in a normality test does NOT prove the data is normal. It only means you lack evidence of non-normality. With small samples, the test may simply lack power to detect deviations.",
        relatedTerms: [
          "Shapiro-Wilk",
          "Kolmogorov-Smirnov",
          "Q-Q Plot",
          "Normal Distribution",
          "Assumptions"
        ]
      },
      {
        title: "Non-Parametric Tests",
        summary:
          "When normality assumptions are violated (small sample + non-normal data), use non-parametric tests. These test medians or ranks instead of means and make fewer assumptions about the population distribution.",
        points: [
          "Mann-Whitney U test: non-parametric alternative to the independent two-sample t-test; compares medians/ranks of two independent groups",
          "Wilcoxon Signed-Rank test: non-parametric alternative to the paired t-test; compares paired observations using signed ranks",
          "Non-parametric tests compare ranks or medians rather than means — no normality assumption needed",
          "Trade-off: non-parametric tests have less statistical power than parametric tests when normality holds",
          "When to use: small sample (n < 30) AND normality test rejects AND data is ordinal or non-normal",
          "Python: scipy.stats.mannwhitneyu(x, y, alternative='two-sided') for Mann-Whitney U",
          "Python: scipy.stats.wilcoxon(d) or scipy.stats.wilcoxon(x, y) for Wilcoxon Signed-Rank",
          "Decision tree: normality satisfied → parametric (t-test); normality violated → non-parametric (Mann-Whitney/Wilcoxon)"
        ],
        tip: "Remember the pairing: independent samples + non-normal → Mann-Whitney U; paired samples + non-normal → Wilcoxon Signed-Rank. These are the non-parametric mirrors of ttest_ind and ttest_rel.",
        relatedTerms: [
          "Mann-Whitney U",
          "Wilcoxon",
          "Ranks",
          "Median",
          "Parametric",
          "Non-Parametric"
        ]
      },
      {
        title: "Conclusion Language",
        summary:
          "The language used to state hypothesis test conclusions is precise and prescribed. We either 'reject H₀' or 'fail to reject H₀' — never 'accept H₀.' The conclusion must always be stated in the context of the original problem.",
        points: [
          "If p-value ≤ α: 'We reject H₀. There is sufficient evidence at the α significance level to conclude that [H₁ in context].'",
          "If p-value > α: 'We fail to reject H₀. There is insufficient evidence at the α significance level to conclude that [H₁ in context].'",
          "NEVER say 'we accept H₀' — failing to reject is NOT the same as accepting. Absence of evidence is not evidence of absence.",
          "NEVER say 'we prove H₁' — hypothesis testing provides evidence, not proof",
          "Always state the conclusion in plain language related to the original research question",
          "Include the significance level α in your conclusion statement",
          "A non-significant result means the data is consistent with H₀, but H₀ might still be false (Type II error possible)"
        ],
        tip: "The phrase 'fail to reject H₀' is intentionally awkward — it reminds you that you have NOT shown H₀ is true. You simply lack sufficient evidence against it. Think of it as 'not guilty' rather than 'innocent.'",
        important:
          "NEVER say 'accept H₀'. This is incorrect terminology. The correct phrase is 'fail to reject H₀.' Similarly, never say 'prove' — use 'sufficient evidence to conclude' instead. Using wrong language loses points on exams.",
        relatedTerms: [
          "Reject",
          "Fail to Reject",
          "Significance Level",
          "P-value",
          "Conclusion"
        ]
      }
    ]
  }
] as const
