# Generated by Django 3.1.8 on 2021-04-29 04:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user_account', '0004_auto_20210401_1733'),
    ]

    operations = [
        migrations.AddField(
            model_name='accountpaymentpage',
            name='stripe_account_description',
            field=models.TextField(blank=True, max_length=1055, null=True),
        ),
    ]
