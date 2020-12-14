from app.db.repositories.base import BaseRepository
from app.models.user import UserInDB
from app.models.collections import CollectionCreate, CollectionInDB, CollectionUpdate
from typing import List
from fastapi import HTTPException, status

CREATE_COLLECTION_FOR_USER_QUERY = """
    INSERT INTO collections (full_name, disaster, notification, aoi,parameters, user_id)
    VALUES (:full_name, :disaster, :notification, ST_GeomFromGeoJSON(:aoi),:parameters, :user_id)
    RETURNING id, full_name, disaster, notification, ST_AsGeoJSON(aoi) as aoi, parameters, user_id, created_at, updated_at;
"""
GET_COLLECTION_BY_ID_QUERY = """
    SELECT id, full_name, disaster, notification,  ST_AsGeoJSON(aoi) as aoi, parameters::json, user_id, created_at, updated_at
    FROM collections
    WHERE deleted= false AND id = :id;
"""
LIST_ALL_USER_COLLECTIONS_QUERY = """
    SELECT id, full_name, disaster, notification, ST_AsGeoJSON(aoi) as aoi, parameters::json, user_id, created_at, updated_at
    FROM collections
    WHERE deleted= false AND user_id = :user_id;
"""
UPDATE_COLLECTION_BY_ID_QUERY = """
    UPDATE collections
    SET full_name         = :full_name,
        disaster  = :disaster,
        notification        = :notification,
        aoi = :aoi,
        parameters = :parameters
    WHERE id = :id AND user_id = :user_id
    RETURNING id, full_name, disaster, notification, aoi,parameters, user_id, created_at, updated_at;
"""
DELETE_COLLECTION_BY_ID_QUERY = """
    DELETE FROM collections
    WHERE id = :id AND user_id = :user_id
    RETURNING id;
"""
UPDATE_DELETED_COLLECTION_FIELD_BY_ID_QUERY = """
    UPDATE collections
    SET deleted = true
    WHERE id = :id AND user_id = :user_id
    RETURNING id;
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

    async def update_collection(
            self, *, id: int, collection_update: CollectionUpdate, requesting_user: UserInDB
    ) -> CollectionInDB:
        collection = await self.get_collection_by_id(id=id, requesting_user=requesting_user)
        if not collection:
            return None
        if collection.user_id != requesting_user.id:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Users are only able to update collections that they created.",
            )
        collection_update_params = collection.copy(update=collection_update.dict(exclude_unset=True))
        # if collection_update_params.collection_type is None:
        #     raise HTTPException(
        #         status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid collection type. Cannot be None."
        #     )
        updated_collection = await self.db.fetch_one(
            query=UPDATE_COLLECTION_BY_ID_QUERY,
            values={
                **collection_update_params.dict(exclude={"created_at", "updated_at"}),
                "user_id": requesting_user.id,
            },
        )
        return CollectionInDB(**updated_collection)

    async def delete_collection_by_id(self, *, id: int, requesting_user: UserInDB) -> int:
        collection = await self.get_collection_by_id(id=id, requesting_user=requesting_user)
        if not collection:
            return None
        if collection.user_id != requesting_user.id:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Users are only able to delete collections that they created.",
            )
        deleted_id = await self.db.execute(
            query=DELETE_COLLECTION_BY_ID_QUERY, values={"id": id, "user_id": requesting_user.id}
        )
        return deleted_id

    async def update_delete_collection_field_by_id(self, *, id: int, requesting_user: UserInDB) -> int:
        collection = await self.get_collection_by_id(id=id, requesting_user=requesting_user)
        if not collection:
            return None
        if collection.user_id != requesting_user.id:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Users are only able to delete collections that they created.",
            )
        deleted_id = await self.db.execute(
            query=UPDATE_DELETED_COLLECTION_FIELD_BY_ID_QUERY, values={"id": id, "user_id": requesting_user.id}
        )
        return deleted_id
