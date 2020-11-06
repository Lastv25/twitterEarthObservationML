from typing import Optional
from pydantic import validator
from app.models.core import DateTimeModelMixin, IDModelMixin, CoreModel
from shapely.wkt import loads


class CollectionBase(CoreModel):
    full_name: Optional[str]
    disaster: Optional[str]
    notification: bool = False
    aoi: Optional[str]
    parameters: Optional[str]

    @validator('aoi')
    def polygon_validator(cls,v):
        try:
            area = loads(v)
        except:
            raise ValueError('Area of interest is not a polygon')
        return area

class CollectionCreate(CollectionBase):
    """
    The only field required to create a collection is the users id
    """
    user_id: int

class CollectionUpdate(CollectionBase):
    """
    Allow users to update any or no fields, as long as it's not user_id
    """
    pass

class CollectionInDB(IDModelMixin, DateTimeModelMixin, CollectionBase):
    pass

class CollectionPublic(CollectionBase):
    pass
