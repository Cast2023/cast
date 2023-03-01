*** Variables ***

*** Settings ***
Resource        ${RESOURCE}
Suite Setup     ${SETUP}

*** Test Cases ***

Scenario: As a visitor I can navigate to the search view
  Refresh & Navigate to Selected View  search
  Page Should Contain Element  search
  
Scenario: As a visitor I can write text to search bar
  Refresh & Navigate to Selected View  search
  Click element  search_bar
  Set Value  search_bar  Gwen
  Textfield value should be  id=search_bar  Gwen

Scenario: As a visitor I can filter shown consultants
  Refresh & Navigate to Selected View  search
  Click element  search_bar
  Set Value  search_bar  Gwen
  Page Should Not Contain  Bruce
  Page Should Contain  Gwen

Scenario: As a visitor I can view the profile page of selected consultant
  Refresh & Navigate to Selected View  search
  Click element  search_bar
  Set Value  search_bar  Gwen
  Click Link  Gwen
  Wait until page contains element  personalinfocard
  Page Should Contain Element  personalinfocard
  Textfield Value Should Be  id=firstname  Gwen
  Textfield Value Should Be  id=lastname  Stacy

Scenario: As a visitor I can still see the search results after visiting another page
  Refresh & Navigate to Selected View  search
  Click Element  search_bar
  Set Value  search_bar  Gwen
  Page Should Not Contain  Bruce
  Page Should Contain  Gwen
  Click Element  home
  Click Element  profile
  Click Element  api
  Click Element  myteam
  Click Element  search
  Page Should Not Contain  Bruce
  Page Should Contain  Gwen
  