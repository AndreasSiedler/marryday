# Generated by Django 3.1.4 on 2021-01-05 21:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cowork', '0011_location_city'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='city',
            options={'verbose_name_plural': 'Cities'},
        ),
        migrations.AddField(
            model_name='booking',
            name='payment_intent_id',
            field=models.CharField(blank=True, max_length=27),
        ),
    ]