# Backend README.md

## Tests
To run backend unit tests, make sure you are in the backend directory.  

Unit tests can be run with two alternative commands:  

To run tests in venv, you can use the invoke command:
```
invoke coverage-test
```

To run tests without venv:  
```
coverage run --source='.' manage.py test restapi
```


To collect coverage report type

```
coverage report
```
