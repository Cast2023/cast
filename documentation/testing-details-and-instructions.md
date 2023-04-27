# Automated testing

## Acceptance tests



## Unittests

### Backend

The purpose of backend unittests is to thoroughly test the features provided with the `Django Rest Framework (DRF) API`. The available `API` features are tested extensively, resulting in a test coverage of over 80 percent.

However, some minor functionalities have been omitted from the tests. These include selected functionalities from the authentication middleware, selected conditional branches related to filtering parameters, and updating an expired user token.

These exclusions were made due to time constraints and prioritization decisions. Despite these omissions, the majority of the `API` features have been tested to ensure the reliability and stability of the backend system.

Invoking backend unittests locally:

1. Clone the project
2. Navigate to directory backend/
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

Invoking backend unittests locally:
1. Clone the project
2. Navigate to directory backend/
3. Setup and activate Python virtual environment (venv) e.g.
```
python3 -m venv venv
```
```
source venv/bin/activate
```
4. Navigate to directory ../frontend/
5. Install dependencies from `react` with 
```
npm install
```
6. Run reducer's unittests and check the report
```
npm test
```
