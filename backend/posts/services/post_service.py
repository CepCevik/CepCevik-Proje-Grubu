import random
from posts.repositories.post_repository import PostRepository
from posts.models import Post, Announcement, Event, Poll, Giveaway, PollResponse, Comment
from django.db import transaction
from django.shortcuts import get_object_or_404


class PostService:
    def __init__(self):
        self.repository = PostRepository()




    def finish_giveaway(self, giveaway_id, user):
        # 'pk' yerine fonksiyona gelen 'giveaway_id' kullanıyoruz
        giveaway = get_object_or_404(Giveaway, pk=giveaway_id)
        
        # Yetki ve Durum Kontrolleri
        if giveaway.club.user != user:
            raise Exception("Bu çekilişi bitirme yetkiniz yok.")
        
        if giveaway.is_finished:
            raise Exception("Bu çekiliş zaten sonuçlandırılmış.")

        participants = list(giveaway.participants.all())
        if not participants:
            raise Exception("Çekilişe henüz kimse katılmamış.")

        # Kazananları Belirle
        actual_winner_count = min(len(participants), giveaway.winner_count)
        winners_list = random.sample(participants, actual_winner_count)
        
        # Kazananları ManyToMany alanına set et ve bitir
        giveaway.winners.set(winners_list)
        giveaway.is_finished = True
        giveaway.save()

        # Kazanan isimlerini listele
        winner_names = []
        for w in giveaway.winners.all():
            name = getattr(w, 'name', None) or w.user.email.split('@')[0]
            winner_names.append(name)

        # DİKKAT: Burada objeye özellik olarak ekliyoruz
        giveaway.winner_display_names = winner_names
        
        # En sonunda güncel objeyi geri döndürüyoruz
        return giveaway
        
        
        
        

    def join_giveaway(self, giveaway_id, student):
        giveaway = self.repository.get_giveaway_by_id(giveaway_id)
        # Sizin şartınız: Sadece kulüp üyesi olanlar (Members)
        if not giveaway.club.members.filter(id=student.id).exists():
            raise Exception("Bu kulübe üye olmalısınız!")
        
        giveaway.participants.add(student)
        return giveaway
        
    @transaction.atomic
    def create_post(self, club_user, validated_data):
        club = club_user.club
        p_type = validated_data.pop('post_type')
        text = validated_data.pop('text')
        image = validated_data.pop('image', None)

        # Ortak verileri bir sözlükte toplayalım
        base_data = {'club': club, 'text': text, 'image': image, 'post_type': p_type}

        if p_type == 'announcement':
            return Announcement.objects.create(**base_data)
        
        elif p_type == 'event':
            # Sadece Event'e ait alanları çekiyoruz
            return Event.objects.create(
                expire_date=validated_data.get('expire_date'),
                location=validated_data.get('location'),
                **base_data
            )
            
        elif p_type == 'giveaway':
            return Giveaway.objects.create(
                deadline=validated_data.get('deadline'),
                winner_count=validated_data.get('winner_count', 1),
                **base_data
            )
            
        elif p_type == 'poll':
            return Poll.objects.create(
                options=validated_data.get('options'),
                **base_data
            )
            
        raise Exception("Geçersiz gönderi tipi!")
    
    def toggle_like(self, post_id, user):
        post = get_object_or_404(Post, id=post_id)
        if post.liked_by.filter(id=user.id).exists():
            post.liked_by.remove(user)
            return False # Beğeni kaldırıldı
        else:
            post.liked_by.add(user)
            return True # Beğenildi

    def vote_poll(self, poll_id, student, selected_option):
        poll = get_object_or_404(Poll, id=poll_id)
        # Daha önce oy vermiş mi kontrol et
        response, created = PollResponse.objects.update_or_create(
            poll=poll, student=student,
            defaults={'selected_options': selected_option}
        )
        return response

    def add_comment(self, post_id, user, text):
        post = get_object_or_404(Post, id=post_id)
        return Comment.objects.create(post=post, user=user, text=text)