# Generated by Django 3.1.13 on 2021-09-25 20:37

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0019_auto_20210925_2020'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='product',
            name='basics',
        ),
        migrations.RemoveField(
            model_name='product',
            name='category',
        ),
    ]
