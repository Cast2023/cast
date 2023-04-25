# Automated testing

## Acceptance tests



## Unittests

### Frontend

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



