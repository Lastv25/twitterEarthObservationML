from fastapi import APIRouter
from app.api.routes.areas_monitored import router as areas_router



router = APIRouter()


router.include_router(areas_router, prefix="/areas", tags=["areas"])