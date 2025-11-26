from ..models.club import Club

class ClubRepository:

    @staticmethod
    def create_club(user, data):
        return Club.objects.create(user=user, **data)
