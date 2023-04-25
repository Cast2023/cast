*** Variables ***

*** Settings ***
Resource        ../../resources/common.resource
Suite Setup     ${SETUP}

*** Test Cases ***

Scenario: As a visitor I can see the skills card on profile page
    Refresh & Navigate to Profile Page Card  skillscard

Scenario: As a visitor I can click the edit button to activate the edit mode on skills
    [Setup]  Refresh & Navigate to Profile Page Card  skillscard
    Page Should Contain Button  edit_skills_button
    Click Button  edit_skills_button
    Page Should Contain Button  submit_skills_button

Scenario: As a visitor I can edit my skills
    [Setup]  Refresh & Navigate to Profile Page Card  skillscard
    Click Button  edit_skills_button
    Wait Until Page Contains  Python
    Click Element  id=1
    Sleep  1s
    Set Selenium Speed	1.5 seconds
    Click Element  id=1-option-0
    Element Attribute Value Should Be  id=1  value  Beginner
    Click Button  submit_skills_button
    Click Button  edit_skills_button
    Wait Until Page Contains  Python
    Click Element  id=1
    Sleep  1s
    Click Element  id=1-option-2
    Set Selenium Speed	0 seconds
    Element Attribute Value Should Be  id=1  value  Proficient
    Click Button  submit_skills_button
    Refresh & Navigate to Profile Page Card  skillscard
    Wait Until Page Contains  Python
    Element Attribute Value Should Be  id=1  value  Proficient

Scenario: As a visitor I can edit many skills
    [Setup]  Refresh & Navigate to Profile Page Card  skillscard
    Click Button  edit_skills_button
    Sleep  1s
    Set Selenium Speed	1.5 seconds
    Click Element  id=1
    Click Element  id=1-option-0
    Click Element  id=3
    Click Element  id=3-option-1
    Wait Until Page Contains Element  id=1
    Element Attribute Value Should Be  id=1  value  Beginner
    Element Attribute Value Should Be  id=3  value  Intermediate
    Click Button  submit_skills_button
    Refresh & Navigate to Profile Page Card  skillscard
    Click Button  edit_skills_button
    Wait Until Page Contains Element  id=1
    Click Element  id=1
    Click Element  id=1-option-2
    
    Click Element  id=3
    Click Element  id=3-option-0
    Set Selenium Speed	0 seconds

    Click Button  submit_skills_button
    Refresh & Navigate to Profile Page Card  skillscard
    Wait Until Page Contains Element  id=1
    Element Attribute Value Should Be  id=1  value  Proficient
    Element Attribute Value Should Be  id=3  value  Beginner

Scenario: As a visitor I can Add a new skill
    [Setup]  Refresh & Navigate to Profile Page Card  skillscard
    Click Button  add_skills_button
    Sleep  1s
    Set Selenium Speed	1.5 seconds
    Click Element  skill-name
    Click Element  skill-name-option-13
    Click Element  skill-level
    Click Element  skill-level-option-1
    Sleep  1s
    Click Button  submit_new_skill_button
    Set Selenium Speed	0 seconds

    Sleep  1s
    Refresh & Navigate to Profile Page Card  skillscard
    Sleep  1s
    Page Should Contain  Docker

Scenario: As a visitor I can't edit other user's tech skills
    Refresh & Navigate to  search
    Wait Until Page Contains Element  searchresults
    Sleep  2s
    Click Link  Janet
    Wait Until Page Contains Element  skillscard
    Page Should Not Contain Button  edit_skills_button

Scenario: As a visitor I can set my skill preference
    [Setup]  Refresh & Navigate to Profile Page Card  skillscard
    Click Button  edit_skills_button
    Page Should Contain  Python
    ${checkboxInitialState} =   Run Keyword And Return Status      Checkbox Should Be Selected  id=1pref
    Click Element  id=1pref
    Click Button  submit_skills_button
    Refresh & Navigate to Profile Page Card  skillscard
    sleep  1s
    ${checkboxFinalState} =     Run Keyword And Return Status       Checkbox Should Not Be Selected  id=1pref
    Should Be Equal    ${checkboxInitialState}       ${checkboxFinalState}  