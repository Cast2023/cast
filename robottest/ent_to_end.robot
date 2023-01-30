*** Variables ***

*** Settings ***
Resource        resource.robot
Suite Setup     Start Django and open Browser
Suite Teardown  Stop Django and close Browser
#Test Teardown   Flush Database

*** Test Cases ***

Scenario: As a visitor I can visit the home page
  Go To  ${SERVER}
  Wait until page contains element  home
  Page Should Contain  This is the home page.

Scenario: As A visitor I can inspect profile page
  Go To  ${SERVER}
  Wait until page contains element  profile
  Click element  profile
  Page Should Contain  This is the profile page.

Scenario: As A visitor I can inspect search page
  Go To  ${SERVER}
  Wait until page contains element  search
  Click element  search
  Page Should Contain  Search consults

Scenario: As A visitor I can inspect api page
  Go To  ${SERVER}
  Wait until page contains element  api
  Click element  api
  Page Should Contain  Notes