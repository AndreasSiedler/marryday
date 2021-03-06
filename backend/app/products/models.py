import uuid

from django.core.exceptions import ValidationError
from django.db import models
from django.utils.text import slugify
from tinymce.models import HTMLField
from core.models import Image


class ForwardingContact(models.Model):
    email = models.EmailField(max_length=254)
    first_name = models.CharField(max_length=150)
    last_name = models.CharField(max_length=150)
    location = models.ForeignKey(
        'products.Product', related_name="forwarding_contacts", on_delete=models.CASCADE, null=True)


class ProductImage(Image):
    def validate_image(field_file_obj):
        filesize = field_file_obj.file.size
        megabyte_limit = 5.0
        if filesize > megabyte_limit * 1024 * 1024:
            raise ValidationError("Max file size is %sMB" %
                                  str(megabyte_limit))

    def update_filename(instance, filename):
        ext = filename.split('.')[-1]
        return f"products/{instance.product_id}/{instance.title}.{ext}"

    image = models.FileField(upload_to=update_filename)
    product = models.ForeignKey(
        'products.Product', related_name="images", on_delete=models.CASCADE)


PRODUCT_DETAIL_TYPES = (
    ('text', 'Text'),
    ('checkbox', 'Checkbox'),
    ('radio', 'Radio'),
    ('select', 'Select'),
    ('textarea', 'Textarea')
)


class ProductDetail(models.Model):
    # Basics
    is_active = models.BooleanField(default=False)

    # Details
    title = models.CharField(max_length=150, blank=False, null=False)
    name = models.CharField(max_length=150, blank=False, null=False)
    type = models.CharField(choices=PRODUCT_DETAIL_TYPES, max_length=150, blank=False, null=False)
    options = models.JSONField(blank=True, null=True)


class Product(models.Model):
    # General
    is_active = models.BooleanField(default=False)
    user = models.ForeignKey(
        'accounts.User', related_name="products", on_delete=models.CASCADE, null=True, blank=True)
    utc_offset = models.IntegerField(null=True)

    # Basics
    basics = models.JSONField(blank=True, null=True)
    title = models.CharField(max_length=150, blank=True, default="")
    slug = models.CharField(max_length=150, blank=True, default="")
    description = HTMLField(max_length=1000, blank=True, default="")
    category = models.ForeignKey('products.ProductCategory', related_name="categories",
                                 on_delete=models.CASCADE, null=True, blank=True)

    # Details
    details = models.JSONField(blank=True, null=True)

    # Contact
    public_email = models.EmailField(max_length=150, blank=True, default="")
    public_phone = models.CharField(max_length=150, blank=True, default="")

    # Location
    location = models.JSONField(blank=True, null=True)

    # Geometry

    # Reviews
    reviews = models.JSONField(null=True, blank=True)
    rating = models.FloatField(null=True, blank=True)
    user_ratings_total = models.IntegerField(null=True, blank=True)

    # Booking
    day_price = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)

    # Images
    preview_image = models.OneToOneField(
        'products.ProductImage',
        on_delete=models.CASCADE,
        related_name='location_preview_image',
        null=True,
        blank=True
    )

    def clean(self):
        if self.is_active is True and self.images.count() < 3:
            raise ValidationError(
                'Please insert at least 3 Product Images before activation.')

    def save(self, *args, **kwargs):
        product_images = self.images.all()
        for image in product_images:
            if image.is_thumbnail:
                self.preview_image = image

        if self.slug is None:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)  # Call the "real" save() method.

    def __str__(self):
        return self.title


class ProductCategory(models.Model):
    # General
    is_active = models.BooleanField(default=False)

    # Basics
    title = models.CharField(max_length=150, unique=True)
    slug = models.CharField(max_length=150, blank=True, null=True)

    class Meta:
        verbose_name_plural = "Product Categories"

    def save(self, *args, **kwargs):
        self.slug = slugify(self.title)
        super().save(*args, **kwargs)  # Call the "real" save() method.

    def __str__(self):
        return self.title
