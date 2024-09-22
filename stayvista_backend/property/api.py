from django.http import JsonResponse

from rest_framework.decorators import api_view,authentication_classes, permission_classes

from .forms import PropertyForm
from .models import Property,Reservation
from .serializers import PropertiesListSerializer,PropertiesDetailSerializer,ReservationsListSerializer

@api_view(['GET'])
@authentication_classes([])
@permission_classes([])
def properties_list(request):
    properties=Property.objects.all()

    landlord_id=request.GET.get('landlord_id','')

    country=request.GET.get('country','')
    category=request.GET.get('category','')
    check_in=request.GET.get('check_in','')
    check_out=request.GET.get('check_out','')
    bedrooms=request.GET.get('numBedrooms','')
    bathrooms=request.GET.get('numBathrooms','')
    guests=request.GET.get('numGuests','')

    if check_in and check_out:
        exact_matches=Reservation.objects.filter(start_date=check_in) | Reservation.objects.filter(end_date=check_out)
        overlap_matches=Reservation.objects.filter(start_date__lte=check_out, end_date__lte=check_in)
        all_matches=[]

        for reservation in exact_matches | overlap_matches:
            all_matches.append(reservation.property_id)

    if landlord_id:
        properties=properties.filter(landlord_id=landlord_id)
    if guests:
        properties=properties.filter(guests__gte=guests)
    if bedrooms:
        properties=properties.filter(bedrooms__gte=bedrooms)
    if bathrooms:
        properties=properties.filter(bathrooms__gte=bathrooms)
    if country:
        properties=properties.filter(country=country)
    if category and category != 'undefined':
        properties=properties.filter(category=category)


    serializer = PropertiesListSerializer(properties,many=True)

    return JsonResponse({
        'data': serializer.data
    })
 
@api_view(['GET'])
@authentication_classes([])
@permission_classes([])
def properties_detail(request,pk):
    properties=Property.objects.get(pk=pk)
    serializer = PropertiesDetailSerializer(properties,many=False)
    
    return JsonResponse({
        'data': serializer.data
    })


@api_view(['POST','FILES'])
def create_property(request):
    try:
        form = PropertyForm(request.POST, request.FILES)
        if form.is_valid():
            property = form.save(commit=False)
            property.landlord = request.user
            property.save()
            return JsonResponse({'success': True})
        else:
            return JsonResponse({'success': False, 'errors': form.errors}, status=400)
    except Exception as e:
        return JsonResponse({'success': False, 'error': str(e)}, status=500)


@api_view(['POST'])
def book_property(request,pk):
    try:
        start_date=request.POST.get('start_date','')
        end_date=request.POST.get('end_date','')
        number_of_nights=request.POST.get('number_of_nights','')
        total_price=request.POST.get('total_price','')
        guest=request.POST.get('guest','')

        property=Property.objects.get(pk=pk)

        Reservation.objects.create(
            property=property,
            start_date=start_date,
            end_date=end_date,
            number_of_nights=number_of_nights,
            total_price=total_price,
            guest=guest,
            created_by=request.user
        )

        print("hello")
        
        return JsonResponse({'success': True})
    except Exception as e:
        return JsonResponse({'success': False, 'error': str(e)}, status=500)
    

@api_view(['GET'])
def property_reservations(request, pk):
    try:
        property = Property.objects.get(pk=pk)
        reservations = property.reservations.all()
        serializer = ReservationsListSerializer(reservations, many=True)
        return JsonResponse(serializer.data, safe=False)  # Return the serialized data directly
    except Property.DoesNotExist:
        return JsonResponse({'error': 'Property not found'}, status=404)
