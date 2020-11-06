from typing import Optional, List
from pydantic import validator
from app.models.core import DateTimeModelMixin, IDModelMixin, CoreModel
from shapely import wkt

class CollectionBase(CoreModel):
    full_name: Optional[str]
    disaster: Optional[str]
    notification: bool = False
    aoi: Optional[str]
    parameters: Optional[str]

    # @validator('aoi')
    # def polygon_validator(cls,v):
    #     if 'POLYGON' in v:
    #         return v
    #     else:
    #         raise ValueError('Area of interest is not a polygon')


class CollectionCreate(CollectionBase):
    """
    The only field required to create a collection is the users id
    """

class CollectionUpdate(CollectionBase):
    """
    Allow users to update any or no fields, as long as it's not user_id
    """
    pass

class CollectionInDB(IDModelMixin, DateTimeModelMixin, CollectionBase):
    user_id: int

class CollectionPublic(CollectionInDB):
    pass
