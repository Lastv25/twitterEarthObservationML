import pytest
from databases import Database
from fastapi import FastAPI, status
from httpx import AsyncClient
from app.models.user import UserInDB

pytestmark = pytest.mark.asyncio

class TestProfilesRoutes:
    """
    Ensure that no api route returns a 404
    """
    async def test_routes_exist(self, app: FastAPI, client: AsyncClient, test_user: UserInDB) -> None:
        # Get collections by username
        res = await client.get(app.url_path_for("collections:get-collection-by-id", username=test_user.username))
        assert res.status_code != status.HTTP_404_NOT_FOUND
        # Update own collection by id
        res = await client.put(app.url_path_for("profiles:update-own-collection-by-id"), json={"collection_udpate": {}})
        assert res.status_code != status.HTTP_404_NOT_FOUND