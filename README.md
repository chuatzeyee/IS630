# ☭ IS630 StudyComrade

A comradely study resource for **SMU IS630 Statistical Thinking in Data Science**.

Built with React 19 + TypeScript + Tailwind CSS 4 + Vite. Deployed to GitHub Pages.

**Live site:** [chuatzeyee.github.io/IS630](https://chuatzeyee.github.io/IS630/)

## What's Inside

| Section | Count | Description |
|---------|------:|-------------|
| **Topics** | 49 | Key concepts organized by session with tips and exam warnings |
| **Definitions** | 107 | Searchable glossary of statistical terms |
| **Snippets** | 30 | Copy-pasteable Python code for every statistical operation |
| **Practice** | 105 | Interactive multiple-choice quiz with scoring and session filters |

## Sessions Covered

1. **Foundations of Statistical Thinking** — data types, CRISP-DM, Frequentist vs Bayesian, NumPy/Pandas
2. **Descriptive Statistics & EDA** — central tendency, variation, skewness, visualization, missing data
3. **Probability & Univariate Distributions** — counting, probability rules, 7 distributions, scipy.stats API
4. **CLT & Confidence Intervals** — sampling distributions, standard error, Z/t intervals, two-population CI
5. **Hypothesis Testing** — Z/t tests, p-values, normality tests, non-parametric tests (Mann-Whitney, Wilcoxon)

## Tech Stack

- **React 19** + **TypeScript** — component-based SPA
- **Tailwind CSS 4** — dark theme with custom design tokens
- **Vite 8** — dev server and build
- **React Router 7** — HashRouter for GitHub Pages compatibility
- **Lucide React** — icons

## Development

```bash
npm install
npm run dev      # http://localhost:5173/IS630/
npm run build    # outputs to dist/
```

## Deployment

Built output in `dist/` is pushed to the `gh-pages` branch. GitHub Pages serves from that branch at `/IS630/`.

```bash
npm run build
cd dist
git init && git checkout -b gh-pages
git add -A && git commit -m "deploy"
git remote add origin https://github.com/chuatzeyee/IS630.git
git push -u origin gh-pages --force
```
