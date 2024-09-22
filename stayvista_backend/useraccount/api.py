from .serializers import UserDetailSerializer
from .models import User
from django.http import JsonResponse
from rest_framework.decorators import api_view,authentication_classes, permission_classes
from property.serializers import ReservationsListSerializer


@api_view(['GET'])
@authentication_classes([])
@permission_classes([])
def landlord_detail(request, pk):
    try:
        user = User.objects.get(pk=pk)
        serializer = UserDetailSerializer(user, many=False)
        return JsonResponse(serializer.data, safe=False)
    except User.DoesNotExist:
        return JsonResponse({'error': 'User not found'}, status=404)
    

@api_view(['GET'])
def reservations_list(request):
    reservations = request.user.reservations.all()

    print(reservations)
    serializer = ReservationsListSerializer(reservations, many=True)
    return JsonResponse({
        'data': serializer.data
    },safe=False)
