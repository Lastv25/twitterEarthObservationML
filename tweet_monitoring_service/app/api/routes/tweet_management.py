from typing import List
from fastapi import APIRouter

router = APIRouter()


@router.get("/")
async def get_all_tweets() -> List[dict]:
    tweets = [
        {"id": 1, "disaster": "My house", "text": "full_clean", "location": 29.99}
    ]
    return tweets

@router.get("/")
async def get_tweet() -> List[dict]:
    tweets = [
        {"id": 1, "disaster": "My house", "text": "full_clean", "location": 29.99}
    ]
    return tweets

@router.post("/")
async def post_tweet() -> List[dict]:
    tweets = [
        {"id": 1, "disaster": "My house", "text": "full_clean", "location": 29.99}
    ]
    return tweets

@router.put("/")
async def update_tweet() -> List[dict]:
    tweets = [
        {"id": 1, "disaster": "My house", "text": "full_clean", "location": 29.99}
    ]
    return tweets

@router.delete("/")
async def delete_tweet() -> List[dict]:
    tweets = [
        {"id": 1, "disaster": "My house", "text": "full_clean", "location": 29.99}
    ]
    return tweets
