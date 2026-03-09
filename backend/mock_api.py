import random
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional

app = FastAPI(title="Health & Sleep Tracker Mock API")

# Enable CORS for the local React Native app
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class HealthData(BaseModel):
    score: Optional[int]
    status: Optional[str]


def generate_chaos(data: dict, forced_type: Optional[str] = None) -> dict:
    """Randomly injects corrupted data, nulls, or raises 500 errors."""
    chaos_type = (
        forced_type
        if forced_type
        else random.choice(["500", "null", "corrupt", "fine", "fine"])
    )

    if chaos_type == "500":
        raise HTTPException(
            status_code=500, detail="Internal Server Error (Chaos Mode)"
        )
    elif chaos_type == "null":
        for key in data.keys():
            if random.random() > 0.5:
                data[key] = None
    elif chaos_type == "corrupt":
        for key in data.keys():
            if isinstance(data[key], int):
                data[key] = -9999
            elif isinstance(data[key], str):
                data[key] = "CORRUPTED_STRING_&*^"

    return data


@app.get("/api/v2/usercollection/sleep", response_model=HealthData)
async def get_sleep(chaos: bool = False, chaos_type: Optional[str] = None):
    data = {"score": random.randint(60, 95), "status": "Good"}
    if chaos:
        data = generate_chaos(data, chaos_type)
    return data


@app.get("/api/v2/usercollection/activity", response_model=HealthData)
async def get_activity(chaos: bool = False, chaos_type: Optional[str] = None):
    data = {"score": random.randint(50, 100), "status": "Active"}
    if chaos:
        data = generate_chaos(data, chaos_type)
    return data


@app.get("/api/v2/usercollection/readiness", response_model=HealthData)
async def get_readiness(chaos: bool = False, chaos_type: Optional[str] = None):
    data = {"score": random.randint(65, 99), "status": "Optimal"}
    if chaos:
        data = generate_chaos(data, chaos_type)
    return data
