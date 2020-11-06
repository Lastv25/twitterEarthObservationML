from typing import Optional
from app.models.core import DateTimeModelMixin, IDModelMixin, CoreModel

class CollectionBase(CoreModel):
    full_name: Optional[str]
    disaster: Optional[str]
    notification: bool = False
    parameters: Optional[str]

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
