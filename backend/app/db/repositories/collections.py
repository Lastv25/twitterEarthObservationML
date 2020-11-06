from app.db.repositories.base import BaseRepository
from app.models.profile import ProfileCreate, ProfileUpdate, ProfileInDB
from app.models.user import UserInDB
from app.models.collections import CollectionCreate, CollectionInDB


CREATE_COLLECTION_FOR_USER_QUERY = """
    INSERT INTO collections (full_name, disaster, notification, aoi,parameters, user_id)
    VALUES (:full_name, :disaster, :notification, :aoi,parameters, :user_id)
    RETURNING id, full_name, disaster, notification, aoi,parameters, user_id, created_at, updated_at;
"""



class CollectionsRepository(BaseRepository):

    async def create_collection_for_user(self, *, collection_create: CollectionCreate) -> CollectionInDB:
        created_collection = await self.db.fetch_one(query=CREATE_COLLECTION_FOR_USER_QUERY, values=collection_create.dict())
        return created_collection