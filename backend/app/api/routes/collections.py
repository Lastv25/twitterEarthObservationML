from app.db.repositories.collections import CollectionsRepository
from fastapi import Depends, APIRouter, HTTPException, Path, Body, status
from app.models.collections import CollectionCreate, CollectionPublic, ListCollections
from app.api.dependencies.auth import get_current_active_user
from app.api.dependencies.database import get_repository
from app.models.user import UserInDB
from starlette.status import HTTP_201_CREATED

router = APIRouter()

@router.get("/", response_model=ListCollections, name="collections:get-collection-all")
async def get_collections_all():
    pass


@router.get("/{user-id}/", response_model=ListCollections, name="collections:get-all-collections-for-user")
async def get_collections_by_user_id(
    current_user: UserInDB = Depends(get_current_active_user),
    collection_repo: CollectionsRepository = Depends(get_repository(CollectionsRepository))
) -> ListCollections:
    user_collections = await collection_repo.get_all_collections_by_user_id(requesting_user=current_user)
    return user_collections

@router.get("/{user-id}/{collection-id}/", response_model=CollectionPublic, name="collections:get-collection-for-user-by-id")
async def get_collections_by_id():
    pass

@router.post("/{user-id}/", response_model=CollectionPublic, name="collections:create-collection-for-user", status_code=HTTP_201_CREATED)
async def create_new_collection_for_user(
    current_user: UserInDB = Depends(get_current_active_user),
    new_collection: CollectionCreate = Body(..., embed=True),
    collection_repo: CollectionsRepository = Depends(get_repository(CollectionsRepository))
) -> CollectionPublic:
    created_collection = await collection_repo.create_collection_for_user(collection_create=new_collection, requesting_user=current_user)
    return created_collection

@router.put("/{user-id}/{collection-id}", response_model=CollectionPublic, name="collections:update-collection-for-user-by-id")
async def update_collections_for_user_by_id():
    pass

@router.delete("/{user-id}/{collection-id}", response_model=CollectionPublic, name="collections:delete-collection-for-user-by-id")
async def update_collections_for_user_by_id():
    pass