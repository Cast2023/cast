*** Variables ***

*** Settings ***
Resource        ../../resources/common.resource
Suite Setup     ${SETUP}

*** Test Cases ***

Scenario: As a visitor I can see the certs card on profile page
  Refresh & Navigate to Profile Page
  Page Should Contain Element  certscard
  
Scenario: As a visitor I can't edit other user's certificates
  Go To  ${SERVER}
  Wait until page contains element  search
  Click element  search
  Wait Until Page Contains Element  searchresults
  Sleep  1s
  Click Link  Janet
  Wait Until Page Contains Element  certscard
  Page Should Not Contain Button  editCertsButton
  