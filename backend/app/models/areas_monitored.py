from typing import Optional
from enum import Enum
from app.models.core import IDModelMixin, CoreModel
import geoalchemy2 as geo


class AreasMonitoringType(str, Enum):
    pass

class AreasMonitoringBase(CoreModel):
    """
    All common characteristics of our Areas monitoring resource
    """
    __tablename__ = 'areas_monitored'
    coordinates: Optional[geo.Geometry('POINT')]

class CleaningCreate(AreasMonitoringBase):
    coordinates: geo.Geometry('POINT')

class CleaningUpdate(AreasMonitoringBase):
    pass

class CleaningInDB(IDModelMixin, AreasMonitoringBase):
    pass

class CleaningPublic(IDModelMixin, AreasMonitoringBase):
    pass
