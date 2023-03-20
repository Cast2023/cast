*** Variables ***

*** Settings ***
Resource        ../../resources/common.resource
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
  Click Element  id=1
  Wait until Page Contains Element  Key1
  Click Element  Key1
  Element Should Contain  id=1  Wants to learn
  Click Button  submit_skills_button
  Click Button  edit_skills_button
  Click Element  id=1
  Wait until Page Contains Element  Key3
  Click Element  Key3
  Element Should Contain  id=1  Proficient
  Click Button  submit_skills_button
  Refresh & Navigate to Profile Page
  Element Should Contain  id=1  Proficient
  


Scenario: As a visitor I can edit many skills
  Refresh & Navigate to Profile Page
  Click Button  edit_skills_button
  Click Element  id=1
  Wait until Page Contains Element  Key1
  Click Element  Key1
  Click Element  id=3
  Wait until Page Contains Element  Key1
  Click Element  Key1
  Element Should Contain  id=1  Wants to learn
  Element Should Contain  id=3  Wants to learn
  Click Button  submit_skills_button
  Refresh & Navigate to Profile Page
  Click Button  edit_skills_button
  Click Element  id=1
  Wait until Page Contains Element  Key3
  Click Element  Key3
  Click Element  id=3
  Wait until Page Contains Element  Key2
  Click Element  Key2
  Click Button  submit_skills_button
  Refresh & Navigate to Profile Page

  Element Should Contain  id=1  Proficient
  Element Should Contain  id=3  Can work with

# TODO: FIX THIS!
#Scenario: As a visitor I can Add a new skill
#  Refresh & Navigate to Profile Page
#  Click Button  add_skills_button
#  Set Value  skill-name  ristipisto
#  Click Element  skill-level
#  Wait until Page Contains Element  Key2
#  Click Element  Key2
#  Sleep  1s
#  Click Button  submit_new_skill_button
#  Sleep  1s
#  Refresh & Navigate to Profile Page
#  Page Should Contain  ristipisto
#
#  Textfield Value Should Be  id=1  3
#  Textfield Value Should Be  id=3  2

Scenario: As a visitor I can't edit other user's tech skills
  Go To  ${SERVER}
  Wait until page contains element  search
  Click element  search
  Wait Until Page Contains Element  searchresults
  Sleep  1s
  Click Link  Janet
  Wait Until Page Contains Element  projectscard
  Page Should Not Contain Button  editProjectsButton
