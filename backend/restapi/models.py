from django.db import models


class Employees(models.Model):
    first_name = models.TextField()
    last_name = models.TextField()
    email = models.TextField()
    phone_number = models.TextField(null=True)
    location_country = models.TextField(null=True)
    location_city = models.TextField(null=True)
    worktime_allocation = models.IntegerField(null=True)
    allocation_until = models.DateField(null=True)
    wants_to_do = models.TextField(null=True)
    wants_not_to_do = models.TextField(null=True)

class Techs(models.Model):
    tech_name = models.TextField()
    def __str__(self):
        return self.tech_name


class Employee_tech_skills(models.Model):
    class Skill(models.IntegerChoices):
        WANTS_TO_LEARN = 1
        CAN_WORK_WITH = 2
        PROFICIENT = 3

    class Meta:
        ordering = ['tech']
   
    employee = models.ForeignKey(Employees, related_name='skills', on_delete=models.CASCADE)
    # skill_level = models.IntegerField()
    tech = models.ForeignKey(Techs, related_name='tech', on_delete=models.CASCADE)
    skill_level = models.IntegerField(choices=Skill.choices)

    def __str__(self):
        return f"{self.tech}: {self.skill_level}"        
