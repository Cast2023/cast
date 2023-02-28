*** Variables ***

*** Settings ***
Resource        ${RESOURCE}
Suite Setup     ${SETUP}

*** Test Cases ***

Scenario: As a visitor I can see the skills card on profile page
  Refresh & Navigate to Profile Page
  Page Should Contain Element  skillscard

Scenario: As a visitor I can click the edit button to activate the edit mode on skills
  Refresh & Navigate to Profile Page
  Page Should Contain Button  edit_skills_button
  Click Button  edit_skills_button
  Page Should Contain Button  submit_skills_button

Scenario: As a visitor I can edit my skills
  Refresh & Navigate to Profile Page
  Click Button  edit_skills_button
  Page Should Contain  Python
  Set Skill  1  1
  Textfield Value Should Be  id=1  1
  Set Skill  1  3
  Textfield Value Should Be  id=1  3
  Click Button  submit_skills_button
  Refresh & Navigate to Profile Page
  Textfield Value Should Be  id=1  3

Scenario: As a visitor I can't give illegal value to a skill
  Refresh & Navigate to Profile Page
  Click Button  edit_skills_button
  Set Skill  1  2
  Click Button  submit_skills_button
  Refresh & Navigate to Profile Page
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
  Refresh & Navigate to Profile Page
  Textfield Value Should Be  id=1  2

Scenario: As a visitor I can edit many skills
  Refresh & Navigate to Profile Page
  Click Button  edit_skills_button
  Set Skill  1  1
  Set Skill  3  1
  Textfield Value Should Be  id=1  1
  Textfield Value Should Be  id=3  1
  Click Button  submit_skills_button
  Refresh & Navigate to Profile Page
  Click Button  edit_skills_button
  Set Skill  1  3
  Set Skill  3  2
  Click Button  submit_skills_button
  Refresh & Navigate to Profile Page
  Textfield Value Should Be  id=1  3
  Textfield Value Should Be  id=3  2