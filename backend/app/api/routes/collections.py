from app.db.repositories.collections import CollectionsRepository
from fastapi import Depends, APIRouter, HTTPException, Path, Body, status
from app.models.collections import CollectionPublic

router = APIRouter()

@router.get("/", response_model=CollectionPublic, name="collections:get-collection-all")
async def get_collections_all():
    pass

@router.get("/{id}/", response_model=CollectionPublic, name="collections:get-collection-by-id")
async def get_collections_by_id():
    pass

@router.get("/{user-id}/", response_model=CollectionPublic, name="collections:get-collection-by-user-id")
async def get_collections_by_user_id():
    pass


@router.put("/{user-id}/", response_model=CollectionPublic, name="collections:create-collection-for-user")
async def create_new_collection_for_user():
    pass