
from fastapi import APIRouter
from app.api.routes.monitoring import router as monitoring_router
from app.api.routes.tweet_management import router as tweet_management_router


router = APIRouter()

router.include_router(monitoring_router, prefix="/monitoring", tags=["monitoring"])
router.include_router(tweet_management_router, prefix="/tweet_management", tags=["tweet_management"])