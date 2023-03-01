*** Variables ***

${SERVER}               http://${HOSTNAME}:${PORT}/roboroute

*** Settings ***

Library         SeleniumLibrary  timeout=10  implicit_wait=0

*** Keywords ***

Init Browser
    ${chrome_options}=    Evaluate    sys.modules['selenium.webdriver'].ChromeOptions()    sys
    Call Method    ${chrome_options}    add_argument    --disable-dev-shm-usage  #disable page crash of chrome
    Call Method    ${chrome_options}    add_argument    --no-sandbox  #disable sandbox mode
    Call Method    ${chrome_options}    add_argument    --headless  #run with no web browser
    Create Webdriver    driver_name=Chrome    alias=google    chrome_options=${chrome_options}    executable_path=/usr/local/bin/chromedriver
    Set Window Size    1200    1000  #run on docker can't use Maximize Browser Window

Open Local Browser
  Open Browser  ${SERVER}  ${BROWSER}

Close Local Browser
  Close Browser

Set Skill
  [arguments]  ${id}  ${level} 
  Input Text  ${id}  ${level}

Set Value
  [arguments]  ${id}  ${value}
  Input Text  ${id}  ${value}

Refresh & Navigate to Profile Page
  Go To  ${SERVER}
  Wait until page contains element  profile
  Click element  profile

Refresh & Navigate to Selected View
  [arguments]  ${element}
  Go To  ${SERVER}
  Wait until page contains element  ${element}
  Click element  ${element}