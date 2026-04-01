# End-to-End Test Automation Framework (Flagship Project)

A production-style Playwright test automation framework for UI and API testing with:

- Page Object Model (POM)
- Data-driven tests (JSON/CSV)
- Retries for flaky tests
- Parallel execution and sharding
- Allure + Playwright reporting
- Failure screenshots, traces, videos, logs
- Multi-environment support (dev/staging/prod)
- Docker execution
- GitHub Actions CI pipeline

## 1) Tech Stack

- Playwright test runner
- TypeScript
- Allure reporting
- CSV parser for data-driven scenarios
- dotenv for environment handling

## 2) Project Structure

```text
src/
  api/
  config/
  core/
  pages/
tests/
  api/
  ui/
  data/
.github/workflows/
scripts/
docs/
```

## 3) Setup

```bash
npm install
npx playwright install
copy .env.example .env
```

## 4) Run Tests

```bash
npm test
npm run test:ui
npm run test:api
npm run test:smoke
npm run test:parallel
```

## 5) Reports

Playwright HTML report:

```bash
npm run report:html
```

Allure report:

```bash
npm run report:allure:generate
npm run report:allure:open
```

## 6) Environments

Set in `.env`:

```env
TEST_ENV=dev
HEADLESS=true
RETRIES=1
WORKERS=50%
```

Override URL values with:

- `UI_BASE_URL_DEV`, `UI_BASE_URL_STAGING`, `UI_BASE_URL_PROD`
- `API_BASE_URL_DEV`, `API_BASE_URL_STAGING`, `API_BASE_URL_PROD`

## 7) CI/CD

Pipeline file: `.github/workflows/playwright-e2e.yml`

- Runs on push and PR
- Executes tests in 2 shards
- Uploads Playwright and Allure artifacts

## 8) Docker

Run test suite inside Docker:

```bash
docker compose up --build
```

## 8.1) Optional Live Landing Page

This repository now includes a tiny static landing page for Vercel deployment.
It exists only to provide a valid public URL for demos or form fields that require a live website.

Deploy with:

```bash
npm install -g vercel
vercel
```

After deployment, use the generated `https://...vercel.app` URL as your website link.

## 9) Included Sample Coverage

- UI login tests and form validation (SauceDemo)
- API CRUD tests against JSONPlaceholder
- Data-driven login and checkout validation

## 10) Next Improvements

- Add tags-based test suites (`@regression`, `@sanity`)
- Add contract/schema validation for APIs
- Add Slack/Teams notifications from CI
- Merge shard reports into single published report
