# Generated by Django 3.1.5 on 2021-01-26 00:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cowork', '0031_auto_20210125_2302'),
    ]

    operations = [
        migrations.AddField(
            model_name='openinghours',
            name='open_24',
            field=models.BooleanField(default=False),
        ),
    ]