*** Variables ***

*** Settings ***
Resource        ${RESOURCE}
Suite Setup     ${SETUP}

*** Test Cases ***

Scenario: As a visitor I can visit the home page
  Go To  ${SERVER}
  Wait until page contains element  home
  Page Should Contain  Welcome to CAS-tracker

#Scenario: As A visitor I can inspect profile page
#  Go To  ${SERVER}
#  Wait until page contains element  profile
#  Click element  profile
#  Page Should Contain  Profile

Scenario: As A visitor I can inspect my team page
  Go To  ${SERVER}
  Wait until page contains element  myteam
  Click element  myteam
  Page Should Contain  My Team Page

Scenario: As A visitor I can inspect search page
  Go To  ${SERVER}
  Wait until page contains element  search
  Click element  search
  Page Should Contain  Search consults

Scenario: As A visitor I can inspect api page
  Go To  ${SERVER}
  Wait until page contains element  api
  Click element  api
  Page Should Contain  Api

Scenario: As A visitor clicking get started button opens a popup
  Go To  ${SERVER}
  Wait until page contains element  getstarted
  Click element  getstarted
  Page Should Contain  This is very helpful