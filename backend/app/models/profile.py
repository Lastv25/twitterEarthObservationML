from typing import Optional
from pydantic import EmailStr, constr, HttpUrl
from app.models.core import DateTimeModelMixin, IDModelMixin, CoreModel


class ProfileBase(CoreModel):
    __tablename__ = 'profile'
    full_name: Optional[str]
    collections_ids: Optional[str]


class ProfileCreate(ProfileBase):
    """
    The only field required to create a profile is the users id
    """
    user_id: int

class ProfileUpdate(ProfileBase):
    """
    Allow users to update any or no fields, as long as it's not user_id
    """
    pass

class ProfileInDB(IDModelMixin, DateTimeModelMixin, ProfileBase):
    user_id: int
    username: Optional[str]
    email: Optional[EmailStr]

class ProfilePublic(ProfileInDB):
    pass