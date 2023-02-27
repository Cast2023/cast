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

Scenario: As a visitor clicking get started button opens a popup
  Go To  ${SERVER}
  Wait until page contains element  getstarted
  Click element  getstarted
  Page Should Contain  This is very helpful

Scenario: As a visitor I can see the profile page structure
  Go To  ${SERVER}
  Wait until page contains element  profile
  Click element  profile
  Page Should Contain Element  container

Scenario: As a visitor I can see the grid on profile page
  Go To  ${SERVER}
  Wait until page contains element  profile
  Click element  profile
  Page Should Contain Element  grid

Scenario: As a visitor I can see the profile card on profile page
  Go To  ${SERVER}
  Wait until page contains element  profile
  Click element  profile
  Page Should Contain Element  profilecard

Scenario: As a visitor I can see the projects card on profile page
  Go To  ${SERVER}
  Wait until page contains element  profile
  Click element  profile
  Page Should Contain Element  projectscard

Scenario: As a visitor I can see the certs card on profile page
  Go To  ${SERVER}
  Wait until page contains element  profile
  Click element  profile
  Page Should Contain Element  certscard

Scenario: As a visitor I can see correct name in personal info on profile page
  Go To  ${SERVER}
  Wait until page contains element  profile
  Click element  profile
  Textfield Value Should Be  id=firstname  Wanda
  Textfield Value Should Be  id=lastname  Maximoff

Scenario: As a visitor I can see correct contact info in personal info on profile page
  Go To  ${SERVER}
  Wait until page contains element  profile
  Click element  profile
  Textfield Value Should Be  id=email  scarlet@gmail.com
  Textfield Value Should Be  id=phonenumber  +45506244567

Scenario: As a visitor I can see correct location in personal info on profile page
  Go To  ${SERVER}
  Wait until page contains element  profile
  Click element  profile
  Textfield Value Should Be  id=country  Denmark
  Textfield Value Should Be  id=city  Copenhagen

Scenario: As a visitor I can see correct team & languages in personal info on profile page
  Go To  ${SERVER}
  Wait until page contains element  profile
  Click element  profile
  Textfield Value Should Be  id=team  To Do
  Textfield Value Should Be  id=languages  To Do

Scenario: As a visitor I can see correct worktime info in personal info on profile page
  Go To  ${SERVER}
  Wait until page contains element  profile
  Click element  profile
  Textfield Value Should Be  id=worktime  100%
  Textfield Value Should Be  id=until  2023-12-31

Scenario: As a visitor I can see correct preferences & dislikes in personal info textfield on profile page
  Go To  ${SERVER}
  Wait until page contains element  profile
  Click element  profile
  Wait Until Page Contains Element  dislikes
  Element Should Contain  id=preferences  I love transportation sector
  Element Should Contain  id=dislikes  Docker and tests

Scenario: As a visitor I can click the edit button to activate the edit mode on personal info
  Go To  ${SERVER}
  Wait Until Page Contains Element  profile
  Click Element  profile
  Page Should Contain Button  editPersonalInfoButton
  Click Button  editPersonalInfoButton
  Page Should Contain Button  submitPersonalInfoButton

Scenario: As a visitor I can edit first name in personal info on profile page
  Go To  ${SERVER}
  Wait Until Page Contains Element  profile
  Click Element  profile
  Click Button  editPersonalInfoButton
  Set Value  firstname  Donna
  Click Button  submitPersonalInfoButton
  Go To  ${SERVER}
  Wait Until Page Contains Element  profile
  Click Element  profile
  Textfield Value Should Be  id=firstname  Donna
  Click Button  editPersonalInfoButton
  Set Value  firstname  Wanda
  Click Button  submitPersonalInfoButton
  Textfield Value Should Be  id=firstname  Wanda

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
