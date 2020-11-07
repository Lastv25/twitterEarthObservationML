from app.db.repositories.collections import CollectionsRepository
from fastapi import Depends, APIRouter, HTTPException, Path, Body, status
from app.models.collections import CollectionCreate, CollectionPublic, CollectionInDB
from app.api.dependencies.auth import get_current_active_user
from app.api.dependencies.database import get_repository
from app.models.user import UserInDB
from starlette.status import HTTP_201_CREATED
from typing import List

from app.api.dependencies.collections import get_collections_by_id_from_path

router = APIRouter()


@router.get("/{user-id}/", response_model=List[CollectionPublic], name="collections:get-all-collections-for-user")
async def list_all_user_collections(
    current_user: UserInDB = Depends(get_current_active_user),
    collection_repo: CollectionsRepository = Depends(get_repository(CollectionsRepository)),
) -> List[CollectionPublic]:
    return await collection_repo.list_all_user_collections(requesting_user=current_user)

@router.get("/{user-id}/{collection_id}/", response_model=CollectionPublic, name="collections:get-collection-for-user-by-id")
async def get_collections_by_id(
    collection_id: int = Path(..., ge=1),
    current_user: UserInDB = Depends(get_current_active_user),
    collections_repo: CollectionsRepository = Depends(get_repository(CollectionsRepository)),
) -> CollectionPublic:
    collection = await collections_repo.get_collection_by_id(id=collection_id, requesting_user=current_user)
    if not collection:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="No collection found with that id.")
    return collection

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