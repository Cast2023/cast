#!/bin/sh

# Collect static files
echo "Collect static files"
python manage.py makemigrations

# Apply database migrations
echo "Apply database migrations"
python manage.py migrate

if [[ -z "${IS_TEST}" && -z "${IS_STAGING}" ]]; then
    # Activate production environment
    echo "Production environment activated..."
elif [[ -z "${IS_TEST}" ]]; then
    # Activate staging environment with test data
    echo "Staging environment activated..."
    python manage.py loaddata testdata.json
else
    # Activate testing environment
    echo "Testing environment activated..."
    # Load test data and run unit tests
    python manage.py loaddata testdata.json 
    python manage.py test
fi

# Start server
echo "Starting server"
python manage.py runserver 0.0.0.0:8000
