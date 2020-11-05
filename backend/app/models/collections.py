from typing import Optional
from app.models.core import DateTimeModelMixin, IDModelMixin, CoreModel

class CollectionBase(CoreModel):
    pass

class CollectionCreate(CollectionBase):
    """
    The only field required to create a profile is the users id
    """
    pass

class CollectionUpdate(CollectionBase):
    """
    Allow users to update any or no fields, as long as it's not user_id
    """
    pass

class CollectionInDB(IDModelMixin, DateTimeModelMixin, CollectionBase):
    pass

class CollectionPublic(CollectionBase):
    pass
