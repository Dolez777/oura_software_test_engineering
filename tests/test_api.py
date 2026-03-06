import pytest
import requests
import threading
import time
import uvicorn
from backend.mock_api import app

BASE_URL = "http://127.0.0.1:8000"

def run_server():
    uvicorn.run(app, host="0.0.0.0", port=8000, log_level="critical")

@pytest.fixture(scope="session", autouse=True)
def start_server():
    """Start the FastAPI mock server in a background thread before tests."""
    server_thread = threading.Thread(target=run_server, daemon=True)
    server_thread.start()
    
    # Wait for server to start
    for _ in range(10):
        try:
            res = requests.get(f"{BASE_URL}/docs")
            if res.status_code == 200:
                break
        except requests.ConnectionError:
            time.sleep(0.5)
            
    yield

def test_sleep_endpoint_schema():
    """Validates the standard JSON schema for sleep data."""
    response = requests.get(f"{BASE_URL}/api/v2/usercollection/sleep")
    assert response.status_code == 200
    data = response.json()
    assert "score" in data
    assert "status" in data
    assert isinstance(data["score"], int)

def test_activity_endpoint_schema():
    """Validates the standard JSON schema for activity data."""
    response = requests.get(f"{BASE_URL}/api/v2/usercollection/activity")
    assert response.status_code == 200
    data = response.json()
    assert "score" in data
    assert "status" in data
    assert isinstance(data["score"], int)

def test_readiness_endpoint_schema():
    """Validates the standard JSON schema for readiness data."""
    response = requests.get(f"{BASE_URL}/api/v2/usercollection/readiness")
    assert response.status_code == 200
    data = response.json()
    assert "score" in data
    assert "status" in data
    assert isinstance(data["score"], int)

def test_chaos_mode():
    """
    Tests the chaos mode. We'll make multiple requests and expect 
    at least one failure or corrupted schema payload.
    """
    failures: int = 0
    corruptions: int = 0
    
    for _ in range(10):
        response = requests.get(f"{BASE_URL}/api/v2/usercollection/sleep?chaos=true")
        if response.status_code == 500:
            failures += 1  # type: ignore
        elif response.status_code == 200:
            data = response.json()
            if data.get("score") is None or data.get("score") == -9999 or data.get("status") == "CORRUPTED_STRING_&*^":
                corruptions += 1  # type: ignore
                
    # If chaos mode is working, we should see some failures or corruptions
    assert failures > 0 or corruptions > 0, "Chaos mode did not inject any errors!"
