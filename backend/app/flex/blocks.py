""" All blocks """
from wagtail.core import blocks
from wagtail.images.blocks import ImageChooserBlock

from wagtail.images.models import Image as WagtailImage
from rest_framework import serializers


class WagtailImageSerializer(serializers.ModelSerializer):
    def __init__(self, width, *args, **kwargs):
        self.width = width
        super().__init__()

    url = serializers.SerializerMethodField()

    class Meta:
        model = WagtailImage
        fields = ['title', 'url']

    def get_url(self, obj):
        # return obj.get_rendition('fill-300x186|jpegquality-60').url
        # return obj.get_rendition('fill-960x720').url
        return obj.get_rendition(self.width).url

        # blocks.py


class APIImageChooserBlock(ImageChooserBlock):
    def __init__(self, width, *args, **kwargs):
        self.width = width
        super().__init__()

    def get_api_representation(self, value, context=None):
        if value:
            return WagtailImageSerializer(context=context, width=self.width).to_representation(value)
        else:
            return ''


# Heading Section
class PageHeadingSectionBlock(blocks.StructBlock):
    """ Section Base Block - Ued by each section """
    heading = blocks.CharBlock(
        required=False,
        max_length=80,
        label='Heading',
        default='Super Awesome Section',
    )
    description = blocks.TextBlock(
        required=False,
        max_length=400,
        label='Description',
        default='The thing we do is better than any other similar thing and this hero panel will convince you of that, just by having a glorious background image.',
    )
    image = APIImageChooserBlock(
        required=False,
        label='Image',
        width='fill-960x720',
    )

    class Meta:
        """ Meta data """
        template = 'blocks/page_heading_section.html'
        label = 'Page Heading Section'


# FAQ Section
class FAQSectionBlock(blocks.StructBlock):
    """ FAQ Block - Ued by each section """
    faqs = blocks.ListBlock(
        blocks.StructBlock([
            ("heading", blocks.CharBlock(required=True, max_length=1000)),
            ("content", blocks.TextBlock(required=True, max_length=5000)),
        ])
    )

    class Meta:
        """ Meta data """
        label = 'FAQ Section'


# Contact Section
class ContactSectionBlock(blocks.StructBlock):
    """ Section Base Block - Ued by each section """
    heading = blocks.CharBlock(
        required=False,
        max_length=80,
        label='Heading',
        default='Super Awesome Section',
    )
    contacts = blocks.ListBlock(
        blocks.StructBlock([
            ("type", blocks.ChoiceBlock(required=True, choices=(
                ('email', 'Email'),
                ('phone', 'Phone'),
            ))),
            ("heading", blocks.CharBlock(required=True, max_length=100)),
            ("data", blocks.TextBlock(required=True, max_length=300)),
        ])
    )

    class Meta:
        """ Meta data """
        label = 'Contact Section'


# Content Seciton Block
class ContentSectionBlock(blocks.StructBlock):
    """ Section Base Block - Ued by each section """
    layout = blocks.ChoiceBlock(
        choices=(
            ('centered', 'Centered'),
            ('two_columns_with_image', 'Two columns with image')
        )
    )
    heading = blocks.CharBlock(
        required=False,
        max_length=80,
        label='Heading',
        default='Super Awesome Section',
    )
    content = blocks.RichTextBlock(
        required=False,
        max_length=10000,
        label='Content',
        default='The thing we do is better than any other similar thing and this hero panel will convince you of that, just by having a glorious background image.',
    )

    class Meta:
        """ Meta data """
        label = 'Content Section'


# Hero Section Block
class HeroSectionBlock(blocks.StructBlock):
    """ Section Base Block - Ued by each section """
    heading = blocks.CharBlock(
        required=False,
        max_length=80,
        label='Feature',
        default='Super Awesome Feature',
    )
    subheading = blocks.CharBlock(
        required=False,
        max_length=100,
        label='Subheading',
        default='Super Awesome Hero Subheading',
    )
    description = blocks.TextBlock(
        required=False,
        max_length=400,
        label='Description',
        default='The thing we do is better than any other similar thing and this hero panel will convince you of that, just by having a glorious background image.',
    )
    button = blocks.CharBlock(
        required=False,
        max_length=100,
        label='Button text',
        default='Get in touch',
    )
    button_link = blocks.URLBlock(
        required=False,
        label='Button link'
    )
    image = APIImageChooserBlock(
        required=False,
        label='Image',
        width='fill-960x720'
    )

    class Meta:
        """ Meta data """
        template = 'blocks/hero_section.html'
        label = 'Hero Section'


# Testimonial Section Block
class TestimonialSectionBlock(blocks.StructBlock):
    """ Testimonial Section Block  """
    heading = blocks.CharBlock(
        required=False,
        max_length=80,
        label='Feature',
        default='Super Awesome Feature',
    )
    subheading = blocks.CharBlock(
        required=False,
        max_length=100,
        label='Subheading',
        default='Super Awesome Hero Subheading',
    )
    description = blocks.TextBlock(
        required=False,
        max_length=400,
        label='Description',
        default='The thing we do is better than any other similar thing and this hero panel will convince you of that, just by having a glorious background image.',
    )
    testimonials = blocks.ListBlock(
        blocks.StructBlock([
            ("image", ImageChooserBlock(required=False, label="Image")),
            ("name", blocks.CharBlock(required=False, max_length=100)),
            ("category", blocks.CharBlock(required=False, max_length=100)),
            ("content", blocks.TextBlock(required=True, max_length=300)),
        ])
    )

    class Meta:
        """ Meta data """
        template = 'blocks/testimonial_section.html'
        label = 'Testimonial Section'


# Logo Cloud Blocks

class LogoCloudBlock(blocks.StructBlock):
    """ LogoCloud Block """
    logos = blocks.ListBlock(
        blocks.StructBlock([
            ("image", ImageChooserBlock(required=True, label="Image")),
        ])
    )

    class Meta:
        """ Meta data """
        template = 'blocks/logo_cloud.html'
        label = 'Logo Cloud'


# Service Section Block

class ServiceSectionBlock(blocks.StructBlock):
    """ Service Section Block """
    heading = blocks.CharBlock(required=True, max_length=100, label="Title")
    layout = blocks.ChoiceBlock(
        choices=(
            ('service_with_icon', 'Services with Icons'),
            ('service_with_image', 'Services with Images'),
        ),
        default='services_with_icon'
    )
    services = blocks.ListBlock(
        blocks.StructBlock([
            ("icon", blocks.CharBlock(required=False)),
            ('image', APIImageChooserBlock(
                required=False,
                label='Image',
                width='fill-320x320',
            )),
            ("heading", blocks.CharBlock(required=True, max_length=100)),
            ("description", blocks.TextBlock(required=True, max_length=300)),
        ])
    )

    class Meta:
        """ meta data """
        template = 'blocks/service_section.html'
        label = 'Service Section'


# Feature Section Block

class FeatureSectionBlock(blocks.StructBlock):
    """ Feature Section Block """
    heading = blocks.CharBlock(required=True, max_length=100, label="Title")
    features = blocks.ListBlock(
        blocks.StructBlock([
            ("icon", blocks.RawHTMLBlock(required=True, rows=5)),
            ("heading", blocks.CharBlock(required=True, max_length=100)),
            ("description", blocks.TextBlock(required=True, max_length=300)),
        ])
    )

    class Meta:
        """ meta data """
        template = 'blocks/feature_section.html'
        label = 'Feature Section'


# Team Section Block
class TeamSectionBlock(blocks.StructBlock):
    """ Team Section Block """
    heading = blocks.CharBlock(required=True, max_length=100, label="Title")
    members = blocks.ListBlock(
        blocks.StructBlock([
            ("name", blocks.CharBlock(required=True, max_length=100)),
            ("position", blocks.CharBlock(required=True, max_length=100)),
            ("image", APIImageChooserBlock(
                required=False,
                label='Portrait Image',
                width='fill-290x320',
            )),
        ])
    )

    class Meta:
        """ meta data """
        label = 'Team Section'


# Coming Soon Section Block
class ComingSoonSectionBlock(blocks.StructBlock):
    """ Coming Soon Section Block """
    heading = blocks.CharBlock(required=True, max_length=100, label="Title")
    description = blocks.RichTextBlock(
        required=False,
        max_length=400,
        label='Description',
        default='The thing we do is better than any other similar thing and this hero panel will convince you of that, just by having a glorious background image.',
    )
    image = APIImageChooserBlock(
        required=False,
        label='Image',
        width='fill-960x720',
    )
    timer = blocks.DateTimeBlock(required=True)

    class Meta:
        """ meta data """
        label = 'Coming Soon Section'


# Counter Section Block
class CounterSectionBlock(blocks.StructBlock):
    """ Counter Section Block """
    heading = blocks.CharBlock(required=True, max_length=100, label="Title")
    description = blocks.RichTextBlock(
        required=False,
        max_length=400,
        label='Description',
        default='The thing we do is better than any other similar thing and this hero panel will convince you of that, just by having a glorious background image.',
    )
    counters = blocks.ListBlock(
        blocks.StructBlock([
            ("heading", blocks.TextBlock(required=True, max_length=300)),
            ("count", blocks.IntegerBlock(required=True, max_value=1000000)),
            ("unit", blocks.CharBlock(required=True, max_length=30)),
        ])
    )

    class Meta:
        """ meta data """
        template = 'blocks/counter_section.html'
        label = 'Counter Section'


# CTA Section
class CTASection(blocks.StructBlock):
    """ CTA Section Block """
    layout = blocks.ChoiceBlock(
        choices=(
            ('video-1', 'Video CTA'),
        ),
        required=True,
        default='video-1',
    )
    image = APIImageChooserBlock(
        required=False,
        label='Background Image',
        width='fill-1920x720',
    )

    heading = blocks.CharBlock(
        required=False,
        max_length=80,
        label='Heading',
    )
    description = blocks.TextBlock(
        required=False,
        max_length=400,
        label='Description',
        default='The thing we do is better than any other similar thing and this hero panel will convince you of that, just by having a glorious background image.',
    )
    button = blocks.CharBlock(
        required=False,
        max_length=20,
        label='Button text',
        default='Get in touch',
    )
    button_link = blocks.URLBlock(required=False, label='Button Link')

    class Meta:
        """ meta data """
        template = 'blocks/cta_section.html'
        label = 'CTA Section'


# Pricing Section
class PricingSectionBlock(blocks.StructBlock):
    """ Pricing Section Block """
    heading = blocks.CharBlock(required=False, max_length=100, label="Heading")
    description = blocks.RichTextBlock(
        required=False,
        max_length=400,
        label='Description',
        default='The thing we do is better than any other similar thing and this hero panel will convince you of that, just by having a glorious background image.',
    )
    image = APIImageChooserBlock(
        required=False,
        label='Image',
        width='fill-290x320',
    )
    pricings = blocks.ListBlock(
        blocks.StructBlock([
            ("heading", blocks.CharBlock(required=True, max_length=100)),
            ("price", blocks.CharBlock(required=True, max_length=100)),
            ("type", blocks.ChoiceBlock(required=True, choices=(
                ('hourly', 'Hourly'),
                ('monthly', 'Monthly'),
                ('unique', 'Unique')
            ))),
            ("description", blocks.RichTextBlock(
                required=False,
                max_length=400,
                label='Description',
                default='The thing we do is better than any other similar thing and this hero panel will convince you of that, just by having a glorious background image.',
            )),
        ])
    )

    class Meta:
        """ meta data """
        label = 'Pricing Section'


# Pricing Section
class HTMLSectionBlock(blocks.StructBlock):
    """ Pricing Section Block """
    html = blocks.RawHTMLBlock(
        required=False,
        max_length=10000,
        label="HTML Code",
    )

    class Meta:
        """ meta data """
        label = 'HTML Section'


# Blog Section
class PortfolioSectionBlock(blocks.StructBlock):
    """ Blog Section Block """
    custom_classes = blocks.CharBlock(
        required=False,
        max_length=100,
        label="Classes"
    )
    heading = blocks.CharBlock(
        required=False,
        max_length=100,
        label="Heading"
    )
    description = blocks.TextBlock(
        required=False,
        max_length=400,
        label='Description',
        default='The thing we do is better than any other similar thing and this hero panel will convince you of that, just by having a glorious background image.',
    )
    projects = blocks.ListBlock(
        blocks.StructBlock([
            ("title", blocks.CharBlock(required=True, max_length=100)),
            ("description", blocks.CharBlock(required=True, max_length=200)),
            ("image", ImageChooserBlock(required=True, label="Image")),
            ("link", blocks.URLBlock(required=True, max_length=100)),
        ])
    )

    class Meta:
        """ meta data """
        template = 'blocks/portfolio_section.html'
        label = 'Portfolio Section'
