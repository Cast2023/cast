*** Variables ***

*** Settings ***
Resource        ../resources/common.resource
Suite Setup     ${SETUP}

*** Test Cases ***

Scenario: As a visitor I can navigate to the search view
  Refresh & Navigate to Selected View  search
  Page Should Contain Element  search
  
Scenario: As a visitor I can write text to search bar
  Refresh & Navigate to Selected View  search
  Wait Until Page Contains Element  search_bar
  Click element  search_bar
  Set Value  search_bar  Gwen
  Textfield value should be  id=search_bar  Gwen

Scenario: As a visitor I can filter shown consultants
  Refresh & Navigate to Selected View  search
  Wait Until Page Contains Element  search_bar
  Click element  search_bar
  Sleep  2s
  Set Value  search_bar  Gwen
  Page Should Not Contain  Bruce
  Page Should Contain  Gwen

Scenario: As a visitor I can view the profile page of selected consultant
  Refresh & Navigate to Selected View  search
  Wait Until Page Contains Element  search_bar
  Click element  search_bar
  Sleep  2s
  Set Value  search_bar  Gwen
  Click Link  Gwen
  Wait until page contains element  personalinfocard
  Page Should Contain Element  personalinfocard
  Textfield Value Should Be  id=firstname  Gwen
  Textfield Value Should Be  id=lastname  Stacy

Scenario: As a visitor I can still see the search results after visiting another page
  Refresh & Navigate to Selected View  search
  Wait Until Page Contains Element  search_bar
  Click Element  search_bar
  Sleep  2s
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


Scenario: As a visitor I can filter consultants based on selected skill
  Refresh & Navigate to Selected View  search
  Wait Until Page Contains Element  skills-combo-box
  Click Element  skills-combo-box
  Click Element  id=skills-combo-box-option-0
  Sleep  2s
  Page Should Not Contain Element  id=7

Scenario: As a visitor I can filter consultants based on multiple selected skills
  Refresh & Navigate to Selected View  search
  Wait Until Page Contains Element  skills-combo-box
  Click Element  skills-combo-box
  Click Element  id=skills-combo-box-option-0
  Click Element  skills-combo-box
  Click Element  id=skills-combo-box-option-1
  Sleep  2s
  Page Should Contain Element  id=3
  Page Should Not Contain Element  id=4

Scenario: As a visitor when I return to search view my selected skill filtering remains unchanged
  Refresh & Navigate to Selected View  search
  Wait Until Page Contains Element  skills-combo-box
  Click Element  skills-combo-box
  Click Element  id=skills-combo-box-option-0
  Click Element  skills-combo-box
  Click Element  id=skills-combo-box-option-1
  Click Element  home
  Click Element  profile
  Click Element  search
  Sleep  2s
  Page Should Contain Element  id=3
  Page Should Not Contain Element  id=7