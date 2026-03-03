import uvicorn
# Removed direct import of app to avoid uvicorn reload warnings

if __name__ == "__main__":
    print("Starting Health & Sleep Tracker Mock API...")
    uvicorn.run("backend.mock_api:app", host="0.0.0.0", port=8000, reload=True)
