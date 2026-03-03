# Review Pass: Health & Sleep Tracker CI/CD Infrastructure

## Severity Listing

### Blocker
- None. The stack successfully runs and tests collect as expected.

### Major
- **Chaos Mode Test Determinism**: The `test_chaos_mode` in the Appium skeleton or the Mock API test relies on randomness to trigger failures. In CI/CD, this might pass when it should fail, or fail randomly in other integration tests (flaky tests). We need a deterministic chaos toggle for rigid CI testing.

### Minor
- **Frontend Error Boundaries**: In `frontend/App.tsx`, we have a basic `try/catch` around the `fetch` API. However, if the server returns 200 with structurally invalid data (corrupted strings instead of integers in Chaos Mode), the frontend will render them instead of crashing cleanly or showing an error box.

### Nit
- The `.github/workflows/test.yml` assumes standard `npm install`. Expo might prefer `npx expo install` for peer dependency alignment, though standard `npm ci` will work fine for pure CI builds right now.
