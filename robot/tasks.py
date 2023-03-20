from invoke import task


@task
def test(ctx):
    ctx.run("robot --argumentfile variables/local-dev.args robottest")

@task
def container_test(ctx):
    ctx.run("robot --argumentfile variables/container.args robottest")
