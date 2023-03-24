*** Variables ***

*** Settings ***
Resource        ${RESOURCE}
Suite Setup     ${SETUP}

*** Test Cases ***

Scenario: As a visitor I can see the projects card on profile page
  Refresh & Navigate to Profile Page
  Page Should Contain Element  projectscard


  
Scenario: As a visitor I can't edit other user's projects
  Go To  ${SERVER}
  Wait until page contains element  search
  Click element  search
  Wait Until Page Contains Element  searchresults
  Sleep  2s
  Click Link  Janet
  Wait Until Page Contains Element  projectscard
  Page Should Not Contain Button  editProjectsButton
  
Scenario: As a visitor I can see correct projects in personal info on profile page
  Refresh & Navigate to Profile Page
  Page Should Contain  JawCorp