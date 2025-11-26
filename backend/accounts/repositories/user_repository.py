from ..models.user import User

class UserRepository:

    @staticmethod
    def create_user(data):
        password = data.pop("password")
        user = User(**data)
        user.set_password(password)
        user.save()
        return user
