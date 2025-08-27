# MCAT Toolkit + Chance Evaluator — README

## What you get

* MCAT practice with spaced review
* Chance evaluator that reads GPA and MCAT and returns a baseline acceptance range from the AAMC MCAT–GPA grid
* MCAT percentile lookup using the AAMC percentile table
* Small, clean React + TypeScript codebase you can extend

Data sources

* AAMC MCAT–GPA Acceptance Grid
  [https://www.aamc.org/data-reports/students-residents/interactive-data/acceptance-rates-applicants-and-matriculants-2002-2024](https://www.aamc.org/data-reports/students-residents/interactive-data/acceptance-rates-applicants-and-matriculants-2002-2024)
* AAMC MCAT Percentile Ranks
  [https://students-residents.aamc.org/advisors/mcat-percentile-ranks](https://students-residents.aamc.org/advisors/mcat-percentile-ranks)
* AAMC “What’s on the MCAT” content outline
  [https://students-residents.aamc.org/prepare-mcat-exam/whats-mcat-exam](https://students-residents.aamc.org/prepare-mcat-exam/whats-mcat-exam)
* Study methods evidence
  Dunlosky et al. 2013. Psychological Science in the Public Interest
  [https://journals.sagepub.com/doi/10.1177/1529100612453266](https://journals.sagepub.com/doi/10.1177/1529100612453266)

## Quick start

* Install Node 18 or newer
* In the project folder

  * `npm install`
  * `npm run dev`
* Open the printed local URL in your browser

Build

* `npm run build`
* `npm run preview` to test the production build

## App structure

* `index.html` entry file for Vite
* `src/main.tsx` router setup
* `src/App.tsx` layout and navigation
* `src/pages/Home.tsx` overview and quick links
* `src/pages/Practice.tsx` MCAT practice with spaced review
* `src/pages/Evaluator.tsx` baseline chance evaluator and percentile lookup
* `src/utils/binning.ts` GPA and MCAT bin logic that matches AAMC ranges
* `src/store/srs.ts` simple spaced repetition functions
* `src/data/` sample JSON

  * `a23.sample.json` tiny demo of AAMC grid rows
  * `percentiles.sample.json` tiny demo of percentile rows
  * `items.sample.json` small practice item bank

## MCAT practice — how it works

* Item format

  * `section` one of BB, CP, PS, CARS
  * `stem` the prompt text
  * optional `choices` array with `correct` flags
  * optional `explanation`
  * `tags` for AAMC foundational concepts
* Review flow

  * The page loads items due now
  * Click Reveal to see the answer and explanation
  * Grade the item

    * Again
    * Good
    * Easy
* Scheduler

  * Stored in `src/store/srs.ts`
  * Tracks `interval`, `ease`, `dueAt`
  * Grades update the next review date
  * Data saved in `localStorage` so sessions persist
* Add your items

  * Open `src/data/items.sample.json`
  * Add or replace with your own items that follow the same shape
  * Keep each item mapped to AAMC sections and tags
  * Content outline
    [https://students-residents.aamc.org/prepare-mcat-exam/whats-mcat-exam](https://students-residents.aamc.org/prepare-mcat-exam/whats-mcat-exam)

## Chance evaluator — how it works

* Inputs

  * GPA number 0 to 4
  * MCAT score 472 to 528
* Binning

  * MCAT and GPA are mapped to labeled ranges that match the AAMC acceptance grid
  * Bins live in `src/utils/binning.ts`
* Acceptance rate lookup

  * The evaluator searches a JSON array that mirrors AAMC Table A-23
  * It returns the `acceptRate` for your MCAT–GPA cell as a baseline range
  * This is a baseline only
  * Schools use holistic review
  * AAMC acceptance grid
    [https://www.aamc.org/data-reports/students-residents/interactive-data/acceptance-rates-applicants-and-matriculants-2002-2024](https://www.aamc.org/data-reports/students-residents/interactive-data/acceptance-rates-applicants-and-matriculants-2002-2024)
* Percentile lookup

  * The app finds the nearest row in the AAMC percentile table JSON
  * Shows your MCAT percentile next to the score
  * AAMC percentiles
    [https://students-residents.aamc.org/advisors/mcat-percentile-ranks](https://students-residents.aamc.org/advisors/mcat-percentile-ranks)

## Replace sample data with official data

* Acceptance grid

  * Download or export the latest AAMC acceptance grid
  * Convert to JSON with this shape

    ```json
    [{"mcatRange":">517","gpaRange":"3.60-3.79","acceptRate":0.724}]
    ```
  * Keep the exact `mcatRange` and `gpaRange` labels that match the bins in `binning.ts`
  * Save as `src/data/a23.json` or import your filename in `Evaluator.tsx`
* Percentiles

  * Convert the current AAMC percentile table to JSON with this shape

    ```json
    [{"score":518,"percentile":95}]
    ```
  * Save as `src/data/percentiles.json` and update the import if you change the name
* Upload in the UI

  * Go to Evaluator
  * Use the two file pickers to load your JSON at runtime
  * Or hardcode your files by changing the imports

## Edit the bins if AAMC changes ranges

* Open `src/utils/binning.ts`
* Update the `mcatBins` or `gpaBins` arrays
* Ensure your A-23 JSON uses the same range labels
* Rebuild

## Add more practice items

* Append objects to `src/data/items.sample.json`
* Keep sections and tags consistent
* Start small with 10 per section
* Increase over time
* Use evidence-based study methods

  * Practice testing and distributed practice show strong effects
  * Dunlosky et al. 2013
    [https://journals.sagepub.com/doi/10.1177/1529100612453266](https://journals.sagepub.com/doi/10.1177/1529100612453266)

## Deploy

* Vercel

  * Import the repo
  * Framework preset Vite
  * Build command `npm run build`
  * Output `dist`
* Netlify

  * Build `npm run build`
  * Publish directory `dist`

## Troubleshooting

* Red underline in `tsconfig.json`

  * Ensure VS Code language mode is JSON
  * Reload window
* Type errors on imports

  * Run `npm install`
  * Delete `node_modules` then reinstall if needed
* Blank page

  * Open the browser console
  * Fix any JSON parse errors from custom files
* No items due

  * Click Reveal and grade a few to start scheduling
