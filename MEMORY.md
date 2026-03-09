# Project Memory

## What We Finished
- **React Native Frontend**: Initialized an Expo TypeScript application with a dark-mode premium UI dashboard mimicking Oura. Added core metric cards (Sleep, Activity, Readiness) and tagged every interactive element with `testID` and `accessibilityLabel`.
- **Backend Mock API**: Created a FastAPI mock server in `backend/mock_api.py` that generates mocked health metrics and includes a specific stochastic "Chaos Mode". 
- **Pytest Automation Suite**: Implemented `tests/test_api.py` targeting the Backend API, executing schema validation schemas, and evaluating "Chaos Mode" error injection. Created UI automation skeleton logic in `tests/test_ui_structure.py`.
- **CI/CD Pipeline**: Written `.github/workflows/test.yml` to set up dual environments (Node `20.x`, Python `3.11`), launch background jobs, parallelize testing dependencies, and store `pytest-html` artifacts sequentially.
- **Bug Reports**: Outlined a simulated GitHub actions issue in `BUG_REPORTS.md` along with root cause and steps to reproduce.
- **Networking Fixes**: Resolved physical Android USB debugging roadblocks by routing `adb reverse tcp:8081` (Metro) and `adb reverse tcp:8000` (FastAPI) and switching the backend script to support string-imported `uvicorn.run()` hot-reloading.
- **Project Documentation**: Wrote a high-quality `README.md` aimed at the Oura Software Test Engineering internship and a comprehensive `project_tldr_for_gemini.md` for AI reference.
- **Security Audit**: Scanned repository thoroughly for leaked tokens (`key`, `password`, `secret`, `token`). Validated `.env` file is empty. Signed off `SECURITY_LOG.md` for public portfolio publishing.
- **IDE/Type Checking**: Fixed Pyre/Pyre2 `Could not find import` errors by properly specifying `.` and `venv/Lib/site-packages` as `search_path` explicitly in `.pyre_configuration`.
- **CI/CD Pipeline Improvements**: Enhanced `.github/workflows/test.yml` with Python code linting (`flake8`, `black`), `pytest-cov` test coverage generation, and added interactive status badges to the `README.md`.
- **Chaos Mode Stabilization**: Eliminated test flakiness by adding a deterministic `chaos_type` override to the FastAPI backend, allowing the test suite to target precise 500 Internal Server errors and corrupted schemas.

## Known Bugs / Issues
- Frontend App is not yet properly validating HTTP payload failures dynamically using schemas, so corrupt string insertions might bleed visually into UI components prior to crashing.
- Pyre2 static analysis has trouble inferring the type of augmented assignment (e.g., `+=`) within loops, requiring `# type: ignore` as a workaround.

## What We Are Doing Next
- The foundation is fully established. The next major phase would be hooking up standard Appium grid to execute `tests/test_ui_structure.py` on AWS Device Farm or an equivalent mobile device cloud.
- Expand React Native frontend to use strict Zod payload validation to reject the corrupted payloads gracefully.
