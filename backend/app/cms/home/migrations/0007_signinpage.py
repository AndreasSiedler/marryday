# Generated by Django 3.1.7 on 2021-03-09 11:58

from django.db import migrations, models
import django.db.models.deletion
import wagtailmetadata.models


class Migration(migrations.Migration):

    dependencies = [
        ('wagtailcore', '0059_apply_collection_ordering'),
        ('wagtailimages', '0022_uploadedimage'),
        ('home', '0006_signuppage_image'),
    ]

    operations = [
        migrations.CreateModel(
            name='SigninPage',
            fields=[
                ('page_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='wagtailcore.page')),
                ('heading', models.CharField(max_length=255)),
                ('description', models.TextField(max_length=1055)),
                ('image', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='+', to='wagtailimages.image')),
                ('search_image', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='+', to='wagtailimages.image', verbose_name='Search image')),
            ],
            options={
                'abstract': False,
            },
            bases=(wagtailmetadata.models.MetadataMixin, 'wagtailcore.page', models.Model),
        ),
    ]
