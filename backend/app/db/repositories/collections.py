from app.db.repositories.base import BaseRepository
from app.models.profile import ProfileCreate, ProfileUpdate, ProfileInDB
from app.models.user import UserInDB
from app.models.collections import CollectionCreate, CollectionInDB
from typing import List

CREATE_COLLECTION_FOR_USER_QUERY = """
    INSERT INTO collections (full_name, disaster, notification, aoi,parameters, user_id)
    VALUES (:full_name, :disaster, :notification, :aoi,:parameters, :user_id)
    RETURNING id, full_name, disaster, notification, aoi,parameters, user_id, created_at, updated_at;
"""
GET_COLLECTION_BY_ID_QUERY = """
    SELECT id, full_name, disaster, notification, aoi, parameters, user_id, created_at, updated_at
    FROM collections
    WHERE id = :id;
"""
LIST_ALL_USER_COLLECTIONS_QUERY = """
    SELECT id, full_name, disaster, notification, aoi, parameters, user_id, created_at, updated_at
    FROM collections
    WHERE user_id = :user_id;
"""
UPDATE_CLEANING_BY_ID_QUERY = """
    UPDATE collections
    SET full_name         = :full_name,
        disaster  = :disaster,
        notification        = :notification,
        aoi = :aoi
        parameters = :parameters
    WHERE id = :id AND user_id = :user_id
    RETURNING id, full_name, disaster, notification, aoi,parameters, user_id, created_at, updated_at;
"""

class CollectionsRepository(BaseRepository):

    async def create_collection_for_user(self, *, collection_create: CollectionCreate, requesting_user: UserInDB) -> CollectionInDB:
        created_collection = await self.db.fetch_one(query=CREATE_COLLECTION_FOR_USER_QUERY, values={**collection_create.dict(), "user_id": requesting_user.id})
        return CollectionInDB(**created_collection)

    async def get_collection_by_id(self, *, id: int, requesting_user: UserInDB) -> CollectionInDB:
        # the request user parameter is asked for consistency
        collection = await self.db.fetch_one(query=GET_COLLECTION_BY_ID_QUERY, values={"id": id})
        if not collection:
            return None
        return CollectionInDB(**collection)

    async def list_all_user_collections(self, requesting_user: UserInDB) -> List[CollectionInDB]:
        cleaning_records = await self.db.fetch_all(
            query=LIST_ALL_USER_COLLECTIONS_QUERY, values={"user_id": requesting_user.id}
        )
        return [CollectionInDB(**l) for l in cleaning_records]