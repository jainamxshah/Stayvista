from django.forms import ModelForm

from .models import Property

class PropertyForm(ModelForm):
    class Meta:
        model = Property
        fields = (
            'title',
            'price_per_night',
            'image',
            'category',
            'description',
            'bedrooms',
            'bathrooms',
            'guests',
            'country',
            'country_code'
        )
        