# Framework Architecture

## High-Level Flow

```mermaid
flowchart LR
    A[Config Loader] --> B[Playwright Runner]
    B --> C[UI Tests]
    B --> D[API Tests]
    C --> E[Page Objects]
    C --> F[Test Data JSON/CSV]
    D --> G[API Client]
    B --> H[Artifacts]
    H --> I[Playwright HTML]
    H --> J[Allure Report]
    B --> K[GitHub Actions]
    B --> L[Docker]
```

## Design Decisions

- POM keeps selectors and user actions reusable
- Config is centralized for environment switching
- Data-driven tests decouple test logic from input data
- Reporter setup stores both human-readable and CI-friendly results
- Retries + traces/videos improve flaky test diagnosis
