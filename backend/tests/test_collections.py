import pytest
from databases import Database
from fastapi import FastAPI, status
from httpx import AsyncClient
from app.models.user import UserInDB

from app.db.repositories.collections import CollectionsRepository
from app.models.collections import CollectionPublic, CollectionCreate, CollectionInDB

from typing import Dict,Union, List, Optional

pytestmark = pytest.mark.asyncio

@pytest.fixture
def new_collection():
    return CollectionCreate(
        full_name="test",
        disaster="hello",
        notification=False,
        aoi='{ "type": "Polygon","coordinates": [[ [100.0, 0.0], [101.0, 0.0], [101.0, 1.0], [100.0, 1.0], [100.0, 0.0] ]]}',
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
        aoi='{ "type": "Polygon","coordinates": [[ [100.0, 0.0], [101.0, 0.0], [101.0, 1.0], [100.0, 1.0], [100.0, 0.0] ]]}',
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
        # Get All collections for a user
        res_get_all_user = await client.get(app.url_path_for("collections:get-all-collections-for-user"))
        assert res_get_all_user.status_code != status.HTTP_404_NOT_FOUND
        # Get a collection for a user by collection id
        res_get_user_collec = await client.get(app.url_path_for("collections:get-collection-for-user-by-id", collection_id=1))
        assert res_get_user_collec.status_code != status.HTTP_404_NOT_FOUND
        # Post new collection
        res_create_new = await client.put(app.url_path_for("collections:create-collection-for-user"))
        assert res_create_new.status_code != status.HTTP_404_NOT_FOUND
        # Put new parameters for collection
        res_update = await client.put(app.url_path_for("collections:update-collection-for-user-by-id", collection_id=1))
        assert res_update.status_code != status.HTTP_404_NOT_FOUND
        # Delete collection
        res_update = await client.put(app.url_path_for("collections:delete-collection-for-user-by-id", collection_id=1))
        assert res_update.status_code != status.HTTP_404_NOT_FOUND
        # Post delete id collection
        res_update = await client.put(app.url_path_for("collections:post-delete-collection-for-user-by-id", collection_id=1))
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

    async def test_unauthorized_user_unable_to_create_collection(
            self, app: FastAPI, client: AsyncClient, new_collection: CollectionCreate
        ) -> None:
            res = await client.post(
                app.url_path_for("collections:create-collection-for-user"), json={"new_collection": new_collection.dict()}
            )
            assert res.status_code == status.HTTP_401_UNAUTHORIZED


class TestCollectionGetters:
    async def test_get_collection_by_id(
        self, app: FastAPI, authorized_client: AsyncClient, test_collection: CollectionInDB
    ) -> None:
        res = await authorized_client.get(app.url_path_for("collections:get-collection-for-user-by-id", collection_id=test_collection.id))
        assert res.status_code == status.HTTP_200_OK
        collection = CollectionInDB(**res.json())
        assert collection == test_collection
    async def test_unauthorized_users_cant_access_collection(
        self, app: FastAPI, client: AsyncClient, test_collection: CollectionInDB
    ) -> None:
        res = await client.get(app.url_path_for("collections:get-collection-for-user-by-id", collection_id=test_collection.id))
        assert res.status_code == status.HTTP_401_UNAUTHORIZED
    @pytest.mark.parametrize(
        "id, status_code", ((50000, 404), (-1, 422), (None, 422)),
    )
    async def test_wrong_id_returns_error(
        self, app: FastAPI, authorized_client: AsyncClient, id: int, status_code: int
    ) -> None:
        res = await authorized_client.get(app.url_path_for("collections:get-collection-for-user-by-id", collection_id=id))
        assert res.status_code == status_code
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


class TestUpdateCollection:
    @pytest.mark.parametrize(
        "attrs_to_change, values",
        (
            (["full_name"], ["new fake collection name"]),
            (["disaster"], ["new fake collection description"]),
            (["notification"], [True]),
            (["aoi"], ['{ "type": "Polygon","coordinates": [[ [100.0, 0.0], [101.0, 0.0], [101.0, 1.0], [100.0, 1.0], [100.0, 0.0] ]]}']),
            (["parameters"], ["extra new fake collection description"]),
            (["full_name", "disaster"], ["extra new fake collection description", "dust_up"]),
        ),
    )
    async def test_update_collection_with_valid_input(
        self,
        app: FastAPI,
        authorized_client: AsyncClient,
        test_collection: CollectionInDB,
        attrs_to_change: List[str],
        values: List[str],
    ) -> None:
        collection_update = {"collection_update": {attrs_to_change[i]: values[i] for i in range(len(attrs_to_change))}}
        res = await authorized_client.put(
            app.url_path_for("collections:update-collection-for-user-by-id", collection_id=test_collection.id), json=collection_update
        )
        assert res.status_code == status.HTTP_200_OK
        updated_collection = CollectionInDB(**res.json())
        assert updated_collection.id == test_collection.id  # make sure it's the same collection
        # make sure that any attribute we updated has changed to the correct value
        for i in range(len(attrs_to_change)):
            assert getattr(updated_collection, attrs_to_change[i]) != getattr(test_collection, attrs_to_change[i])

        # make sure that no other attributes' values have changed
        for attr, value in updated_collection.dict().items():
            if attr not in attrs_to_change and attr != "updated_at":
                assert getattr(test_collection, attr) == value
    async def test_user_recieves_error_if_updating_other_users_collection(
        self, app: FastAPI, authorized_client: AsyncClient, test_collection_list: List[CollectionInDB],
    ) -> None:
        res = await authorized_client.put(
            app.url_path_for("collections:update-collection-for-user-by-id", collection_id=test_collection_list[0].id),
            json={"collection_update": {"full_name": 'changing another user collection name'}},
        )
        assert res.status_code == status.HTTP_403_FORBIDDEN
    async def test_user_cant_change_ownership_of_collection(
        self,
        app: FastAPI,
        authorized_client: AsyncClient,
        test_collection: CollectionInDB,
        test_user: UserInDB,
        test_user2: UserInDB,
    ) -> None:
        res = await authorized_client.put(
            app.url_path_for("collections:update-collection-for-user-by-id", collection_id=test_collection.id),
            json={"collection_update": {"user_id": test_user2.id}},
        )
        assert res.status_code == status.HTTP_200_OK
        collection = CollectionInDB(**res.json())
        assert collection.user_id == test_user.id
    @pytest.mark.parametrize(
        "id, payload, status_code",
        (
            (-1, {"full_name": "test"}, 422),
            (0, {"full_name": "test2"}, 422),
            (500, {"full_name": "test3"}, 404),
            (1, None, 422),
        ),
    )
    async def test_update_collection_with_invalid_input_throws_error(
        self, app: FastAPI, authorized_client: AsyncClient, id: int, payload: Dict[str, Optional[str]], status_code: int
    ) -> None:
        collection_update = {"collection_update": payload}
        res = await authorized_client.put(
            app.url_path_for("collections:update-collection-for-user-by-id", collection_id=id), json=collection_update
        )
        assert res.status_code == status_code


class TestDeleteCollection:
    async def test_can_delete_collection_successfully(
        self, app: FastAPI, authorized_client: AsyncClient, test_collection: CollectionInDB
    ) -> None:
        res = await authorized_client.delete(
            app.url_path_for("collections:delete-collection-for-user-by-id", collection_id=test_collection.id)
        )
        assert res.status_code == status.HTTP_200_OK
    async def test_user_cant_delete_other_users_collection(
        self, app: FastAPI, authorized_client: AsyncClient, test_collection_list: List[CollectionInDB],
    ) -> None:
        res = await authorized_client.delete(
            app.url_path_for("collections:delete-collection-for-user-by-id", collection_id=test_collection_list[0].id)
        )
        assert res.status_code == status.HTTP_403_FORBIDDEN
    @pytest.mark.parametrize(
        "id, status_code", ((5000000, 404), (0, 422), (-1, 422), (None, 422)),
    )
    async def test_wrong_id_throws_error(
        self, app: FastAPI, authorized_client: AsyncClient, test_collection: CollectionInDB, id: int, status_code: int
    ) -> None:
        res = await authorized_client.delete(app.url_path_for("collections:delete-collection-for-user-by-id", collection_id=id))
        assert res.status_code == status_code
