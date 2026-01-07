from rest_framework import serializers
from posts.models import Post, Announcement, Event, Poll, Giveaway, Comment, PollResponse
from accounts.api.serializers.user_profile_serializer import UserProfileSerializer

class CommentSerializer(serializers.ModelSerializer):
    username = serializers.SerializerMethodField()
    like_count = serializers.SerializerMethodField()
    


    class Meta:
        model = Comment
        fields = ['id', 'username', 'text', 'date', 'like_count']

    def get_username(self, obj):
        user = obj.user
        # Eğer kullanıcı bir öğrenciyse Student modelindeki ismi getir
        if user.type == 'student' and hasattr(user, 'student'):
            return user.student.name
        # Eğer kullanıcı bir kulüpse Club modelindeki ismi getir
        elif user.type == 'club' and hasattr(user, 'club'):
            return user.club.name
        # Hiçbiri yoksa email'in ilk kısmını döndür (fail-safe)
        return user.email.split('@')[0]
    



    def get_like_count(self, obj):
        # Eğer Comment modelinde beğeni (liked_by) özelliği varsa sayısını döndürür
        # Yoksa hata vermek yerine 0 döndürür
        if hasattr(obj, 'liked_by'):
            return obj.liked_by.count()
        return 0

class PostBaseSerializer(serializers.ModelSerializer):
    """Tüm post tiplerinin ortak alanlarını döner"""
    club_name = serializers.CharField(source='club.name', read_only=True)
    is_liked = serializers.SerializerMethodField()
    comment_count = serializers.IntegerField(source='comments.count', read_only=True)

    class Meta:
        model = Post
        fields = ['id', 'club_name', 'text', 'image', 'posted_date', 'post_type', 'is_liked', 'comment_count']

    def get_is_liked(self, obj):
        user = self.context.get('request').user
        if user.is_authenticated:
            return obj.liked_by.filter(id=user.id).exists()
        return False

class EventSerializer(serializers.ModelSerializer):
    participant_count = serializers.IntegerField(source='participants.count', read_only=True)
    class Meta:
        model = Event
        fields = ['expire_date', 'location', 'participant_count']

from rest_framework import serializers

class GiveawaySerializer(serializers.ModelSerializer):
    participant_count = serializers.IntegerField(source='participants.count', read_only=True)
    is_joined = serializers.SerializerMethodField()
    # Frontend'in okuyacağı alanın adını 'winners' yapalım ki React kodun bozulmasın
    winners = serializers.SerializerMethodField() 

    class Meta:
        model = Giveaway
        fields = ['id', 'participant_count', 'is_finished', 'winners', 'deadline', 'winner_count', 'is_joined']
        read_only_fields = ['is_finished']

    def get_winners(self, obj):
        if not obj.is_finished:
            return []
        # ManyToMany winners içinden isimleri çekiyoruz
        return [(getattr(w, 'name', None) or w.user.email.split('@')[0]) for w in obj.winners.all()]

    def get_is_joined(self, obj):
        request = self.context.get('request')
        if request and request.user.is_authenticated and hasattr(request.user, 'student'):
            return obj.participants.filter(id=request.user.student.id).exists()
        return False



# 1. Önce PollSerializer ekle (Dosyada yoksa)
# serializers.py

class PollSerializer(serializers.ModelSerializer):
    results = serializers.SerializerMethodField()

    class Meta:
        model = Poll
        fields = ['options', 'results']

    def get_results(self, obj):
        # Seçenekleri listeye çevir: ['A', 'B']
        options_list = obj.options.split(',')
        results_dict = {}
        
        for opt in options_list:
            # PollResponse tablosunda bu ankete ve bu seçeneğe ait kaç kayıt var?
            count = obj.responses.filter(selected_options=opt).count()
            results_dict[opt] = count
            
        return results_dict

# 2. PostDetailSerializer içindeki get_details metodunu güncelle
class PostDetailSerializer(serializers.ModelSerializer):
    details = serializers.SerializerMethodField()
    comments = CommentSerializer(many=True, read_only=True)
    # 🟢 Beğenenlerin profil bilgilerini de listeye ekliyoruz
    liked_by = UserProfileSerializer(many=True, read_only=True) 
    club_name = serializers.CharField(source='club.name', read_only=True)
    is_liked = serializers.SerializerMethodField()

    # 🟢 1. ADIM: liked_by alanını metod ile hesaplanacak hale getiriyoruz
    liked_by = serializers.SerializerMethodField()
    
    class Meta:
        model = Post
        fields = [
            'id', 'club_name', 'text', 'image', 'posted_date', 
            'post_type', 'details', 'comments', 'liked_by', 'is_liked'
        ]

# 🟢 2. ADIM: Beğenenlerin isimlerini çeken fonksiyonu ekle
    def get_liked_by(self, obj):
        result = []
        for user in obj.liked_by.all():
            name = ""
            if user.type == 'student' and hasattr(user, 'student'):
                name = user.student.name
            elif user.type == 'club' and hasattr(user, 'club'):
                name = user.club.name
            else:
                name = user.email.split('@')[0]
            result.append({"username": name})
        return result 
    
    def get_is_liked(self, obj):
        user = self.context.get('request').user
        if user and user.is_authenticated:
            return obj.liked_by.filter(id=user.id).exists()
        return False  


    def get_details(self, obj):
        # 🟢 KRİTİK DÜZELTME: context=self.context ekliyoruz
        # Bu sayede 'request' bilgisi alt serializer'lara da akar.
        
        if obj.post_type == 'event':
            return EventSerializer(obj.event, context=self.context).data
        
        elif obj.post_type == 'giveaway':
            # Hata buradaydı; context eklenince 'is_joined' metodu çalışacaktır.
            return GiveawaySerializer(obj.giveaway, context=self.context).data
            
        elif obj.post_type == 'poll':
            return PollSerializer(obj.poll, context=self.context).data
            
        return None
        
    
class PostCreateSerializer(serializers.ModelSerializer):
    # allow_null=True ve required=False kritik öneme sahip
    expire_date = serializers.DateTimeField(required=False, allow_null=True)
    deadline = serializers.DateTimeField(required=False, allow_null=True)
    winner_count = serializers.IntegerField(required=False, default=1)
    location = serializers.CharField(required=False, allow_blank=True, allow_null=True)
    options = serializers.CharField(required=False, allow_blank=True, allow_null=True)
    image = serializers.ImageField(required=False, allow_null=True)
    post_type = serializers.CharField(required=True)

    class Meta:
        model = Post
        fields = ['text', 'image', 'post_type', 'expire_date', 'location', 'deadline', 'winner_count', 'options']

    def to_internal_value(self, data):
        # Frontend'den gelen boş stringleri ("") temizle ve None yap
        mutable_data = data.copy()
        for field in ['expire_date', 'deadline', 'location', 'options']:
            if mutable_data.get(field) == "" or mutable_data.get(field) == "null":
                mutable_data[field] = None
        return super().to_internal_value(mutable_data)

    def validate(self, data):
        p_type = data.get('post_type')
        # Sadece ilgili tipte zorunluluk kontrolü yap
        if p_type == 'event' and not data.get('expire_date'):
            raise serializers.ValidationError({"expire_date": "Bu alan zorunludur."})
        if p_type == 'giveaway' and not data.get('deadline'):
            raise serializers.ValidationError({"deadline": "Bu alan zorunludur."})
        return data


