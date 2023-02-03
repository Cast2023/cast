*** Variables ***

${HOSTNAME}             127.0.0.1
${PORT}                 3000
${SERVER}               http://${HOSTNAME}:${PORT}/roboroute
${BROWSER}              chrome


*** Settings ***

Documentation   Django Robot Tests
Library         SeleniumLibrary  timeout=10  implicit_wait=0
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

#Flush Database  
   #TODO 
