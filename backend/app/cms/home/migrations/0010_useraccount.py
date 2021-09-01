# Generated by Django 3.1.7 on 2021-03-16 16:13

import cms.home.models
from django.db import migrations, models
import django.db.models.deletion
import wagtail.core.blocks
import wagtail.core.fields
import wagtailmetadata.models


class Migration(migrations.Migration):

    dependencies = [
        ('wagtailimages', '0022_uploadedimage'),
        ('wagtailcore', '0059_apply_collection_ordering'),
        ('home', '0009_remove_page404_button_link'),
    ]

    operations = [
        migrations.CreateModel(
            name='UserAccount',
            fields=[
                ('page_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='wagtailcore.page')),
                ('heading', models.CharField(max_length=255)),
                ('description', models.TextField(max_length=1055)),
                ('cards', wagtail.core.fields.StreamField([('card_list', wagtail.core.blocks.ListBlock(wagtail.core.blocks.StructBlock([('title', wagtail.core.blocks.CharBlock(max_length=100, required=True)), ('link', cms.home.models.APIPageChooserBlock()), ('icon', wagtail.core.blocks.CharBlock(max_length=100, required=True)), ('content', wagtail.core.blocks.TextBlock(max_length=500, required=True))])))], blank=True, null=True)),
                ('search_image', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='+', to='wagtailimages.image', verbose_name='Search image')),
            ],
            options={
                'abstract': False,
            },
            bases=(wagtailmetadata.models.MetadataMixin, 'wagtailcore.page', models.Model),
        ),
    ]