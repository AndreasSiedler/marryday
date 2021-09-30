# Generated by Django 3.1.13 on 2021-09-25 20:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0020_auto_20210925_2037'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='product',
            name='topic',
        ),
        migrations.AddField(
            model_name='product',
            name='category',
            field=models.ManyToManyField(blank=True, related_name='products', to='products.ProductCategory'),
        ),
    ]