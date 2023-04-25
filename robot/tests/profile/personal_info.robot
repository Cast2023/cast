*** Variables ***

*** Settings ***
Resource        ../../resources/common.resource
Suite Setup     ${SETUP}

*** Test Cases ***

Scenario: As a visitor I can see the personal info card on profile page
    Refresh & Navigate to Profile Page Card  personalinfocard

Scenario: As a visitor I can see correct name in personal info on profile page
    [Setup]  Refresh & Navigate to Profile Page Card  personalinfocard
    Textfield Value Should Be  id=firstname  Wanda
    Textfield Value Should Be  id=lastname  Maximoff

Scenario: As a visitor I can see correct contact info in personal info on profile page
    [Setup]  Refresh & Navigate to Profile Page Card  personalinfocard
    Textfield Value Should Be  id=email  scarlet@gmail.com
    Textfield Value Should Be  id=phonenumber  +45506244567

Scenario: As a visitor I can see correct location in personal info on profile page
    [Setup]  Refresh & Navigate to Profile Page Card  personalinfocard
    Textfield Value Should Be  id=country  Denmark
    Textfield Value Should Be  id=city  Copenhagen

Scenario: As a visitor I can see correct team & languages in personal info on profile page
    [Setup]  Refresh & Navigate to Profile Page Card  personalinfocard
    Textfield Value Should Be  id=team  To Do
    Textfield Value Should Be  id=languages  To Do

Scenario: As a visitor I can see correct worktime info in personal info on profile page
    [Setup]  Refresh & Navigate to Profile Page Card  personalinfocard
    Textfield Value Should Be  id=worktime  100%
    Textfield Value Should Be  id=until  2023-12-31

Scenario: As a visitor I can see correct preferences & dislikes in personal info textfield on profile page
    [Setup]  Refresh & Navigate to Profile Page Card  personalinfocard
    Element Should Contain  id=preferences  I love transportation sector
    Element Should Contain  id=dislikes  Docker and tests

Scenario: As a visitor I can click the edit button to activate the edit mode on personal info
    [Setup]  Refresh & Navigate to Profile Page Card  personalinfocard
    Page Should Contain Button  editPersonalInfoButton
    Activate Edit Mode
    Page Should Contain Button  submitPersonalInfoButton

Scenario: As a visitor I can edit my name in personal info on profile page
    [Setup]  Refresh & Navigate to Profile Page Card  personalinfocard
    Activate Edit Mode
    Set Value  firstname  Donna
    Set Value  lastname  Buller
    Submit Personal Info
    Refresh & Navigate to Profile Page Card  personalinfocard
    Textfield Value Should Be  id=firstname  Donna
    Textfield Value Should Be  id=lastname  Buller
    [Teardown]  Reset Name

Scenario: As a visitor I can edit my phonenumber in personal info on profile page
    [Setup]  Refresh & Navigate to Profile Page Card  personalinfocard
    Activate Edit Mode
    Set Value  phonenumber  +441234
    Submit Personal Info
    Refresh & Navigate to Profile Page Card  personalinfocard
    Textfield Value Should Be  id=phonenumber  +441234
    [Teardown]  Reset Phone Number

Scenario: As a visitor I can't edit email address in personal info on profile page
    [Setup]  Refresh & Navigate to Profile Page Card  personalinfocard
    Activate Edit Mode
    Element Should Be Disabled  id=email

Scenario: As a visitor I can edit my location in personal info on profile page
    [Setup]  Refresh & Navigate to Profile Page Card  personalinfocard
    Activate Edit Mode
    Set Value  city  Helsinki
    Set Value  country  Finland
    Submit Personal Info
    Refresh & Navigate to Profile Page Card  personalinfocard
    Textfield Value Should Be  id=city  Helsinki
    Textfield Value Should Be  id=country  Finland
    [Teardown]  Reset Location

# Scenario: As a visitor I can edit my team & languages in personal info on profile page
#   To Do

Scenario: As a visitor I can edit my worktime info in personal info on profile page
    [Setup]  Refresh & Navigate to Profile Page Card  personalinfocard
    Activate Edit Mode
    Set Value  worktime  60
    Set Value  until  2024-01-01
    Submit Personal Info
    Refresh & Navigate to Profile Page Card  personalinfocard
    Textfield Value Should Be  id=worktime  60%
    Textfield Value Should Be  id=until  2024-01-01
    [Teardown]  Reset Worktime Info

Scenario: As a visitor I can edit my preferences & dislikes in personal info on profile page
    [Setup]  Refresh & Navigate to Profile Page Card  personalinfocard
    Activate Edit Mode
    Set Value  preferences  New things
    Set Value  dislikes  Boring stuff
    Submit Personal Info
    Refresh & Navigate to Profile Page Card  personalinfocard
    Element Should Contain  id=preferences  New things
    Element Should Contain  id=dislikes  Boring stuff
    [Teardown]  Reset Preferences & Dislikes
    
Scenario: As a visitor I can't edit other user's personal info
    Refresh & Navigate to  search
    Wait Until Page Contains Element  searchresults
    Sleep  2s
    Click Link  Janet
    Wait Until Page Contains Element  personalinfocard
    Page Should Not Contain Button  editPersonalInfoButton


*** Keywords ***
Activate Edit Mode
    Click Button  editPersonalInfoButton

Submit Personal Info
    Click Button  submitPersonalInfoButton

Reset Name
    Activate Edit Mode
    Set Value  firstname  Wanda
    Set Value  lastname  Maximoff
    Submit Personal Info

Reset Location
    Activate Edit Mode
    Set Value  city  Copenhagen
    Set Value  country  Denmark
    Submit Personal Info

Reset Preferences & Dislikes
    Activate Edit Mode
    Set Value  preferences  I love transportation sector and especially railways! I prefer Python to Java, but both of those are okey for me.
    Set Value  dislikes  Docker and tests
    Submit Personal Info

Reset Worktime Info
    Activate Edit Mode
    Set Value  worktime  100
    Set Value  until  2023-12-31
    Submit Personal Info

Reset Phone Number
    Activate Edit Mode
    Set Value  phonenumber  +45506244567
    Submit Personal Info
