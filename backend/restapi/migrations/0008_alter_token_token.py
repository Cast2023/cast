# Generated by Django 4.1.5 on 2023-04-19 08:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('restapi', '0007_alter_token_token'),
    ]

    operations = [
        migrations.AlterField(
            model_name='token',
            name='token',
            field=models.CharField(default='SPZ40CyKqjNngUs4cewJjFVfyags25RCrEwyvL7exULmJkzAAxNIzHMJsFPDFSFH', max_length=64, unique=True),
        ),
    ]
