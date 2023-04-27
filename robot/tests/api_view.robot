*** Variables ***

*** Settings ***
Resource        ../resources/common.resource
Suite Setup     ${SETUP}

*** Test Cases ***

As A Visitor I Can Generate An Api Token
    [Setup]  Refresh & Navigate to  api
    Set Value  New Token Name  robot token
    Click Element  id=New Token Time To Live    
    Click Element  id=New Token Time To Live-option-0
    Click Element  id=generate new token button
    Wait Until Page Contains  Generated token:
    Click Element  name=delete token button
    sleep 3s
    Handle Alert  accept
    sleep 3s
    
As A Visitor I Can Delete An Generated Api Token
    [Setup]  Refresh & Navigate to  api
    Set Value  New Token Name  delete me
    Click Element  id=New Token Time To Live    
    Click Element  id=New Token Time To Live-option-0
    Click Element  id=generate new token button
    
    Refresh & Navigate to  api
    Click Element  name=delete token button
    sleep  3s
    Handle Alert  accept
    sleep  3s   
    Page Should Not Contain  delete me

# TODO: Fix this test
#As A Visitor I Can Copy The Generated Api Token To Clipboard
#    Refresh & Navigate to Selected View  api
#    Set Value  New Token Name  copy me
#    Click Element  id=New Token Time To Live    
#    Click Element  id=New Token Time To Live-option-0
#    Click Element  id=generate new token button
#    Sleep  5s
#    Click Element  name=copy to clipboard button
#    Page Should Contain  Copied to clibboard
#    Click Element  name=delete token button
#    Handle Alert  accept