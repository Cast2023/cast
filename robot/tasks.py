from invoke import task


@task
def test(ctx):
    ctx.run("robot --argumentfile variables/local-dev.args tests")

@task
def container_test(ctx):
    ctx.run("robot --argumentfile variables/container.args tests")

@task
def dryrun_test(ctx):
    ctx.run("robot --dryrun --argumentfile variables/local-dev.args tests")
