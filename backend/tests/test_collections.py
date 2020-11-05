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
        res = await client.get(app.url_path_for("collections:get-collection-all"))
        assert res.status_code != status.HTTP_404_NOT_FOUND