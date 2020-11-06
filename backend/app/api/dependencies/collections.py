from fastapi import HTTPException, Depends, Path, status
from app.models.user import UserInDB
from app.models.collections import CollectionPublic
from app.db.repositories.collections import CollectionsRepository
from app.api.dependencies.database import get_repository
from app.api.dependencies.auth import get_current_active_user



async def get_collections_by_id_from_path(
    collection_id: int = Path(..., ge=1),
    current_user: UserInDB = Depends(get_current_active_user),
    collection_repo: CollectionsRepository = Depends(get_repository(CollectionsRepository)),
) -> CollectionPublic:
    collection = await collection_repo.get_cleaning_by_id(id=collection_id, requesting_user=current_user)
    if not collection:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="No collection found with that id.",
        )
    return collection