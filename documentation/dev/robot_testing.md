## Robot testing in CAST

Robot tests could be run as following (<ins>first, make sure you have your venv activated and you are in a project directory</ins>):

```bash
cd tests/
pip install -r requirements.txt
invoke test
```

### Argument files

Robot tests are using argument files which are providing variables to test files and thus makes tests independent of runtime environments. It is also easier to expand tests when all variables are on their own file.

Structure of the file could be something like this:

```
--variable BROWSER:chrome
--variable HOSTNAME:127.0.0.1
--variable PORT:3000
--variable SETUP:local-dev.Start Django and open browser
--variable RESOURCE:local-dev.robot
```

### Expanding tests

Just add your scenarios to existing files or create new files if necessary and update new variables into [container.args](../../tests/robottest/container.args) and [local-dev.args](../../tests/robottest/local-dev.args) files.