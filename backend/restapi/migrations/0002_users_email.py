# Generated by Django 4.1.5 on 2023-02-01 15:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('restapi', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='users',
            name='email',
            field=models.TextField(default=''),
            preserve_default=False,
        ),
    ]
