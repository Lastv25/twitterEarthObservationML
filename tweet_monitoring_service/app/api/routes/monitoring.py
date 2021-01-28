from typing import List
from fastapi import APIRouter

router = APIRouter()


@router.post("/")
async def post_event_tweets() -> List[dict]:
    tweets = [
        {"id": 1, "disaster": "My house", "text": "full_clean", "location": 29.99}
    ]
    return tweets
