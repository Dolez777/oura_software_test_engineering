# Oura CI/CD Pipeline & Test Automation Incident Report

## Incident ID: #Oura-Test-4921
**Date**: October 24, 2025
**Priority**: High
**Environment**: CI/CD (GitHub Actions `ubuntu-latest` running Appium/Python/React Native)

### Issue Summary
During the nightly integration test suite targeting the `main` branch, the Appium UI Automation test class `TestMobileUI::test_chaos_mode_toggle` failed on the step waiting for the error box to appear after enabling Chaos Mode. The failure caused the GitHub Actions pipeline job `test-suite` to halt and generated a non-zero exit code (1).

### Steps to Reproduce
1. The CI pipeline initiates `npx expo export` and sets up the Appium driver attached to a virtual device.
2. The FastAPI mock server `backend/mock_api.py` is started in a background thread via a pytest fixture.
3. The automated test driver launches the React Native app.
4. Python Appium script clicks the button with `accessibilityLabel="chaos-mode-toggle"`.
5. Script asserts `error-box` container becomes visible within the 10-second explicit wait timeout.

### Extracted CI Pipeline Logs
```log
=================================== FAILURES ===================================
_____________________ TestMobileUI.test_chaos_mode_toggle ______________________

self = <test_ui_structure.TestMobileUI object at 0x7f9a2b1c3e50>
driver = <appium.webdriver.webdriver.WebDriver (session="8f8a1d...")>

    def test_chaos_mode_toggle(self, driver):
        ...
        chaos_btn = driver.find_element(AppiumBy.ACCESSIBILITY_ID, "chaos-mode-toggle")
        chaos_btn.click()
        
        refresh_btn = driver.find_element(AppiumBy.ACCESSIBILITY_ID, "refresh-button")
        refresh_btn.click()
        
        # Wait for Error Box to appear
>       error_box = WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((AppiumBy.ACCESSIBILITY_ID, "error-box"))
        )
E       selenium.common.exceptions.TimeoutException: Message: 

tests/test_ui_structure.py:38: TimeoutException
=========================== short test summary info ============================
FAILED tests/test_ui_structure.py::TestMobileUI::test_chaos_mode_toggle - selenium.common.exceptions.TimeoutException: Message: 
========================= 1 failed, 3 passed in 21.05s =========================
Error: Process completed with exit code 1.
```

### Root Cause Analysis (RCA)
Upon investigating the failure, it was determined that the test randomly fails because `chaosMode` in the mock API backend (`generate_chaos`) randomly chooses between `"500"`, `"null"`, `"corrupt"`, and `"fine"`.
If the random selection is `"corrupt"` or `"fine"`, the React Native frontend `App.tsx` does NOT throw an error but instead renders the corrupted/valid data. Therefore, the `error-box` container never appears, and the `WebDriverWait` times out.

**Code Reference (`backend/mock_api.py`)**:
```python
def generate_chaos(data: dict) -> dict:
    chaos_type = random.choice(["500", "null", "corrupt", "fine", "fine"])
    ...
```

### Resolution & Action Required
1. **Test Update**: Modify `test_chaos_mode_toggle` to account for the stochastic nature of the chaos mode. Rather than expecting a specific 500 error every time, the test should poll multiple times or the mock API should provide a deterministic chaos query parameter (`?chaos=error500`).
2. **Frontend Fallback**: Add stronger TypeScript type-checking or Schema validation layers in the frontend App (e.g., standard Zod validation) to actively reject `"corrupt"` JSON responses before rendering them, ensuring the UI always throws an Error boundary when the schema is violated.
