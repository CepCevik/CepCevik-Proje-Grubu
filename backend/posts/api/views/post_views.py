from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from posts.services.post_service import PostService
from posts.api.serializers.post_serializers import GiveawaySerializer, PostDetailSerializer , PostCreateSerializer
# backend/posts/api/views/post_views.py
class ClubFeedAPI(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request): # club_id parametresini buradan da sildik
        service = PostService()
        # Giriş yapan kullanıcının kulübünü otomatik buluyoruz
        club = getattr(request.user, 'club', None)
        if not club:
            return Response({"error": "Kulüp profili bulunamadı"}, status=404)
            
        posts = service.repository.get_club_feed(club.id)
        serializer = PostDetailSerializer(posts, many=True, context={'request': request})
        return Response(serializer.data)
"""
class GiveawayActionAPI(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, giveaway_id, action):
        service = PostService()
        try:
            if action == 'join':
                service.join_giveaway(giveaway_id, request.user.student)
                return Response({"message": "Çekilişe katıldınız!"})
            
            # 🟢 YENİ: Çekilişten Ayrılma Aksiyonu
            elif action == 'leave':
                # Repository üzerinden öğrenciyi katılımcılardan siliyoruz
                giveaway = service.repository.get_giveaway_by_id(giveaway_id)
                if hasattr(request.user, 'student'):
                    giveaway.participants.remove(request.user.student)
                    return Response({"message": "Çekilişten ayrıldınız."})
                return Response({"error": "Öğrenci profili bulunamadı."}, status=400)

            elif action == 'finish':
                service.finish_giveaway(giveaway_id, request.user)
                return Response({"message": "Çekiliş sonuçlandırıldı."})
        except Exception as e:
            return Response({"error": str(e)}, status=400)
"""  
class GiveawayActionAPI(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, giveaway_id, action):
        service = PostService()
        try:
            if action == 'join':
                service.join_giveaway(giveaway_id, request.user.student)
                return Response({"message": "Çekilişe katıldınız!"})
            
            elif action == 'leave':
                giveaway = service.repository.get_giveaway_by_id(giveaway_id)
                if hasattr(request.user, 'student'):
                    giveaway.participants.remove(request.user.student)
                    return Response({"message": "Çekilişten ayrıldınız."})
                return Response({"error": "Öğrenci profili bulunamadı."}, status=400)

            elif action == 'finish':
            # 1. Service metodundan güncellenmiş nesneyi al
                giveaway = service.finish_giveaway(giveaway_id, request.user)
                
                # 2. Serializer'ı hazırla (Genel veri yapısı için)
                serializer = GiveawaySerializer(giveaway, context={'request': request})
                
                # 3. HATA BURADAYDI: Doğrudan giveaway nesnesindeki attribute'u kullanıyoruz
                # winner_display_names ismini Service'de verdiğimiz isimle eşitledik.
                return Response({
                    "message": "Çekiliş sonuçlandırıldı.",
                    "winners": getattr(giveaway, 'winner_display_names', []), # Hata vermemesi için güvenli erişim
                    "data": serializer.data 
                })

        except Exception as e:
            return Response({"error": str(e)}, status=400)
        
        
        
             
class PostCreateAPI(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = PostCreateSerializer(data=request.data)
        if serializer.is_valid():
            service = PostService()
            try:
                # Sadece kulüp kullanıcıları post atabilir
                if request.user.type != 'club':
                    return Response({"error": "Sadece kulüpler paylaşım yapabilir."}, status=403)
                
                new_post = service.create_post(request.user, serializer.validated_data)
                return Response({"message": "Gönderi başarıyla paylaşıldı!", "id": new_post.id}, status=201)
            except Exception as e:
                return Response({"error": str(e)}, status=400)
        return Response(serializer.errors, status=400)      
    
class PostActionAPI(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, post_id, action):
        service = PostService()
        try:
            if action == 'like':
                status = service.toggle_like(post_id, request.user)
                return Response({"is_liked": status})
            
            elif action == 'vote':
                # Kulüp sahibinin oy vermesini engelleyerek hatayı önle
                if not hasattr(request.user, 'student'):
                    return Response({"error": "Sadece öğrenciler ankette oy kullanabilir."}, status=400)
                    
                service.vote_poll(post_id, request.user.student, request.data.get('option'))
                return Response({"message": "Oyunuz işlendi."})
            elif action == 'comment':
                comment = service.add_comment(post_id, request.user, request.data.get('text'))
                return Response({"message": "Yorum eklendi."})
        except Exception as e:
            return Response({"error": str(e)}, status=400)      
        
        
# backend/posts/api/views/post_views.py içine ekle:

class PublicClubFeedAPI(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, club_id):
        service = PostService()
        # Repository'deki mevcut fonksiyonu kulüp ID'si ile çağırıyoruz
        posts = service.repository.get_club_feed(club_id)
        serializer = PostDetailSerializer(posts, many=True, context={'request': request})
        return Response(serializer.data)        