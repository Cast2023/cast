# Generated by Django 4.1.5 on 2023-04-17 12:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('restapi', '0005_employees_last_login_token'),
    ]

    operations = [
        migrations.AddField(
            model_name='token',
            name='is_integration_token',
            field=models.BooleanField(null=True),
        ),
        migrations.AddField(
            model_name='token',
            name='token_name',
            field=models.TextField(null=True),
        ),
    ]
