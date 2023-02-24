from invoke import task


@task
def coverage_test(ctx):
    ctx.run("coverage run --source='.' manage.py test restapi")