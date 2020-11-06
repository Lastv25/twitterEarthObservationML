import pytest
from databases import Database
from fastapi import FastAPI, status
from httpx import AsyncClient
from app.models.user import UserInDB

from app.db.repositories.collections import CollectionsRepository

pytestmark = pytest.mark.asyncio

class TestCollectionsRoutes:
    """
    Ensure that no api route returns a 404
    """
    async def test_routes_exist(self, app: FastAPI, client: AsyncClient, test_user: UserInDB) -> None:
        # Get All collections
        res_get_all = await client.get(app.url_path_for("collections:get-collection-all"))
        assert res_get_all.status_code != status.HTTP_404_NOT_FOUND
        # Post new collection
        res_create_new = await client.put(app.url_path_for("collections:create-collection-for-user"))
        assert res_create_new.status_code != status.HTTP_404_NOT_FOUND
        # Put new parameters for collection
        res_update = await client.put(app.url_path_for("collections:update-collection-for-user-by-id"))
        assert res_update.status_code != status.HTTP_404_NOT_FOUND
        # Delete collection
        res_update = await client.put(app.url_path_for("collections:delete-collection-for-user-by-id"))
        assert res_update.status_code != status.HTTP_404_NOT_FOUND


class TestCollectionCreate:
    async def test_collection_created_for_user(self, app: FastAPI, client: AsyncClient, db: Database) -> None:
        collection_repo = CollectionsRepository(db)
        new_user = {"email": "dwayne@johnson.io", "username": "therock", "password": "dwaynetherockjohnson"}
        res = await client.post(app.url_path_for("users:register-new-user"), json={"new_user": new_user})
        assert res.status_code == status.HTTP_201_CREATED
        new_collection = {"full_name": "thisisatest", "disaster": "creation"}
        create_collection = await client.post(app.url_path_for("collections:create-collection-for-user"), json={"new_collection": new_collection})
        assert create_collection is not None


# class TestCollectionUpdate:
#     async def test_collection_updated_for_user_by_id(self, app: FastAPI, client: AsyncClient, db: Database) -> None:
#         collection_repo = CollectionsRepository(db)
#         new_user = {"email": "dwayne@johnson.io", "username": "therock", "password": "dwaynetherockjohnson"}
#         res = await client.post(app.url_path_for("users:register-new-user"), json={"new_user": new_user})
#         assert res.status_code == status.HTTP_201_CREATED
#         new_collection = {"full_name": "thisisatest", "disaster": "creation"}
#         create_collection = await client.post(app.url_path_for("collections:update-collection-for-user_by_id"), json={"new_collection": new_collection})
#         assert create_collection is not None