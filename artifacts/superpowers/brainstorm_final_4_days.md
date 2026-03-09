# Brainstorm: Final 4 Days for Oura Internship

## Goal
Maximize the impact of the `oura_software_test_engineering` project to stand out for a Test Engineering internship at Oura, given a 4-day time limit.

## Constraints
- Time: 4 days remaining.
- Must focus on Test Engineering skills (automation, CI/CD, reporting, testability).

## Areas of Investment (Value vs. Effort)

1.  **GitHub Actions (CI/CD)**
    *   **Value:** VERY HIGH. Test Engineers live in CI/CD. Showing a robust pipeline is proof of capability. Reviewers *absolute* look at the `.github/workflows` folder.
    *   **Effort:** Low to Medium.
    *   **Ideas:** Add test coverage reporting, linting for Python/TypeScript, and branch protection rules.

2.  **Test Flakiness (Chaos Mode)**
    *   **Value:** HIGH. Fixing flaky tests is a classic SDET (Software Development Engineer in Test) task. 
    *   **Effort:** Low.
    *   **Ideas:** Control the random seed during tests or mock the API response to ensure deterministic test results.

3.  **UI Automation (Appium / Playwright)**
    *   **Value:** HIGH. Shows full-stack testing capabilities.
    *   **Effort:** High.
    *   **Ideas:** Implement basic Appium tests or web-based UI tests to verify the core metric cards render correctly.

4.  **Documentation & Polish**
    *   **Value:** HIGH. First impressions matter.
    *   **Effort:** Low.
    *   **Ideas:** Add badges to the README (build passing, coverage). Clean up code comments.

## Risks
- Starting complex UI automation (Appium) might eat up all 4 days and leave the project broken. We should stick to basics or use a simpler tool if Appium is too complex to set up quickly.

## Acceptance Criteria
- GitHub Actions pipeline runs cleanly with Code Coverage.
- Backend API tests are 100% deterministic (no more Chaos Mode flakiness).
- README has CI status badges.
