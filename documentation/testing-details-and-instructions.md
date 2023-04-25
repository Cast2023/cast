# Automated testing

## Acceptance tests



## Unittests

### Frontend

### Backend

Backend unittests tests focus on testing the features provided by the `DRF API` (Django Rest Framework). The available features are extensively tested. 

Some minor functionalities have been omitted from tests. These include
- Selected functionalities from the authentication middleware 
- Selected conditional branches related to filtering parameters
- Updating an expired user token. 

Main motivation for exclusion has been temporal restrictions and priorization decisions. 

Invoking tests locally:

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
```bash
pip install -r requirements.txt
```
5. Use the following command to run the tests
```bash
invoke coverage-test
```



