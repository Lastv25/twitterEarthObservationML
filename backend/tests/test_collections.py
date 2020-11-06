import pytest
from databases import Database
from fastapi import FastAPI, status
from httpx import AsyncClient
from app.models.user import UserInDB

from app.db.repositories.collections import CollectionsRepository
from app.models.collections import CollectionPublic, CollectionCreate, CollectionInDB

from typing import Dict,Union, List

pytestmark = pytest.mark.asyncio

@pytest.fixture
def new_collection():
    return CollectionCreate(
        full_name="test",
        disaster="hello",
        notification=False,
        aoi="POLYGON((0 0, 1 0, 1 1, 0 1, 0 0))",
        parameters="paramfun",
    )

@pytest.fixture
async def test_collection_list(db: Database, test_user2: UserInDB) -> List[CollectionInDB]:
    collection_repo = CollectionsRepository(db)
    return [
        await collection_repo.create_collection_for_user(
            collection_create=CollectionCreate(
        full_name=f"test {i}",
        disaster="hello",
        notification=False,
        aoi="POLYGON((0 0, 1 0, 1 1, 0 1, 0 0))",
        parameters="paramfun",
        ),
            requesting_user=test_user2,
        )
        for i in range(5)
    ]


class TestCollectionsRoutes:
    """
    Ensure that no api route returns a 404
    """
    async def test_routes_exist(self, app: FastAPI, client: AsyncClient, test_user: UserInDB) -> None:
        # Get All collections
        res_get_all = await client.get(app.url_path_for("collections:get-collection-all"))
        assert res_get_all.status_code != status.HTTP_404_NOT_FOUND
        # Get All collections for a user
        res_get_all_user = await client.get(app.url_path_for("collections:get-all-collections-for-user"))
        assert res_get_all_user.status_code != status.HTTP_404_NOT_FOUND
        # Get a collection for a user by collection id
        res_get_user_collec = await client.get(app.url_path_for("collections:get-collection-for-user-by-id"))
        assert res_get_user_collec.status_code != status.HTTP_404_NOT_FOUND
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
    async def test_collection_created_for_user(
            self, app: FastAPI, authorized_client: AsyncClient, test_user: UserInDB, new_collection: CollectionCreate
    ) -> None:
        res = await authorized_client.post(
            app.url_path_for("collections:create-collection-for-user"), json={"new_collection": new_collection.dict()}
        )
        assert res.status_code == status.HTTP_201_CREATED
        created_collection = CollectionPublic(**res.json())
        assert created_collection.full_name == new_collection.full_name
        assert created_collection.disaster == new_collection.disaster
        assert created_collection.notification == new_collection.notification
        assert created_collection.parameters == new_collection.parameters

    async def test_unauthorized_user_unable_to_create_cleaning(
            self, app: FastAPI, client: AsyncClient, new_collection: CollectionCreate
        ) -> None:
            res = await client.post(
                app.url_path_for("collections:create-collection-for-user"), json={"new_collection": new_collection.dict()}
            )
            assert res.status_code == status.HTTP_401_UNAUTHORIZED


class TestCollectionGetters:
    async def test_get_all_collections_returns_only_user_owned_collections(
        self,
        app: FastAPI,
        authorized_client: AsyncClient,
        test_user: UserInDB,
        db: Database,
        test_collection: CollectionInDB,
        test_collection_list: List[CollectionInDB],
    ) -> None:
        res = await authorized_client.get(app.url_path_for("collections:get-all-collections-for-user"))
        assert res.status_code == status.HTTP_200_OK
        assert isinstance(res.json(), list)
        assert len(res.json()) > 0
        collections = [CollectionInDB(**l) for l in res.json()]
        # check that a collections created by our user is returned
        assert test_collection in collections
        # test that all collections returned are owned by this user
        for collection in collections:
            assert collection.user_id == test_user.id
        # assert all collections created by another user not included (redundant, but fine)
        assert all(c not in collections for c in test_collection_list)
