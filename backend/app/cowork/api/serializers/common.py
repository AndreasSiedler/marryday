from rest_framework import serializers
from ...models import RentObject, Booking, Location, LocationImage, Image, City

# Cities


class CitySerializer(serializers.ModelSerializer):
    class Meta:
        model = City
        fields = '__all__'

# Images


class LocationImageSerializer(serializers.ModelSerializer):

    class Meta:
        model = LocationImage
        fields = '__all__'

# Locations


class LocationSerializer(serializers.ModelSerializer):

    images = LocationImageSerializer(many=True)
    city = CitySerializer()
    prices = serializers.SerializerMethodField()

    def get_prices(self, obj):
        data = {
            'phone_hour': obj.phone_hour_price,
            'desktop_hour': obj.desktop_hour_price,
            'meeting_hour': obj.meeting_hour_price,
        }
        return data

    class Meta:
        model = Location
        fields = ('slug', 'title', 'address', 'city',
                  'lat', 'lng', 'images', 'description', 'prices',)


# Bookings
class BookingRetrieveSerializer(serializers.ModelSerializer):
    rent_object = serializers.StringRelatedField()

    class Meta:
        model = Booking
        fields = ('user', 'rent_object',
                  'start', 'end', 'payment_intent_id')


class BookingCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Booking
        fields = ('user', 'rent_object',
                  'start', 'end', 'payment_intent_id')


# RentObjects
class RentObjectSerializer(serializers.ModelSerializer):
    bookings = BookingRetrieveSerializer(many=True)

    class Meta:
        model = RentObject
        fields = ('id', 'title', 'type', 'location', 'bookings',)
