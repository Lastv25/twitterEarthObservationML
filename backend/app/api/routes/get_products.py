from app.db.repositories.collections import CollectionsRepository
from fastapi import Depends, APIRouter, HTTPException, Path, Body, status
from app.models.collections import CollectionCreate, CollectionPublic, CollectionInDB, CollectionUpdate
from app.api.dependencies.auth import get_current_active_user
from app.api.dependencies.database import get_repository
from app.models.user import UserInDB
from starlette.status import HTTP_201_CREATED
from typing import List
import json

router = APIRouter()


@router.get("/products/{collection_id}", response_model=List[str], name="collections:get-products-from-parameter")
async def get_collections_by_id(
    collection_id: int = Path(..., ge=1),

    collection_repo: CollectionsRepository = Depends(get_repository(CollectionsRepository))) -> List[str]:

    collection = await collection_repo.get_collection_by_id(id=collection_id)

    parameters = json.loads(collection.parameters)
    scihub_parameters = parameters['platform']['scihub']
    egeos_parameters = parameters['platform']['egeos']

    return [str(scihub_parameters), str(egeos_parameters)]
