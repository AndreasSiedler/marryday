# Generated by Django 3.1.13 on 2021-09-18 06:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('theme', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='themesettings',
            name='custom_css',
            field=models.TextField(blank=True, max_length=2000, null=True),
        ),
    ]