# Application Architecture

```mermaid
flowchart
    subgraph Frontend
        ui[UI\n_______\nReact\nSPA\nMaterial UI]
    end
    djangoapi[API\n_____________________\nDjango REST framework]
    subgraph Backend
        backend[Application Logic\n____\nDjango web framework]
        db[Database\n______\nPostgreSQL]
    end
    ui-->djangoapi
    djangoapi-->backend
    ui-->backend
    backend-->db
    backend --> oauth[Authentication API\n___________\nGoogle OAuth]
```

## Overview

**UI**

- React Application
  - Single Page Application design style
  - Material UI: React Component library for styling web content

**API**

- API: Django REST framework

**Django**

- Django: Python web framework
  - Implement Model from Django MVT

**Database**

- PostgreSQL

**Authentication (OAuth)**

- Google OAuth: OAuth 2.0 protocol

**CI/CD pipeline**

## Initial proposal for API-routes

- all/
- consult/name
- certs/?certification=cert1,cert2, cert3
- skills/?skill=skill1,skill2,skill3
- project-startdate/
- allocation/

Questions:

- What if client wants to filter consults with?
  - certain certifications
  - certain skills
  - certain allocation

Other notes

- Certifications and Skills from Database through API?
