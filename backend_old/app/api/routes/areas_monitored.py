from typing import List
from fastapi import APIRouter



router = APIRouter()


@router.get("/")
async def get_all_areas() -> List[dict]:
    areas = [
        {"id": 1, "user_id": "010101", "coordinates": "polygon", "notifications": True},
        {"id": 2, "user_id": "2040750", "coordinates": "polygon", "notifications": False}
    ]
    return areas