*** Variables ***

*** Settings ***
Resource        ../../resources/common.resource
Suite Setup     ${SETUP}

*** Test Cases ***

Scenario: As a visitor I can see the certs card on profile page
    Refresh & Navigate to Profile Page
    Wait Until Page Contains Element  certscard
  
Scenario: As a visitor I can't edit other user's certificates
    Go To  ${SERVER}
    Wait until page contains element  search
    Click element  search
    Wait Until Page Contains Element  searchresults
    Sleep  2s
    Click Link  Janet
    Wait Until Page Contains Element  certscard
    Page Should Not Contain Button  editCertsButton

Scenario: As a visitor I can click the edit button to activate the edit mode on certs
    Refresh & Navigate to Profile Page
    Wait Until Page Contains Element  certscard
    Page Should Contain Button  editCertsButton
    Click Button  editCertsButton
    Page Should Contain Button  submitCertsButton
  
# Scenario: As a visitor I can edit one 'valid until'-date on my cert card
#     Refresh & Navigate to Profile Page
#     Wait Until Page Contains Element  certscard
#     Page Should Contain Button  editCertsButton
#     Click Button  editCertsButton
#     Page Should Contain  2021-12-31
#     Wait Until Page Contains Element  id=11
#     Click Element  id=11
