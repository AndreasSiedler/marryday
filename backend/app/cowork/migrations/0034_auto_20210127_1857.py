# Generated by Django 3.1.5 on 2021-01-27 18:57

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('cowork', '0033_auto_20210126_0102'),
    ]

    operations = [
        migrations.CreateModel(
            name='District',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('is_active', models.BooleanField(default=False)),
                ('title', models.CharField(max_length=150)),
                ('postcode', models.CharField(blank=True, max_length=50, null=True, unique=True)),
                ('slug', models.CharField(blank=True, max_length=150, null=True)),
            ],
            options={
                'verbose_name_plural': 'Districts',
            },
        ),
        migrations.CreateModel(
            name='Province',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('is_active', models.BooleanField(default=False)),
                ('title', models.CharField(max_length=150, unique=True)),
                ('slug', models.CharField(blank=True, max_length=150, null=True)),
            ],
        ),
        migrations.AlterModelOptions(
            name='country',
            options={'verbose_name_plural': 'Countries'},
        ),
        migrations.RemoveField(
            model_name='location',
            name='state',
        ),
        migrations.AlterField(
            model_name='city',
            name='postcode',
            field=models.CharField(max_length=50, unique=True),
        ),
        migrations.AlterField(
            model_name='city',
            name='title',
            field=models.CharField(max_length=150),
        ),
        migrations.AlterField(
            model_name='location',
            name='country',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.PROTECT, related_name='country_locations', to='cowork.country'),
        ),
        migrations.DeleteModel(
            name='State',
        ),
        migrations.AddField(
            model_name='province',
            name='country',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='country_states', to='cowork.country'),
        ),
        migrations.AddField(
            model_name='district',
            name='locality',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='locality_districts', to='cowork.city'),
        ),
        migrations.AddField(
            model_name='city',
            name='province',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='province_localities', to='cowork.province'),
        ),
        migrations.AddField(
            model_name='location',
            name='district',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.PROTECT, related_name='district_locations', to='cowork.district'),
        ),
        migrations.AddField(
            model_name='location',
            name='province',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.PROTECT, related_name='province_locations', to='cowork.province'),
        ),
    ]
