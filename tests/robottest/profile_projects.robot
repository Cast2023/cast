*** Variables ***

*** Settings ***
Resource        ${RESOURCE}
Suite Setup     ${SETUP}

*** Test Cases ***

Scenario: As a visitor I can see the projects card on profile page
  Refresh & Navigate to Profile Page
  Page Should Contain Element  projectscard