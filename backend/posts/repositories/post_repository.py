from posts.models import Post, Giveaway, Event, Poll

class PostRepository:
    @staticmethod
    def get_club_feed(club_id):
        # select_related ile OneToOne kalıtımları (event, poll vb.) tek seferde JOIN'liyoruz.
        # prefetch_related ile M2M olan beğenileri ve katılımcıları çekiyoruz.
        return Post.objects.filter(club_id=club_id).select_related(
            'announcement', 'event', 'poll', 'giveaway'
        ).prefetch_related(
            'liked_by', 'comments', 'event__participants', 'giveaway__participants', 'giveaway__winners'
        ).order_by('-posted_date')

    @staticmethod
    def get_post_by_id(post_id):
        return Post.objects.filter(id=post_id).first()

    @staticmethod
    def get_giveaway_by_id(giveaway_id):
        return Giveaway.objects.filter(id=giveaway_id).first()