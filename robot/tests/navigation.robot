*** Variables ***

*** Settings ***
Resource        ../resources/common.resource
Suite Setup     ${SETUP}

*** Test Cases ***

Scenario: As a visitor I can visit the home page
    Go To  ${SERVER}
    Wait until page contains element  home
    Page Should Contain  Welcome to CAS-tracker


Scenario: As A visitor I can inspect search page
    Go To  ${SERVER}
    Wait until page contains element  search
    Click element  search
    Page Should Contain  Search consultants

Scenario: As A visitor I can inspect api page
    Go To  ${SERVER}
    Wait until page contains element  api
    Click element  api
    Page Should Contain  Integration tokens

Scenario: As a visitor clicking get started button opens a popup
    Go To  ${SERVER}
    Wait until page contains element  getstarted
    Click element  getstarted
    Page Should Contain  This is very helpful

Scenario: As a visitor I can see the grid on profile page
    Refresh & Navigate to  profile
    Wait until page contains element  grid


