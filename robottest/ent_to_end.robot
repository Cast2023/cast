*** Variables ***

${HOSTNAME}             127.0.0.1
${PORT}                 3000
${SERVER}               http://${HOSTNAME}:${PORT}/
${BROWSER}              firefox


*** Settings ***

Documentation   Django Robot Tests
Library         SeleniumLibrary  timeout=10  implicit_wait=0
Library         Process
Suite Setup     Start Django and open Browser
Suite Teardown  Stop Django and close Browser
#Test Teardown   Flush Database



*** Keywords ***

Start Django and open Browser
  ${django process}=  Start process  python3  backend/manage.py  runserver
  Set suite variable  ${django process}
  Open Browser  ${SERVER}  ${BROWSER}

Stop Django and close browser
  Close Browser
  Terminate Process  ${django process}
  
Set Message
  [arguments]  ${message}
  Input Text  messge input  ${message}

#Start Frontend
    #TODO

#Flush Database  
   #TODO 

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