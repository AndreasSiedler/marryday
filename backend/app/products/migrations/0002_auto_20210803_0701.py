# Generated by Django 3.1.13 on 2021-08-03 07:01

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0001_initial'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='Location',
            new_name='Product',
        ),
    ]