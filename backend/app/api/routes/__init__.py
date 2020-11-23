from fastapi import APIRouter
from app.api.routes.users import router as users_router
from app.api.routes.profiles import router as profile_router
from app.api.routes.collections import router as collections_router
from app.api.routes.get_products import router as products_router


router = APIRouter()

router.include_router(users_router, prefix="/users", tags=["users"])
router.include_router(profile_router, prefix="/profiles", tags=["profiles"])
router.include_router(collections_router, prefix="/collections", tags=["collections"])
router.include_router(products_router, prefix="/products", tags=["products"])