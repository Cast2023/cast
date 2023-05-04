# USE CASES

This document lists three different use cases for the application from users point of view. 

## Editing your profile

Profile page can be accessed by Profile tab. Page has four componets that have editable information.

On this page the user can edit:

- Personal info:
  - Apart from email address, user can edit all fields in their Personal info card 
  - After editing, the edited information will be submitted by clicking submit button at the bottom of the card

- Ongoing projects:
  - User can add projects and edit the allocation, project start date and end date
  - After editing, the edited information will be submitted by clicking submit button at the bottom of the card

- Certificates:
  - User can add new certificates and edit the date until the certificate is valid
  - After editing, the edited information will be submitted by clicking submit button at the bottom of the card

- Technical skills:
  - User can add skills and levels to these skills, and edit skill levels
  - After editing, the edited information will be submitted by clicking submit button at the bottom of the card

## Creating integration API token

Integration token creation page can be accessed by Api tab. User can create an integration token and determine the time to live value for the token. All available integration tokens are listed at the bottom of the page. User can also deleted tokens.  

See [REST API](rest_api.md) documentation for instructions on how to use the API. 

## Using search view

Search page can be accessed by Search tab. Search page shows all consultants that are in the system. Each consultant card  displays work allocation, consultants skills and how many valid certificates they have by certificate vendor. User can view consultants full profile by clicking consultants name. User can filter the consultants by following parameters: name, skill, certificates by certificate name and certificates by vendor. 
