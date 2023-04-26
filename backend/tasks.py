from invoke import task

@task
def run(ctx):
    ctx.run("python3 manage.py runserver")

@task
def makemigrations(ctx):
    ctx.run("python3 manage.py makemigrations")

@task
def migrate(ctx):
    ctx.run("python3 manage.py migrate")

@task
def coverage_test(ctx):
    ctx.run("coverage run --source='.' manage.py test restapi")
    ctx.run("coverage report")