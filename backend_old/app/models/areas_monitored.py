from typing import Optional
from enum import Enum
from app.models.core import IDModelMixin, CoreModel
from geoalchemy2.types import Geometry



class AreasMonitoringType(str, Enum):
    pass

class AreasMonitoringBase(CoreModel):
    """
    All common characteristics of our Areas monitoring resource
    """
    __tablename__ = 'areas_monitored'
    coordinates: Optional[Geometry(geometry_type='POINT')]

class CleaningCreate(AreasMonitoringBase):
    coordinates: Geometry(geometry_type='POINT')

class CleaningUpdate(AreasMonitoringBase):
    pass

class CleaningInDB(IDModelMixin, AreasMonitoringBase):
    pass

class CleaningPublic(IDModelMixin, AreasMonitoringBase):
    pass
