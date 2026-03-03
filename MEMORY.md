# Project Memory

## What We Finished
- **React Native Frontend**: Initialized an Expo TypeScript application with a dark-mode premium UI dashboard mimicking Oura. Added core metric cards (Sleep, Activity, Readiness) and tagged every interactive element with `testID` and `accessibilityLabel`.
- **Backend Mock API**: Created a FastAPI mock server in `backend/mock_api.py` that generates mocked health metrics and includes a specific stochastic "Chaos Mode". 
- **Pytest Automation Suite**: Implemented `tests/test_api.py` targeting the Backend API, executing schema validation schemas, and evaluating "Chaos Mode" error injection. Created UI automation skeleton logic in `tests/test_ui_structure.py`.
- **CI/CD Pipeline**: Written `.github/workflows/test.yml` to set up dual environments (Node `18.x`, Python `3.11`), launch background jobs, parallelize testing dependencies, and store `pytest-html` artifacts sequentially.
- **Bug Reports**: Outlined a simulated GitHub actions issue in `BUG_REPORTS.md` along with root cause and steps to reproduce.

## Known Bugs / Issues
- Chaos Mode relies on Python's random choice picker, meaning automated End-to-End tests will behave stochastically unless specifically mocking the seeded randoms or explicitly overriding parameters.
- Frontend App is not yet properly validating HTTP payload failures dynamically using schemas, so corrupt string insertions might bleed visually into UI components prior to crashing.

## What We Are Doing Next
- The foundation is fully established. The next major phase would be hooking up standard Appium grid to execute `tests/test_ui_structure.py` on AWS Device Farm or an equivalent mobile device cloud.
- Address the Chaos mode test flakiness by forcing deterministic failures in the integration suite.
