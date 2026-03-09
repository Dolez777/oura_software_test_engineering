# Plan: Final 4 Days Improvements

## Goal Description
Enhance the project's testing infrastructure and CI/CD pipeline to create the strongest possible portfolio piece for an Oura Software Test Engineering internship.

## User Review Required
> [!IMPORTANT]
> Please review this plan. Are you comfortable proceeding with these improvements?
> Also, notice the "Superpowers Rules" require you to run `/superpowers-execute-plan` after approving this before I can start writing code.

## Proposed Changes

### Phase 1: Perfect the CI/CD Pipeline (GitHub Actions)
Reviewers **definitely** look at GitHub Actions. It is the backbone of modern Test Engineering.
*   **Enhance `test.yml`**: Add Python linting (flake8/black) and TypeScript linting.
*   **Test Coverage**: Integrate `pytest-cov` to measure backend test coverage and upload the results as an artifact.
*   **Badges**: Add a "Build Passing" and "Coverage" badge to the `README.md`.

### Phase 2: Fix Test Flakiness 
Flaky tests are a test engineer's worst enemy. Fixing this shows great maturity.
*   **Backend API Tests**: Modify `tests/test_api.py` and `backend/mock_api.py` to allow deterministic testing (e.g., bypassing true randomness during tests so they pass 100% of the time, or explicitly testing the error states).

### Phase 3: UI Test Skeleton
*   **UI Automation**: Since Appium can be complex to set up locally in a few days, we will ensure the `test_ui_structure.py` is well-documented and perhaps add Playwright or basic Jest snapshot testing for the frontend components to prove UI testing competency.

## Verification Plan

### Automated Tests
*   Run `pytest` locally to ensure all tests pass deterministically 10 times in a row.
*   Run the GitHub Actions workflow locally (using `act` if available) or verify the YAML syntax is correct.

### Manual Verification
*   Review the generated HTML test reports and coverage reports.
*   Verify the README badges are correctly formatted.
