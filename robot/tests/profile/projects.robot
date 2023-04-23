*** Variables ***

*** Settings ***
Resource        ../../resources/common.resource
Suite Setup     ${SETUP}

*** Test Cases ***

# Scenario: As a visitor I can see the projects card on profile page
#     Refresh & Navigate to Profile Page
#     Wait Until Page Contains Element  projectscard

# Scenario: As a visitor I can't add projects for other users
#     Go To  ${SERVER}
#     Wait until page contains element  search
#     Click element  search
#     Wait Until Page Contains Element  searchresults
#     Sleep  2s
#     Click Link  Janet
#     Wait Until Page Contains Element  projectscard
#     Page Should Not Contain Button  addProjectButton

# Scenario: As a visitor I can't edit other user's projects
#     Go To  ${SERVER}
#     Wait until page contains element  search
#     Click element  search
#     Wait Until Page Contains Element  searchresults
#     Sleep  2s
#     Click Link  Janet
#     Wait Until Page Contains Element  projectscard
#     Page Should Not Contain Button  editProjectsButton

# Scenario: As a visitor I can see correct projects in project info on profile page
#     Refresh & Navigate to Profile Page
#     Wait Until Page Contains Element  projectscard
#     Table Cell Should Contain  locator=projectTable  row=1  column=1  expected=Project
#     Table Cell Should Contain  locator=projectTable  row=2  column=1  expected=JawCorp
#     Table Cell Should Contain  locator=projectTable  row=3  column=1  expected=KeutzCorp

# Scenario: As a visitor I can see correct allocation-% in project info on profile page
#     Refresh & Navigate to Profile Page
#     Wait Until Page Contains Element  projectscard
#     Table Cell Should Contain  locator=projectTable  row=1  column=2  expected=Allocation-%
#     Table Cell Should Contain  locator=projectTable  row=2  column=2  expected=50%
#     Table Cell Should Contain  locator=projectTable  row=3  column=2  expected=50%

# Scenario: As a visitor I can see correct participation period in project info on profile page
#     Refresh & Navigate to Profile Page
#     Wait Until Page Contains Element  projectscard
#     Table Cell Should Contain  locator=projectTable  row=1  column=3  expected=Participation from | until
#     Table Cell Should Contain  locator=projectTable  row=2  column=3  expected=2023-03-31 | 2024-12-31
#     Table Cell Should Contain  locator=projectTable  row=3  column=3  expected=2023-08-01 | 2025-12-31

Scenario: As a visitor, after pressing plus-symbol I can see the correct fields for adding a new project
    Refresh & Navigate to Profile Page
    Wait Until Page Contains Element  projectscard
    Click Button  addProjectButton
    Page Should Contain Element  projectsComboBox
    Page Should Contain Element  participationStart
    Page Should Contain Element  participationEnd
    Page Should Contain Element  selectAllocationBusy

Scenario: As a visitor I can't submit a new project without filling in all required fields
    Refresh & Navigate to Profile Page
    Wait Until Page Contains Element  projectscard
    Click Button  addProjectButton
    Click Element  selectAllocationBusy
    Click Element  allocation20
    Click Button  submitNewProject
    Page Should Contain Element  projectsComboBox
    Page Should Contain Element  participationStart
    Page Should Contain Element  participationEnd
    Page Should Contain Element  selectAllocationBusy


Scenario: As a visitor I can edit my projects' allocations
    Refresh & Navigate to Profile Page
    Wait Until Page Contains Element  projectscard
    Click Button  editProjectsButton
    Click Element  JawCorpAllocation
    Click Element  allocation40%
    Click Element  KeutzCorpAllocation
    Click Element  allocation80%
    Click Button  submitProjectChanges
    Refresh & Navigate to Profile Page
    Wait Until Page Contains Element  projectscard
    Table Cell Should Contain  locator=projectTable  row=2  column=2  expected=40%
    Table Cell Should Contain  locator=projectTable  row=3  column=2  expected=80%
    Click Button  editProjectsButton
    Click Element  JawCorpAllocation
    Click Element  allocation50%
    Click Element  KeutzCorpAllocation
    Click Element  allocation50%
    Click Button  submitProjectChanges


