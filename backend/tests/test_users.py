import pytest
from httpx import AsyncClient
from fastapi import FastAPI
from starlette.status import (
    HTTP_200_OK,
    HTTP_201_CREATED,
    HTTP_400_BAD_REQUEST,
    HTTP_401_UNAUTHORIZED,
    HTTP_404_NOT_FOUND,
    HTTP_422_UNPROCESSABLE_ENTITY,
)
from app.models.user import UserCreate, UserInDB
from typing import List, Union, Type, Optional
import jwt
from pydantic import ValidationError
from starlette.datastructures import Secret

from app.core.config import SECRET_KEY, JWT_ALGORITHM, JWT_AUDIENCE, JWT_TOKEN_PREFIX, ACCESS_TOKEN_EXPIRE_MINUTES
from app.models.token import JWTMeta, JWTCreds, JWTPayload


pytestmark = pytest.mark.asyncio


class TestUserRoutes:
    async def test_routes_exist(self, app: FastAPI, client: AsyncClient) -> None:
        new_user = {"email": "test@email.io", "username": "test_username", "password": "testpassword"}
        res = await client.post(app.url_path_for("users:register-new-user"), json={"new_user": new_user})
        assert res.status_code != HTTP_404_NOT_FOUND


class TestAuthTokens:
    async def test_can_create_access_token_successfully(
        self, app: FastAPI, client: AsyncClient, test_user: UserInDB
    ) -> None:
        access_token = auth_service.create_access_token_for_user(
            user=test_user,
            secret_key=str(SECRET_KEY),
            audience=JWT_AUDIENCE,
            expires_in=ACCESS_TOKEN_EXPIRE_MINUTES,
        )
        creds = jwt.decode(access_token, str(SECRET_KEY), audience=JWT_AUDIENCE, algorithms=[JWT_ALGORITHM])
        assert creds.get("username") is not None
        assert creds["username"] == test_user.username
        assert creds["aud"] == JWT_AUDIENCE
    async def test_token_missing_user_is_invalid(self, app: FastAPI, client: AsyncClient) -> None:
        access_token = auth_service.create_access_token_for_user(
            user=None,
            secret_key=str(SECRET_KEY),
            audience=JWT_AUDIENCE,
            expires_in=ACCESS_TOKEN_EXPIRE_MINUTES,
        )
        with pytest.raises(jwt.PyJWTError):
            jwt.decode(access_token, str(SECRET_KEY), audience=JWT_AUDIENCE, algorithms=[JWT_ALGORITHM])
    @pytest.mark.parametrize(
        "secret_key, jwt_audience, exception",
        (
            ("wrong-secret", JWT_AUDIENCE, jwt.InvalidSignatureError),
            (None, JWT_AUDIENCE, jwt.InvalidSignatureError),
            (SECRET_KEY, "othersite:auth", jwt.InvalidAudienceError),
            (SECRET_KEY, None, ValidationError),
        )
    )
    async def test_invalid_token_content_raises_error(
        self,
        app: FastAPI,
        client: AsyncClient,
        test_user: UserInDB,
        secret_key: Union[str, Secret],
        jwt_audience: str,
        exception: Type[BaseException],
    ) -> None:
        with pytest.raises(exception):
            access_token = auth_service.create_access_token_for_user(
                user=test_user,
                secret_key=str(secret_key),
                audience=jwt_audience,
                expires_in=ACCESS_TOKEN_EXPIRE_MINUTES,
            )
            jwt.decode(access_token, str(SECRET_KEY), audience=JWT_AUDIENCE, algorithms=[JWT_ALGORITHM])
