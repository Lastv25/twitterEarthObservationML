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
        # Put new collection
        res_create_new = await client.put(app.url_path_for("collections:create-collection-for-user"))
        assert res_create_new.status_code != status.HTTP_404_NOT_FOUND


class TestCollectionCreate:
    async def test_collection_created_for_user(self, app: FastAPI, client: AsyncClient, db: Database) -> None:
        collection_repo = CollectionsRepository(db)
        new_collection = {"full_name": "test_collection", "disaster": "wildfire", "user_id": "1"}
        res = await client.post(app.url_path_for("users:register-new-user"), json={"new_collection": new_collection})
        assert res.status_code == status.HTTP_201_CREATED
        # created_user = UserPublic(**res.json())
        # user_profile = await profile_repo.get_profile_by_user_id(user_id=created_user.id)
        # assert user_profile is not None
        # assert isinstance(user_profile, ProfileInDB)