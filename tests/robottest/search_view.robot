*** Variables ***

*** Settings ***
Resource        ${RESOURCE}
Suite Setup     ${SETUP}

*** Test Cases ***

Scenario: As a visitor I can navigate to the search view
  Refresh & Navigate to Search View
  Page Should Contain Element  search
  
Scenario: As a visitor I can filter search results
  Refresh & Navigate to Search View
  Click element  search_bar