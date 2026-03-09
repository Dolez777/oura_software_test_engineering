# Oura Software Test Engineering Internship Project: TLDR

**For AI Assistants:** If you are reading this to understand the project context, here is the technical summary of the codebase.

## 🎯 Project Goal
A portfolio project designed specifically to demonstrate Software Test Engineering (STE) and QA Automation skills for an internship application at Oura. It simulates a health wearable's ecosystem with a mobile dashboard and a backend API, heavily focused on testing infrastructure, chaos engineering, and CI/CD.

## 🛠️ Tech Stack & Architecture

### 1. Frontend (Mobile App)
- **Framework:** React Native with Expo (TypeScript).
- **UI:** A dark-mode, premium dashboard mimicking Oura's UI (Sleep, Activity, Readiness metric cards).
- **Testability Focus:** Every interactive element and view is thoroughly tagged with `testID` and `accessibilityLabel` for deterministic UI automation.

### 2. Backend (Data Mocking & Fault Injection)
- **Framework:** FastAPI (Python 3.11).
- **Role:** Simulates the cloud APIs that a wearable app would communicate with. Generates mocked health metrics.
- **Chaos Engineering ("Chaos Mode"):** The backend features a stochastic "Chaos Mode" that intentionally injects varying HTTP errors (e.g., 500s, dropped packets, malformed payloads) to test the frontend's error boundary resilience and the API test suite's robustness.

### 3. Testing Infrastructure (The Core Focus)
- **API Automation:** `pytest` suite testing schema validation and evaluating backend chaos injection (`tests/test_api.py`).
- **UI Automation (WIP):** Skeleton Appium scripts established for E2E device testing (`tests/test_ui_structure.py`).
- **Static Analysis:** `pyre` type-checking integrated to catch augmented assignment and typing regressions.
- **Reporting:** Uses `pytest-html` to generate detailed test execution reports (e.g., `report.html`).

### 4. CI/CD Pipeline
- **Environment:** GitHub Actions (`.github/workflows/test.yml`).
- **Workflow:** Sets up dual environments (Node 20.x, Python 3.11), parallelizes testing operations, launches background jobs, and stores testing artifacts sequentially.

### 5. Documentation & Bug Tracking
- **Bug Reports:** Detailed tracking of simulated production issues (e.g., CI/CD failures, random seed flakiness) in `BUG_REPORTS.md`.
- **Active state:** Tracked dynamically in `MEMORY.md`.

## 🚧 Current Known Issues (As per MEMORY.md)
1. **Flakiness:** Chaos Mode's reliance on random choice causes stochastic test failures unless the RNG seed is mocked.
2. **Frontend Validation:** The React Native app lacks dynamic payload validation schemas (e.g., Zod) against malformed strings, potentially leading to visual bleeding before crashing.
3. **Pyre Static Analysis:** Struggles inferring types in loops with augmented assignment (`+=`), requiring `# type: ignore` suppressions.

## 🚀 Next Steps
- Execute Appium scripts on AWS Device Farm.
- Implement deterministic failure forcing to fix Chaos Mode test flakiness.
