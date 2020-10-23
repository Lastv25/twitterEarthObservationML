from typing import Optional
from enum import Enum
from app.models.core import IDModelMixin, CoreModel



class AreasMonitoringType(str, Enum):
    pass

class CleaningBase(CoreModel):
    """
    All common characteristics of our Areas monitoring resource
    """
    name: Optional[str]
    description: Optional[str]
    price: Optional[float]
    cleaning_type: Optional[CleaningType] = "spot_clean"

class CleaningCreate(CleaningBase):
    name: str
    price: float

class CleaningUpdate(CleaningBase):
    cleaning_type: Optional[CleaningType]

class CleaningInDB(IDModelMixin, CleaningBase):
    name: str
    price: float
    cleaning_type: CleaningType

class CleaningPublic(IDModelMixin, CleaningBase):
    pass
