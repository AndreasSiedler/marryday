""" Accounts admin """
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.auth.models import Group

from .forms import CustomUserChangeForm, CustomUserCreationForm
from .models import User


class UserAdmin(BaseUserAdmin):
    """Custom user admin class

    Args:
        BaseUserAdmin (class)
    """
    add_form = CustomUserCreationForm
    form = CustomUserChangeForm
    model = User
    list_display = ('id', 'email', 'is_staff', 'is_active',)
    list_filter = ('email', 'is_staff', 'is_active',)
    fieldsets = (
        (None, {'fields': ('id', 'email', 'password',)}),
        ('Personal info', {'fields': ('first_name', 'last_name',)}),
        ('Profiles', {'fields': ('is_visitor', 'is_company',)}),
        ('Permissions', {
         'fields': ('is_superuser', 'is_staff', 'is_active',)}),
    )
    add_fieldsets = (
        (None, {'fields': ('email', 'password1', 'password2',)}),
        ('Personal info', {'fields': ('first_name', 'last_name',)}),
        ('Profiles', {'fields': ('is_visitor', 'is_company',)}),
        ('Permissions', {
         'fields': ('is_superuser', 'is_staff', 'is_active',)}),
    )
    search_fields = ('email',)
    ordering = ('email',)
    readonly_fields = ('id',)


admin.site.register(User, UserAdmin)


# Remove Group Model from admin. We're not using it.
admin.site.unregister(Group)
