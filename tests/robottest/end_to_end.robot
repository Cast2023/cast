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

Scenario: As a visitor I can see the skills card on profile page
  Go To  ${SERVER}
  Wait until page contains element  profile
  Click element  profile
  Page Should Contain Element  skillscard

Scenario: As a visitor I can click the edit button to activate the edit mode on skills
  Go To  ${SERVER}
  Wait Until Page Contains Element  profile
  Click Element  profile
  Page Should Contain Button  edit_skills_button
  Click Button  edit_skills_button
  Page Should Contain Button  submit_skills_button

Scenario: As a visitor I can edit my skills
  Go To  ${SERVER}
  Wait Until Page Contains Element  profile
  Click Element  profile
  Click Button  edit_skills_button
  Page Should Contain  Python
  Set Skill  1  1
  Textfield Value Should Be  id=1  1
  Set Skill  1  3
  Textfield Value Should Be  id=1  3
  Click Button  submit_skills_button
  Go To  ${SERVER}
  Wait Until Page Contains Element  profile
  Click Element  profile
  Textfield Value Should Be  id=1  3

Scenario: As a visitor I can't give illegal value to a skill
  Go To  ${SERVER}
  Wait Until Page Contains Element  profile
  Click Element  profile
  Click Button  edit_skills_button
  Set Skill  1  2
  Click Button  submit_skills_button
  Go To  ${SERVER}
  Wait Until Page Contains Element  profile
  Click Element  profile
  Click Button  edit_skills_button
  Set Skill  1  9001
  Click Button  submit_skills_button
  Click Button  edit_skills_button
  Set Skill  1  -1
  Click Button  submit_skills_button
  Click Button  edit_skills_button
  Set Skill  1  apina
  Click Button  submit_skills_button
  Click Button  edit_skills_button
  Set Skill  1  0
  Click Button  submit_skills_button
  Go To  ${SERVER}
  Wait Until Page Contains Element  profile
  Click Element  profile
  Textfield Value Should Be  id=1  2

Scenario: As a visitor I can edit many skills
  Go To  ${SERVER}
  Wait Until Page Contains Element  profile
  Click Element  profile
  Click Button  edit_skills_button
  Set Skill  1  1
  Set Skill  3  1
  Textfield Value Should Be  id=1  1
  Textfield Value Should Be  id=3  1
  Click Button  submit_skills_button
  Go To  ${SERVER}
  Wait Until Page Contains Element  profile
  Click Element  profile
  Click Button  edit_skills_button
  Set Skill  1  3
  Set Skill  3  2
  Click Button  submit_skills_button
  Go To  ${SERVER}
  Wait Until Page Contains Element  profile
  Click Element  profile
  Textfield Value Should Be  id=1  3
  Textfield Value Should Be  id=3  2
