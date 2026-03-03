import uvicorn
from backend.mock_api import app

if __name__ == "__main__":
    print("Starting Health & Sleep Tracker Mock API...")
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)
