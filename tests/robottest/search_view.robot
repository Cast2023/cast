*** Variables ***

*** Settings ***
Resource        ${RESOURCE}
Suite Setup     ${SETUP}

*** Test Cases ***

Scenario: As a visitor I can navigate to the search view
  Refresh & Navigate to Selected View  search
  Page Should Contain Element  search
  
Scenario: As a visitor I can filter search results
  Refresh & Navigate to Selected View  search
  Click element  search_bar
  Set Value  search_bar  Gwen
  Textfield value should be  id=search_bar  Gwen

Scenario: As a visitor I can view the profile page of selected consultant
  Refresh & Navigate to Selected View  search
  Click element  search_bar
  Set Value  search_bar  Gwen
  Click Element  Gwen
  Wait until page contains element  personalinfocard
  Page Should Contain Element  personalinfocard