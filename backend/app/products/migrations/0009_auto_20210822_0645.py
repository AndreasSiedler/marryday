# Generated by Django 3.1.13 on 2021-08-22 06:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0008_auto_20210822_0640'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='address',
            field=models.CharField(blank=True, default='', max_length=150),
        ),
        migrations.AlterField(
            model_name='product',
            name='public_email',
            field=models.EmailField(blank=True, default='', max_length=150),
        ),
        migrations.AlterField(
            model_name='product',
            name='public_phone',
            field=models.CharField(blank=True, default='', max_length=150),
        ),
        migrations.AlterField(
            model_name='product',
            name='slug',
            field=models.CharField(blank=True, default='', max_length=150),
        ),
        migrations.AlterField(
            model_name='product',
            name='street_number',
            field=models.CharField(blank=True, default='', max_length=150),
        ),
    ]
