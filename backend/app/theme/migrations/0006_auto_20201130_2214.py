# Generated by Django 3.1.3 on 2020-11-30 22:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('theme', '0005_auto_20201130_2202'),
    ]

    operations = [
        migrations.AddField(
            model_name='themesettings',
            name='header_cta_icon',
            field=models.CharField(blank=True, max_length=500, null=True),
        ),
        migrations.AddField(
            model_name='themesettings',
            name='header_cta_text',
            field=models.CharField(blank=True, max_length=500, null=True),
        ),
    ]