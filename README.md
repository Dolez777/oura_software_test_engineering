# 💍 Oura Ring Software Test Engineering Clone & Automation Suite

<p align="center">
  <i>A purpose-built Software Test Engineering portfolio project demonstrating Full-Stack QA Automation, Chaos Engineering, and CI/CD pipelines for mobile health applications.</i>
</p>

---

## 🎯 Overview

This repository houses a simulated health-wearable application ecosystem. It was explicitly designed from the ground up to showcase modern **Software Test Engineering (STE)** principles. Rather than just building a functional app, the objective of this project is to build a highly testable system and thoroughly validate its integrity under stress.

The architecture mimics a simplified version of the Oura ecosystem:
1. **Frontend:** A React Native (Expo) mobile dashboard with premium dark-mode aesthetics displaying Sleep, Activity, and Readiness scores.
2. **Backend:** A Python FastAPI server providing dynamic mocked biometric data.
3. **Testing Infrastructure:** A robust suite including Pytest API validation, Appium UI automation, static type checking (Pyre), and an automated GitHub Actions pipeline.

## 🛠️ Core Technologies

*   **Mobile Frontend:** React Native, Expo, TypeScript
*   **Backend Services:** Python 3.11, FastAPI, Uvicorn
*   **Test Environment:** Pytest, Pytest-HTML, Appium (UI Automation)
*   **Static Analysis:** Pyre (Strict Type Checking)
*   **CI/CD:** GitHub Actions

## ✨ Key STE Features

### 1. "Chaos Mode" Fault Injection API
To test the resilience of the mobile application and the rigor of the test suite, the FastAPI backend includes a bespoke `Chaos Mode`. When activated, it stochastically introduces:
*   Malformed JSON payloads.
*   HTTP 500 Internal Server Errors.
*   Simulated high-latency packet drops.
This forces the automation suite to validate error boundaries and frontend recovery mechanisms, not just the "happy path."

### 2. Design for Testability (DFT)
The React Native frontend is built with strict DFT principles:
*   Every interactive component, screen, and text node is annotated with `testID` and `accessibilityLabel`.
*   This ensures deterministic selector querying for Appium UI automation, drastically reducing E2E test flakiness.

### 3. Automated Validation Pipelines
The project features a comprehensive `.github/workflows/test.yml` GitHub Actions pipeline that:
*   Configures a dual-runtime environment (Node.js & Python).
*   Executes Pyre static analysis to catch type regressions.
*   Runs the Pytest API automation suite against schema validations.
*   Generates and stores comprehensive `pytest-html` reports as pipeline artifacts.

## 🚀 Getting Started

### Prerequisites
*   Node.js (v20+)
*   Python (3.11+)
*   Expo CLI (`npm install -g expo-cli`)

### Installation & Execution

**1. Start the Backend API**
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python run_backend.py
```
*(The backend runs on `http://localhost:8000`)*

**2. Start the Frontend Application**
```bash
cd frontend
npm install
npx expo start
```
*(Use the Expo Go app on iOS/Android or an emulator to launch the dashboard)*

**3. Run the Automation Suite**
```bash
# Ensure the backend is running first
pytest tests/ -v --html=report.html --self-contained-html
```

## 🐛 Bug Tracking & Issue Management
Real-world STE involves rigorous bug documentation. See `BUG_REPORTS.md` for examples of deeply investigated issues (e.g., RNG seed flakiness, Pyre static analysis limitations, and Android ADB Reverse networking blockers), including root cause analysis and reproduction steps.

## 🔮 Future Roadmap
- [ ] Connect `tests/test_ui_structure.py` Appium scripts to a cloud device provider (e.g., AWS Device Farm) for multi-device regression.
- [ ] Implement strict Zod schema validation on the React Native payload consumption.
- [ ] Stabilize the Chaos Mode integration tests using deterministic RNG seed overriding.

---
*Created by a Software Test Engineering candidate aiming to ensure the highest quality standards for wearable health technology.*
