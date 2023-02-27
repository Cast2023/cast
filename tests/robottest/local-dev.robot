*** Variables ***

${SERVER}               http://${HOSTNAME}:${PORT}/roboroute

*** Settings ***

Documentation   Django Robot Tests
Library         SeleniumLibrary  timeout=10  implicit_wait=0  run_on_failure=Nothing  #run_on_failure disables creation of screenshot files.
Library         Process

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

Set Skill
  [arguments]  ${id}  ${level} 
  Input Text  ${id}  ${level}

Set Value
  [arguments]  ${id}  ${firstname}
  Input Text  ${id}  ${firstname}

#Flush Database  
   #TODO 
