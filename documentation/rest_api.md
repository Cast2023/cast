# REST API

Cast Application provides a REST API courtesy to Django REST framework.

## Consultants

To access all consultants use the path

```
<application address>/api/consultant/
```

The data is serialized in standard JSON-format:

```json
[
  {
    "id": 1,
    "skills": [
      {
        "skill_level": 1,
        "tech": 1,
        "tech_name": "Python"
      },
      {
        "skill_level": 3,
        "tech": 4,
        "tech_name": "Fortran"
      },
      {
        "skill_level": 2,
        "tech": 7,
        "tech_name": "PosgreSQL"
      }
    ],
    "first_name": "Alex",
    "last_name": "Consultant",
    "email": "alex@gmail.com",
    "phone_number": "+358411234567",
    "location_country": "Finland",
    "location_city": "Helsinki",
    "worktime_allocation": 40,
    "allocation_until": null,
    "wants_to_do": "Exciting projects with Django.",
    "wants_not_to_do": "Projects with Flask."
  }
]
```

### Search for matches

The API provides an option to search consultants:

```
<application address>/api/consultant/?search=<string>
```

The search returns matches in which one of the following fields contains the search string:

```
['first_name', 'last_name', 'location_city', 'location_country', 'email', 'phone_number', 'worktime_allocation', 'wants_to_do', 'wants_not_to_do']
```

### Filter based on given parameters:

The API provides an option to filter results. Filtering is done by giving parameters

```
<application address>/api/consultant/?<field>=<string>
```

For instance to filter based on fields `first_name` and `last_name` would happen with

```
<application address>/api/consultant/?first_name=<string>&last_name=<string>
```

Results can be filtered based on the following parameters:

```
['id','first_name', 'last_name', 'location_city', 'location_country', 'email', 'phone_number', 'worktime_allocation', 'wants_to_do', 'wants_not_to_do']
```
