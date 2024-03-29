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

    Page Should Contain  robot token
    Click Element  id=robot token
    Sleep  3s
    Handle Alert  accept
    Sleep  3s
    
As A Visitor I Can Delete An Generated Api Token
    [Setup]  Refresh & Navigate to  api
    Set Value  New Token Name  delete me
    Click Element  id=New Token Time To Live    
    Click Element  id=New Token Time To Live-option-0
    Click Element  id=generate new token button
    
    Refresh & Navigate to  api
    Click Element  id=delete me

    Sleep  3s
    Handle Alert  accept
    Sleep  3s   
    Page Should Not Contain  delete me

