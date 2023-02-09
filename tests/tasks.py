from invoke import task


@task
def test(ctx):
    ctx.run("robot --argumentfile robottest/local-dev.args robottest")

@task
def container_test(ctx):
    ctx.run("robot --argumentfile robottest/container.args robottest")
