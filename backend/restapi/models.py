from django.db import models


class Employees(models.Model):
    '''
        To be considered: Which fields can be null. 
    '''
    first_name = models.TextField()
    last_name = models.TextField()
    email = models.TextField(unique=True)
    phone_number = models.TextField(null=True)
    location_country = models.TextField(null=True)
    location_city = models.TextField(null=True)
    worktime_allocation = models.IntegerField(null=True)
    allocation_until = models.DateField(null=True)
    wants_to_do = models.TextField(null=True)
    wants_not_to_do = models.TextField(null=True)

class Techs(models.Model):
    '''
        Good source on ManyToMany-relationship and extra fields: 
        https://docs.djangoproject.com/en/4.1/topics/db/models/#extra-fields-on-many-to-many-relationships
    '''
    employee = models.ManyToManyField(Employees, through='Employee_tech_skills')
    tech_name = models.TextField(unique=True)
    def __str__(self):
        return self.tech_name

class Certificate(models.Model):
    employee = models.ManyToManyField(Employees, through='Employee_certificates')
    vendor = models.TextField(null=True)
    certificate_name = models.TextField(unique=True)

class Employee_certificates(models.Model):
    class Meta:
        ordering = ['cert_id']
    
    employee = models.ForeignKey(Employees, related_name='certificates', on_delete=models.CASCADE)
    cert = models.ForeignKey(Certificate, related_name='cert_id', on_delete=models.CASCADE)
    valid_until = models.DateField(null=True)


class Employee_tech_skills(models.Model):
    class Skill(models.IntegerChoices):
        WANTS_TO_LEARN = 1
        CAN_WORK_WITH = 2
        PROFICIENT = 3

    class Meta:
        ordering = ['tech']
   
    employee = models.ForeignKey(Employees, related_name='skills', on_delete=models.CASCADE)
    tech = models.ForeignKey(Techs, related_name='tech', on_delete=models.CASCADE)
    skill_level = models.IntegerField(choices=Skill.choices)
    tech_preference = models.BooleanField(null=True)      

class Project(models.Model):
    employee = models.ManyToManyField(Employees, through='Employee_projects')
    project_name = models.TextField(null=True)
    project_start_date = models.DateField(null=True)
    project_end_date = models.DateField(null=True)
    confidential = models.BooleanField(null=True)

class Employee_projects(models.Model):
    class Meta:
        ordering = ['project']
    
    employee = models.ForeignKey(Employees, related_name='projects', on_delete=models.CASCADE)
    project = models.ForeignKey(Project, related_name='employee_project', on_delete=models.CASCADE)
    employee_participation_start_date = models.DateField(null=True)
    employee_participation_end_date = models.DateField(null=True)
    allocation_busy = models.IntegerField(null=True)

