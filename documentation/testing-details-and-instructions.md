# Automated testing

## Acceptance tests

Acceptance tests are implemented with `Robot Framework` using `Selenium library`. In order to test the application with a realistic user scenario, we use `roboroute` defined in `frontend/src/Components/Roboroute.js`.

Due to difficulties with testing compatibility & techniques, `Google Login` & the use of `Material UI Datepicker` element were deliberately omitted from acceptance testing.

Robot test directory has the following structure:
```
robot
│
└───resources
|       common.resource
|
└───tests
│   │   api_view.robot
│   │   navigation.robot
│   │   search_view.robot
│   │
│   └───profile
│           certs.robot
│           personal_info.robot
│           projects.robot
│           tech_skills.robot
│   
└───variables
        container.args
        local-dev.args
```

Tests have been divided into separate directories & files, each file testing a defined part or feature of the application. There are some common keywords defined in `common.resource`, in addition part of the test files have some unique keywords included. 

Tests were intended to be written in as natural language as possible but due to several constraints reading part of the tests may take some effort. These constraints include timing issues with Selenium (need to use `Sleep` & excessive amount of `Wait for`-commands), complex structure of `Material UI`-elements and general time constraint with refactoring of tests.

In addition to the challenges mentioned above, robot tests face some issues with continuous integration in GitHub actions. CI tests are run in Docker and possibly due to this tests sometimes generate differing results compared to running tests locally. Tests may fail randomly, usually due to timing issues with `Selenium`. This is more likely to happen in CI than in local environment. Despite of generous fixing efforts, some tests seem to be persistent to failure in CI whereas there are no issues locally. Inconsistency with test run results make it challenging to locate problems. If we were to redo robot testing all over again, we would try using `Browser` library instead of `Selenium`, since we've heard that `Browser` doesn't suffer from timing / syncing  issues to the extent that `Selenium` does.

You can run the acceptance tests locally with following instructions:

1. Clone the project
2. Navigate to directory `backend/`
3. Setup and activate Python virtual environment (venv) e.g. (This virtual environment serves for both acceptance & unit tests)
```
python3 -m venv venv
```
```
source venv/bin/activate
```
4. Install dependencies from `requirements.txt` with
```
pip install -r requirements.txt
```
5. Make sure you have started the software using the deploying instructions 
6. Navigate to directory `../robot/`
7. Use the following command to run the tests
```
invoke test
```

### Important notice
To enable Robot tests a backdoor has been created for development environment. The purpose of the backdoor is to allow Robot tests to bypass Google Authentication. It is important to disable this route (Roboroute) before pushing the application into production! 

## Unittests

### Backend

The purpose of backend unit tests is to thoroughly test the features provided with the `Django Rest Framework (DRF) API`. The available `API` features are tested extensively, resulting in a test coverage of over 90 percent.

However, some minor functionalities have been omitted from the tests. These include selected functionalities from the authentication middleware, selected conditional branches related to filtering parameters, and updating an expired user token.

These exclusions were made due to time constraints and prioritization decisions. Despite these omissions, the majority of the `API` features have been tested to ensure the reliability and stability of the backend system.

Invoking backend unit tests locally:

1. Clone the project
2. Navigate to directory `backend/`
3. Setup and activate Python virtual environment (venv) e.g.
```
python3 -m venv venv
```
```
source venv/bin/activate
```
4. Install dependencies from `requirements.txt` with
```shell
pip install -r requirements.txt
```
5. Use the following command to run the tests and to create a coverage report
```shell
invoke coverage-test
```

### Frontend

The Frontend app's states are managed by reducers. The purpose of frontend reducer's unit tests is to test the behavior of the updating of the application state in isolation, independent of any other parts of the application. Reducers are tested with the `Jest framework's API`. The code imports Jest's `test` function to define a test case and uses `describe` to group related tests. The code also imports `deepFreeze`, a library that helps ensure that the reducer's state is not modified directly during testing.

Each reducer slices have its own test cases. However, some states have been omitted from the test. These exclusions were made due to time constraints and prioritization decisions.

Invoking backend unit tests locally:
1. Clone the project
2. Navigate to directory `backend/`
3. Setup and activate Python virtual environment (venv) e.g.
```
python3 -m venv venv
```
```
source venv/bin/activate
```
4. Navigate to directory `../frontend/`
5. Install dependencies from `react` with 
```
npm install
```
6. Run reducers' unit tests and check the report
```
npm test
```
