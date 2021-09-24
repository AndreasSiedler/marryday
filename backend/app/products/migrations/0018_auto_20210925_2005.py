# Generated by Django 3.1.13 on 2021-09-25 20:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0017_auto_20210920_1302'),
    ]

    operations = [
        migrations.AddField(
            model_name='product',
            name='topic',
            field=models.ManyToManyField(blank=True, related_name='topics', to='products.ProductCategory'),
        ),
        migrations.AlterField(
            model_name='productcategory',
            name='short_description',
            field=models.CharField(blank=True, max_length=500),
        ),
    ]
