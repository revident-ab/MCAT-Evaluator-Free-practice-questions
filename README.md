# MCAT Toolkit + Chance Evaluator

A small React + TypeScript app that gives you:
- a practice page with spaced review
- a baseline acceptance lookup using the AAMC MCAT–GPA grid
- an MCAT percentile lookup

## Run
- Install: `npm install`
- Dev: `npm run dev`
- Build: `npm run build`

## Data
The app ships with tiny sample JSON files in `src/data`:
- `a23.sample.json`
- `percentiles.sample.json`
- `items.sample.json`

Replace the samples with official data to get real results.

**AAMC sources**
- MCAT–GPA Acceptance Grid (Table A-23). Download the latest cycle aggregate and convert to JSON: https://www.aamc.org/data-reports/students-residents/interactive-data/acceptance-rates-applicants-and-matriculants-2002-2024
- MCAT Percentile Ranks for Scores: https://students-residents.aamc.org/advisors/mcat-percentile-ranks
- MCAT Content Outline: https://students-residents.aamc.org/prepare-mcat-exam/whats-mcat-exam

**Learning approach**
- Practice testing and distributed practice improve retention. See the evidence summary in Dunlosky et al., 2013, *Psychological Science in the Public Interest*: https://journals.sagepub.com/doi/10.1177/1529100612453266

## JSON shapes

**A-23 grid**
```json
[{"mcatRange":">517","gpaRange":"3.60-3.79","acceptRate":0.724}]
```

**Percentiles**
```json
[{"score":518,"percentile":95}]
```

## Notes
- The evaluator bins your GPA and MCAT using AAMC-style ranges and looks up the acceptance rate in your JSON.
- The practice page stores review state in `localStorage`.