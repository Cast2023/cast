from django.db import models

class Skeleton(models.Model):
    content = models.TextField()

class Users(models.Model):
    first_name = models.TextField()
    last_name = models.TextField()


class Employee_projects(models.Model):
    user = models.ForeignKey(Users, on_delete=models.CASCADE)
    allocation_busy = models.TextField()

class Techs(models.Model):
    tech_name = models.TextField()

class Employee_tech_skills(models.Model):
    class Skill(models.IntegerChoices):
        WANTS_TO_LEARN = 1
        CAN_WORK_WITH = 2
        PROFICIENT = 3

    user = models.ForeignKey(Users, on_delete=models.CASCADE)
    tech = models.ForeignKey(Techs, on_delete=models.CASCADE)
    skill_level = models.IntegerField(choices=Skill.choices)



