from app.db.repositories.base import BaseRepository
from app.models.profile import ProfileCreate, ProfileUpdate, ProfileInDB
from app.models.user import UserInDB
from app.models.collections import CollectionCreate, CollectionInDB, ListCollections


CREATE_COLLECTION_FOR_USER_QUERY = """
    INSERT INTO collections (full_name, disaster, notification, aoi,parameters, user_id)
    VALUES (:full_name, :disaster, :notification, :aoi,:parameters, :user_id)
    RETURNING id, full_name, disaster, notification, aoi,parameters, user_id, created_at, updated_at;
"""
GET_ALL_COLLECTIONS_BY_USER_ID_QUERY = """
    SELECT id, full_name, disaster, notification, aoi, parameters, user_id, created_at, updated_at
    FROM collections
    WHERE user_id = :user_id;
"""


class CollectionsRepository(BaseRepository):

    async def create_collection_for_user(self, *, collection_create: CollectionCreate, requesting_user: UserInDB) -> CollectionInDB:
        created_collection = await self.db.fetch_one(query=CREATE_COLLECTION_FOR_USER_QUERY, values={**collection_create.dict(), "user_id": requesting_user.id})
        return CollectionInDB(**created_collection)

    async def get_all_collections_by_user_id(self, *, user_id: int) -> ListCollections:
        collections_records = await self.db.fetch_one(query=GET_ALL_COLLECTIONS_BY_USER_ID_QUERY, values={"user_id": user_id})
        if not collections_records:
            return None
        return ListCollections(**collections_records)