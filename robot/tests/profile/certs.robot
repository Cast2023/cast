*** Variables ***

*** Settings ***
Resource        ../../resources/common.resource
Suite Setup     ${SETUP}

*** Test Cases ***

Scenario: As a visitor I can see the certs card on profile page
    Refresh & Navigate to Profile Page Card  certscard

Scenario: As a visitor I can see correct vendors in certificates info on profile page
    [Setup]  Refresh & Navigate to Profile Page Card  certscard
    Table Cell Should Contain  locator=certTable  row=1  column=1  expected=Vendor
    Table Cell Should Contain  locator=certTable  row=2  column=1  expected=AWS
    Table Cell Should Contain  locator=certTable  row=3  column=1  expected=Azure

Scenario: As a visitor I can see correct allocation-% in certificates info on profile page
    [Setup]  Refresh & Navigate to Profile Page Card  certscard
    Table Cell Should Contain  locator=certTable  row=1  column=2  expected=Certificate
    Table Cell Should Contain  locator=certTable  row=2  column=2  expected=AWS Certified Security - Specialty
    Table Cell Should Contain  locator=certTable  row=3  column=2  expected=AI-900: Microsoft Azure AI Fundamentals

Scenario: As a visitor I can see correct participation period in certificates info on profile page
    [Setup]  Refresh & Navigate to Profile Page Card  certscard
    Table Cell Should Contain  locator=certTable  row=1  column=3  expected=Valid until
    Table Cell Should Contain  locator=certTable  row=2  column=3  expected=2021-12-31
    Table Cell Should Contain  locator=certTable  row=3  column=3  expected=2024-12-31
  
Scenario: As a visitor I can't edit other user's certificates
    [Setup]  Refresh & Navigate to  search
    Wait Until Page Contains Element  searchresults
    Sleep  2s
    Click Link  Janet
    Wait Until Page Contains Element  certscard
    Page Should Not Contain Button  editCertsButton

Scenario: As a visitor I can click the edit button to activate the edit mode on certs
    [Setup]  Refresh & Navigate to Profile Page Card  certscard
    Page Should Contain Button  editCertsButton
    Click Button  editCertsButton
    Page Should Contain Button  submitCertsButton

