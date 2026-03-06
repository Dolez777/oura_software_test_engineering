# Plan: Fix Type Checker Error in test_api.py

## Goal
Resolve the type checker error where `+=` evaluates as unsupported between `Binding::AugAssign attribute base undefined for type: @_` and `Literal[1]`.

## Risks/Constraints
- Minimal risk; just a type-hinting improvement to help the static analyzer.

## Steps
1. Open `tests/test_api.py`.
2. Add explicit integer type annotations to the `failures` and `corruptions` variables (`failures: int = 0`).
3. Update `MEMORY.md` to reflect this fix.

## Verification
- Run `pytest tests/test_api.py` to ensure it still passes and no static type checker errors remain.
