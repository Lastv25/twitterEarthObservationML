from fastapi import APIRouter
from app.api.routes.areas_monitored import router as areas_router
from app.api.routes.users import router as users_router


router = APIRouter()


router.include_router(areas_router, prefix="/areas", tags=["areas"])
router.include_router(users_router, prefix="/users", tags=["users"])