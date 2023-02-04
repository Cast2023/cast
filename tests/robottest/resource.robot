*** Variables ***

${HOSTNAME}             frontend
${PORT}                 3000
${SERVER}               http://${HOSTNAME}:${PORT}/roboroute
${BROWSER}              headlessChrome


*** Settings ***

Documentation   Django Robot Tests
Library         SeleniumLibrary  timeout=10  implicit_wait=0
Library         Process

*** Keywords ***

Init Browser
    ${chrome_options}=    Evaluate    sys.modules['selenium.webdriver'].ChromeOptions()    sys
    Call Method    ${chrome_options}    add_argument    --disable-dev-shm-usage  #disable page crash of chrome
    Call Method    ${chrome_options}    add_argument    --no-sandbox  #disable sandbox mode
    Call Method    ${chrome_options}    add_argument    --headless  #run with no web browser
    Create Webdriver    driver_name=Chrome    alias=google    chrome_options=${chrome_options}    executable_path=/usr/local/bin/chromedriver
    Set Window Size    1200    1000  #run on docker can't use Maximize Browser Window

Start Django and open Browser
  ${django process}=  Start process  python3  backend/manage.py  runserver
  Set suite variable  ${django process}
  Open Browser  ${SERVER}  ${BROWSER}

Stop Django and close browser
  Close Browser
  #Terminate Process  ${django process}
  
Set Message
  [arguments]  ${message}
  Input Text  messge input  ${message}

#Flush Database  
   #TODO 
