from app.db.repositories.collections import CollectionsRepository
from fastapi import Depends, APIRouter, HTTPException, Path, Body, status
from app.models.collections import CollectionPublic

router = APIRouter()

@router.get("/", response_model=CollectionPublic, name="collections:get-collection-all")
async def get_collectios_all():
    pass

