"""
Admin Settings
"""
from django.contrib import admin
from .models import Location, RentObject, Booking, LocationImage, CityImage, District, City, Province, State, Country, ForwardingContact, OpeningHours
# Register your models here.


class CityImageInline(admin.TabularInline):
    model = CityImage
    # min_num = 3


class LocationImageInline(admin.TabularInline):
    model = LocationImage
    # min_num = 3


class LocationImageAdmin(admin.ModelAdmin):
    search_fields = ('title', 'image')
    list_display = ('title', 'image')
    list_filter = ('title', 'image')


class RentObjectInline(admin.TabularInline):
    model = RentObject


class ForwardingContactsInline(admin.TabularInline):
    model = ForwardingContact


class OpeningHoursInline(admin.TabularInline):
    model = OpeningHours


class DistrictAdmin(admin.ModelAdmin):
    search_fields = ('title', 'is_active', 'locality')
    list_display = ('title', 'is_active', 'locality')
    list_filter = ('title', 'is_active',  'locality')


class CityAdmin(admin.ModelAdmin):
    search_fields = ('title', 'is_active',  'postcode', 'province')
    list_display = ('title', 'is_active', 'postcode', 'province')
    list_filter = ('title', 'is_active', 'postcode', 'province')
    inlines = [CityImageInline]


class ProvinceAdmin(admin.ModelAdmin):
    search_fields = ('title', 'is_active', 'state')
    list_display = ('title', 'is_active', 'state')
    list_filter = ('title', 'is_active',  'state')


class StateAdmin(admin.ModelAdmin):
    search_fields = ('title', 'is_active',  'Province')
    list_display = ('title', 'is_active',  'country')
    list_filter = ('title', 'is_active',  'country')


class CountryAdmin(admin.ModelAdmin):
    search_fields = ('title', 'is_active')
    list_display = ('title', 'is_active')
    list_filter = ('title', 'is_active')


class LocationAdmin(admin.ModelAdmin):
    search_fields = ('title', 'is_active',  'address',
                     'province', 'city', 'state',)
    list_display = ('title', 'is_active',  'address',
                    'province', 'city', 'state',)
    list_filter = ('title', 'is_active',  'address',
                   'province', 'city', 'state',)
    inlines = [OpeningHoursInline, RentObjectInline,
               LocationImageInline, ForwardingContactsInline]
    fieldsets = fieldsets = (
        ('General', {
            'fields': ('is_active', 'booking_type', 'title', 'lat', 'lng', 'description', 'website', 'slug')
        }),
        ('Contact', {
            'fields': ('address', 'street_number', 'district', 'city', 'province', 'country', 'formatted_address', 'public_phone', 'formatted_phone_number')
        }),
        ('Geometry', {
            'fields': ('geometry', 'utc_offset',)
        }),
        ('Opening Hours', {
            'fields': ('opening_hour_periods',)
        }),
        ('Offers', {
            'fields': (('fixdesk_month_price', 'fixdesk_month_onrequest', 'fixdesk_month_storage', 'fixdesk_month_wifi', 'fixdesk_month_scan', 'fixdesk_month_print', 'fixdesk_month_meetingroom',),
                       ('flexdesk_month_price', 'flexdesk_month_onrequest', 'flexdesk_month_storage', 'flexdesk_month_wifi', 'flexdesk_month_scan', 'flexdesk_month_print', 'flexdesk_month_meetingroom',),
                       ('flexdesk_day_price', 'flexdesk_day_onrequest', 'flexdesk_day_storage', 'flexdesk_day_wifi', 'flexdesk_day_scan', 'flexdesk_day_print', 'flexdesk_day_meetingroom',),
                       ('flexdesk_hour_price', 'flexdesk_hour_onrequest', 'flexdesk_hour_storage', 'flexdesk_hour_wifi', 'flexdesk_hour_scan', 'flexdesk_hour_print', 'flexdesk_hour_meetingroom',),
                       ('meetingroom_hour_price', 'meetingroom_day_price',))
        }),
        ('Amenities', {
            'fields': ('wifi', 'printer', 'plotter', 'air_condition', 'coffee', 'kitchen', 'locker', 'shower', 'parking', 'open_24_7', 'relaxation_area',)
        }),
        ('Pricing', {
            'fields': ('phone_hour_price', 'desktop_hour_price', 'meeting_hour_price',)
        }),
        ('Reviews', {
            'fields': ('reviews',)
        }),
        # ('Advanced options', {
        # 'classes': ('wide', 'extrapretty', 'collapse',),
        #     'fields': ('registration_required', 'template_name'),
        # }),
    )


class RentObjectAdmin(admin.ModelAdmin):
    search_fields = ('title', 'type', 'location')
    list_display = ('title', 'type', 'location')
    list_filter = ('title', 'type', 'location')


class BookingAdmin(admin.ModelAdmin):
    search_fields = ('rent_object', 'start', 'end',)
    list_display = ('location', 'rent_object', 'start', 'end',)
    list_filter = search_fields = (
        'rent_object', 'start', 'end',)


admin.site.register(Location, LocationAdmin)
admin.site.register(LocationImage, LocationImageAdmin)
admin.site.register(RentObject, RentObjectAdmin)
admin.site.register(Booking, BookingAdmin)
admin.site.register(Province, ProvinceAdmin)
admin.site.register(City, CityAdmin)
admin.site.register(Country, CountryAdmin)
admin.site.register(District, DistrictAdmin)
admin.site.register(State, StateAdmin)
