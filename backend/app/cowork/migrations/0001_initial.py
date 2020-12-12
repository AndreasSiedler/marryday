# Generated by Django 3.1.4 on 2020-12-08 09:10

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Location',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=150)),
                ('address', models.CharField(max_length=150)),
                ('postcode', models.CharField(max_length=50)),
                ('city', models.CharField(max_length=150)),
            ],
        ),
        migrations.CreateModel(
            name='RentObject',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=150)),
                ('type', models.CharField(choices=[('phone', 'Phone'), ('desktop', 'Desktop'), ('meeting', 'Meetgin')], max_length=150)),
                ('location', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='locations', to='cowork.location')),
            ],
        ),
        migrations.CreateModel(
            name='Booking',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('start', models.DateTimeField()),
                ('end', models.DateTimeField()),
                ('rent_object', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='bookings', to='cowork.rentobject')),
            ],
        ),
    ]