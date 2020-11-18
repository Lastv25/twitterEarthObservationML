from app.db.repositories.collections import CollectionsRepository
from fastapi import Depends, APIRouter, HTTPException, Path, Body, status
from app.models.collections import CollectionCreate, CollectionPublic, CollectionInDB, CollectionUpdate
from app.api.dependencies.auth import get_current_active_user
from app.api.dependencies.database import get_repository
from app.models.user import UserInDB
from starlette.status import HTTP_201_CREATED
from typing import List

from app.api.dependencies.collections import get_collections_by_id_from_path

router = APIRouter()


@router.get("/me/", response_model=List[CollectionPublic], name="collections:get-all-collections-for-user")
async def list_all_user_collections(
    current_user: UserInDB = Depends(get_current_active_user),
    collection_repo: CollectionsRepository = Depends(get_repository(CollectionsRepository)),
) -> List[CollectionPublic]:
    return await collection_repo.list_all_user_collections(requesting_user=current_user)

@router.get("/me/{collection_id}/", response_model=CollectionPublic, name="collections:get-collection-for-user-by-id")
async def get_collections_by_id(
    collection_id: int = Path(..., ge=1),
    current_user: UserInDB = Depends(get_current_active_user),
    collections_repo: CollectionsRepository = Depends(get_repository(CollectionsRepository)),
) -> CollectionPublic:
    collection = await collections_repo.get_collection_by_id(id=collection_id, requesting_user=current_user)
    if not collection:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="No collection found with that id.")
    return collection

@router.post("/me/", response_model=CollectionPublic, name="collections:create-collection-for-user", status_code=HTTP_201_CREATED)
async def create_new_collection_for_user(
    current_user: UserInDB = Depends(get_current_active_user),
    new_collection: CollectionCreate = Body(..., embed=True),
    collection_repo: CollectionsRepository = Depends(get_repository(CollectionsRepository))
) -> CollectionPublic:
    created_collection = await collection_repo.create_collection_for_user(collection_create=new_collection, requesting_user=current_user)
    return created_collection

@router.put("/me/{collection_id}", response_model=CollectionPublic, name="collections:update-collection-for-user-by-id")
async def update_cleaning_by_id(
    collection_id: int = Path(..., ge=1),
    current_user: UserInDB = Depends(get_current_active_user),
    collection_update: CollectionUpdate = Body(..., embed=True),
    collection_repo: CollectionsRepository = Depends(get_repository(CollectionsRepository)),
) -> CollectionPublic:
    updated_collection = await collection_repo.update_collection(
        id=collection_id, collection_update=collection_update, requesting_user=current_user
    )
    if not updated_collection:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="No collction found with that id.")
    return updated_collection


@router.delete("/me/{collection_id}", response_model=int, name="collections:delete-collection-for-user-by-id")
async def delete_collection_by_id(
    collection_id: int = Path(..., ge=1),
    current_user: UserInDB = Depends(get_current_active_user),
    collection_repo: CollectionsRepository = Depends(get_repository(CollectionsRepository)),
) -> int:
    deleted_id = await collection_repo.delete_collection_by_id(id=collection_id, requesting_user=current_user)
    if not deleted_id:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="No cleaning found with that id.")
    return deleted_id
