# Installing and setting up the software

It is possible to run this software either with Docker or by installing and running it locally.

## Requirements

- `Docker (with compose)`  
or
- `node:^16.17.0`
- `npm:^8.19.0`
- `python:^3.10`
- `pip3`
- `PostgreSQL`

## Production version

First, create `.env` files for Docker, frontend and backend:

```.env
# Docker .env file, put this in the root directory

POSTGRES_USER=
POSTGRES_PASSWORD=
POSTGRES_DB=
```
```.env
# Backend .env file, put this in backend/

OAUTH_CLIENT_ID=<Google OAuth client ID, get it from https://console.developers.google.com>
POSTGRES_USER=
POSTGRES_PASSWORD=
POSTGRES_DB=
POSTGRES_HOST=db # hostname defined in docker-compose.production.yml
POSTGRES_PORT=5432
DJANGO_SECRET_KEY='<some secret key>'
CORS_ORIGIN='[<production url, e.g. "https://cast23.lol">]'
ALLOWED_HOST='[<production host, e.g. "cast23.lol">]'
DEBUG='False'
```
```.env
# Frontend .env file, put this in frontend/

REACT_APP_BACKEND_URL=<backend url, e.g. https://cast23.lol/>
REACT_APP_GOOGLE_CLIENT_ID=<same OAuth clientID as on the backend>
```

**Please note** that the values for psql user, pw and db should be the same for Docker and for backend.

### Starting the software

After creating the .env files the software can be started by with the following command:

```bash
docker compose -f docker-compose.production.yml up -d
```

Additionally, depending on your production environment, you may need to configure the domain name in Nginx as well.

## Development version

You can develop the software either with Docker by adding mount point to the working directories or e.g. by using VSCode's Docker extension, or by installing and running it locally.

Use similar .env files with production version, but change following values:

```.env
POSTGRES_HOST=<psql host, e.g. localhost> # for backend
CORS_ORIGIN='["http://127.0.0.1","http://127.0.0.1:3000","http://localhost","http://localhost:3000"]' # for backend
ALLOWED_HOST='["127.0.0.1","127.0.0.1:3000","localhost","localhost:3000"]' # for backend
DEBUG='True' # for backend, not necessary but helps a lot

REACT_APP_BACKEND_URL=http://127.0.0.1:8000/ # for frontend
```

### Local run

You can use either PostgreSQL-container or native installed version. However, make sure that backend has database information (username, database etc) in it's .env file.

#### Installation

Install dependencies:

```bash
# backend
~/cast/backend$ python3 -m venv venv && source venv/bin/activate
~/cast/backend$ pip install -r requirements.txt

#frontend
~/cast/frontend$ npm install
```

Run initial actions:

```bash
~/cast/backend$ ./manage.py migrate
```

Start services:

```bash
# backend
~/cast/backend$ ./manage.py runserver # runs server in port 8000

# frontend
~/cast/frontend$ npm start # runs server in port 3000
```

### Developing with Docker

This will be left as an exercise to the reader. However, here are some tips:

 - Make sure you have created those three .env files
 - docker-compose.tests.yml might be best for that

## Other

### Tests in containers

There is `docker-compose.tests.yml` for running robot tests in containers, but it does not work well, so can't really recommend using it.

### Test data

There is also test data for the software in `testdata.json`. It is very useful when testing new features or software at all, but it should be updated every once when making new migrations in backend.

Test data is imported into software automatically in `docker-compose.staging.yml` and `docker-compose.tests.yml` and they will break if test data is out of date.

After new migrations, export latest data with:

```bash
~/cast/backend$ ./manage.py dumpdata > testdata.json
```

When installing and using the software locally it is possible to import testdata with:

```bash
~/cast/backend$ ./manage.py loaddata testdata.json
```

### Important notice
To enable Robot tests a backdoor has been created for development environment. The purpose of the backdoor is to allow Robot tests to bypass Google Authentication. It is important to disable this route (Roboroute) before pushing the application into production! 
