*** Variables ***

*** Settings ***
Resource        ../../resources/common.resource
Suite Setup     ${SETUP}

*** Test Cases ***

Scenario: As a visitor I can see the personal info card on profile page
  Refresh & Navigate to Profile Page
  Page Should Contain Element  personalinfocard

Scenario: As a visitor I can see correct name in personal info on profile page
  Refresh & Navigate to Profile Page
  Textfield Value Should Be  id=firstname  Wanda
  Textfield Value Should Be  id=lastname  Maximoff

Scenario: As a visitor I can see correct contact info in personal info on profile page
  Refresh & Navigate to Profile Page
  Textfield Value Should Be  id=email  scarlet@gmail.com
  Textfield Value Should Be  id=phonenumber  +45506244567

Scenario: As a visitor I can see correct location in personal info on profile page
  Refresh & Navigate to Profile Page
  Textfield Value Should Be  id=country  Denmark
  Textfield Value Should Be  id=city  Copenhagen

Scenario: As a visitor I can see correct team & languages in personal info on profile page
  Refresh & Navigate to Profile Page
  Textfield Value Should Be  id=team  To Do
  Textfield Value Should Be  id=languages  To Do

Scenario: As a visitor I can see correct worktime info in personal info on profile page
  Refresh & Navigate to Profile Page
  Textfield Value Should Be  id=worktime  100%
  Textfield Value Should Be  id=until  2023-12-31

Scenario: As a visitor I can see correct preferences & dislikes in personal info textfield on profile page
  Refresh & Navigate to Profile Page
  Wait Until Page Contains Element  dislikes
  Element Should Contain  id=preferences  I love transportation sector
  Element Should Contain  id=dislikes  Docker and tests

Scenario: As a visitor I can click the edit button to activate the edit mode on personal info
  Refresh & Navigate to Profile Page
  Page Should Contain Button  editPersonalInfoButton
  Click Button  editPersonalInfoButton
  Page Should Contain Button  submitPersonalInfoButton

Scenario: As a visitor I can edit my name in personal info on profile page
  Refresh & Navigate to Profile Page
  Click Button  editPersonalInfoButton
  Set Value  firstname  Donna
  Set Value  lastname  Buller
  Click Button  submitPersonalInfoButton
  Refresh & Navigate to Profile Page
  Textfield Value Should Be  id=firstname  Donna
  Textfield Value Should Be  id=lastname  Buller
  Click Button  editPersonalInfoButton
  Set Value  firstname  Wanda
  Set Value  lastname  Maximoff
  Click Button  submitPersonalInfoButton
  Textfield Value Should Be  id=firstname  Wanda
  Textfield Value Should Be  id=lastname  Maximoff

Scenario: As a visitor I can edit my phonenumber in personal info on profile page
  Refresh & Navigate to Profile Page
  Click Button  editPersonalInfoButton
  Set Value  phonenumber  +441234
  Click Button  submitPersonalInfoButton
  Refresh & Navigate to Profile Page
  Textfield Value Should Be  id=phonenumber  +441234
  Click Button  editPersonalInfoButton
  Set Value  phonenumber  +45506244567
  Click Button  submitPersonalInfoButton
  Textfield Value Should Be  id=phonenumber  +45506244567

Scenario: As a visitor I can't edit email address in personal info on profile page
  Refresh & Navigate to Profile Page
  Click Button  editPersonalInfoButton
  Element Should Be Disabled  id=email

Scenario: As a visitor I can edit my location in personal info on profile page
  Refresh & Navigate to Profile Page
  Click Button  editPersonalInfoButton
  Set Value  city  Helsinki
  Set Value  country  Finland
  Click Button  submitPersonalInfoButton
  Refresh & Navigate to Profile Page
  Textfield Value Should Be  id=city  Helsinki
  Textfield Value Should Be  id=country  Finland
  Click Button  editPersonalInfoButton
  Set Value  city  Copenhagen
  Set Value  country  Denmark
  Click Button  submitPersonalInfoButton
  Textfield Value Should Be  id=city  Copenhagen
  Textfield Value Should Be  id=country  Denmark

# Scenario: As a visitor I can edit my team & languages in personal info on profile page
#   To Do

Scenario: As a visitor I can edit my worktime info in personal info on profile page
  Refresh & Navigate to Profile Page
  Click Button  editPersonalInfoButton
  Set Value  worktime  60
  Set Value  until  2024-01-01
  Click Button  submitPersonalInfoButton
  Refresh & Navigate to Profile Page
  Textfield Value Should Be  id=worktime  60%
  Textfield Value Should Be  id=until  2024-01-01
  Click Button  editPersonalInfoButton
  Set Value  worktime  100
  Set Value  until  2023-12-31
  Click Button  submitPersonalInfoButton
  Refresh & Navigate to Profile Page
  Textfield Value Should Be  id=worktime  100%
  Textfield Value Should Be  id=until  2023-12-31

Scenario: As a visitor I can edit my preferences & dislikes in personal info on profile page
  Refresh & Navigate to Profile Page
  Click Button  editPersonalInfoButton
  Set Value  preferences  New things
  Set Value  dislikes  Boring stuff
  Click Button  submitPersonalInfoButton
  Refresh & Navigate to Profile Page
  Element Should Contain  id=preferences  New things
  Element Should Contain  id=dislikes  Boring stuff
  Click Button  editPersonalInfoButton
  Set Value  preferences  I love transportation sector and especially railways! I prefer Python to Java, but both of those are okey for me.
  Set Value  dislikes  Docker and tests
  Click Button  submitPersonalInfoButton
  Refresh & Navigate to Profile Page
  Element Should Contain  id=preferences  I love transportation sector
  Element Should Contain  id=dislikes  Docker and tests

Scenario: As a visitor I can't edit other user's personal info
  Go To  ${SERVER}
  Wait until page contains element  search
  Click element  search
  Wait Until Page Contains Element  searchresults
  Sleep  1s
  Click Link  Janet
  Wait Until Page Contains Element  personalinfocard
  Page Should Not Contain Button  editPersonalInfoButton
