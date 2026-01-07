from django.db import models
from accounts.models.user import User
from accounts.models.student import Student
from accounts.models.club import Club

# ----------------------------------------------------
# 1. Ana Gönderi Modeli (Tüm içeriklerin babası)
# ----------------------------------------------------
class Post(models.Model):
    club = models.ForeignKey(Club, on_delete=models.CASCADE, related_name="all_posts")
    text = models.TextField(blank=True, null=True)
    image = models.ImageField(upload_to='posts/', blank=True, null=True)
    posted_date = models.DateTimeField(auto_now_add=True)
    
    # Beğeni sistemi (ManyToMany)
    liked_by = models.ManyToManyField(User, related_name="liked_posts", blank=True)
    
    # Yardımcı alan: Hangi tip post olduğunu kolayca anlamak için
    post_type = models.CharField(max_length=20, editable=False)

    class Meta:
        ordering = ['-posted_date']

# ----------------------------------------------------
# 2. Duyuru (Sadece Post özelliklerini kullanır)
# ----------------------------------------------------
class Announcement(Post):
    def save(self, *args, **kwargs):
        self.post_type = 'announcement'
        super().save(*args, **kwargs)

# ----------------------------------------------------
# 3. Etkinlik (Tarih ve Katılımcı ekler)
# ----------------------------------------------------
class Event(Post):
    expire_date = models.DateTimeField()
    location = models.CharField(max_length=255, blank=True)
    participants = models.ManyToManyField(Student, related_name="joined_events", blank=True)

    def save(self, *args, **kwargs):
        self.post_type = 'event'
        super().save(*args, **kwargs)

# ----------------------------------------------------
# 4. Anket (Seçenekler ve Yanıtlar ekler)
# ----------------------------------------------------
class Poll(Post):
    poll_type = models.CharField(max_length=10, choices=[('single', 'Tekli'), ('multi', 'Çoklu')], default='single')
    options = models.TextField(help_text="Şıkları virgülle ayırın: Elma,Armut,Muz")

    def save(self, *args, **kwargs):
        self.post_type = 'poll'
        super().save(*args, **kwargs)

class PollResponse(models.Model):
    poll = models.ForeignKey(Poll, on_delete=models.CASCADE, related_name="responses")
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    selected_options = models.TextField() # Seçilen şıklar

# ----------------------------------------------------
# 5. Çekiliş (Giveaway - Yeni istediğin özellik)
# ----------------------------------------------------
class Giveaway(Post):
    deadline = models.DateTimeField()
    winner_count = models.IntegerField(default=1)
    participants = models.ManyToManyField(Student, related_name="joined_giveaways", blank=True)
    winners = models.ManyToManyField(Student, related_name="won_giveaways", blank=True)
    is_finished = models.BooleanField(default=False)

    def save(self, *args, **kwargs):
        self.post_type = 'giveaway'
        super().save(*args, **kwargs)

# ----------------------------------------------------
# 6. Yorum Modeli
# ----------------------------------------------------
class Comment(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name="comments")
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    text = models.TextField()
    date = models.DateTimeField(auto_now_add=True)
    liked_by = models.ManyToManyField(User, related_name="liked_comments", blank=True)