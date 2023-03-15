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
    "certificates": [
      {
        "vendor": "AWS",
        "certificate": "AWS Certified Cloud Practitioner",
        "valid_until": "2021-12-31"
      }
    ]
    "projects": [
      {
        "project_name": "Cast 2023",
        "project_start_date": "2023-01-01",
        "employee_participation_start_date": "2023-03-01",
        "employee_participation_end_date": "2023-05-15",
        "project_end_date": "2023-05-15",
        "allocation_busy": 80,
        "confidential": "False"
      }
    ]
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

## Filter based on given parameters:

The API provides options to filter results. Filtering is done by giving parameters

```
<application address>/api/consultant/?<field>=<string>
```

Results can be filtered with the following parameters. All string searches are case-insensitive and filter based on partial matches (field contains the given string)

```
first_name=<str>                            # First name contains
last_name=<str>                             # Last name contains
tech=<str>                                  # tech skill name contains (e.g. python)
tech_and_pref=<str>,<str>                   # tech skill and preference (true, false)*
tech_and_level=<str>,<str>                  # tech skill and level (1,2,3)
project=<str>                               # Project name contains
cert_vendor=<str>                           # Certificate vendor contains
certificate=<str>                           # Certificate name contains
cert_valid_until__gte=<YYYY-MM-DD>          # Certificate validity greater than or equal
cert_valid_until__lte=<YYYY-MM-DD>          # Certificate validity less than or equal
```

The parameters can be chained together. For instance

```
api/consultant?tech=python&cert_vendor=aws&cert_valid_until_gte=2024-12-31
```

Additionally the same parameter can be used multiple times

```
api/consultant?tech=python&tech=javascript
```

**Parameters with multiple arguments**
Arguments must be separated with a comma (",").

`tech_and_pref` converts other values than lowercase "true" to `False` for the second argument given. If second parameter is missing, second parameter is considered to be `True`. Examples:

```
api/consultants/?tech_and_pref=cobol,true                     # Returns workers with Cobol as skill and preference True
api/consultants/?tech_and_pref=python,false                   # Returns workers with Python as skill and preference False
api/consultants/?tech_and_pref=JavaScript                     # Returns workers with JavaScript as skill and preference True
```

`tech_and_level`: the second argument is converted into an integer in range 1-3. If the given value is not an integer, the value is transformed into 1. Integers will be handled with the rule $\texttt{value}\ge\max\{0, \min\{\texttt{value}, 3\}\}$. Examples:

```
api/consultants/?tech_and_pref=cobol,2                     # Returns workers with Cobol as skill and level gte 2
api/consultants/?tech_and_pref=python                      # Returns workers with Python as skill and level gte 1
api/consultants/?tech_and_pref=JavaScript,500              # Returns workers with JavaScript as skill and level gte 3
```
