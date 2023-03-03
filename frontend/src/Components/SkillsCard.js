import {
  Card,
  CardHeader,
  CardContent,
  IconButton,
  Box,
  Button,
  TextField,
  MenuItem,
} from "@mui/material"

import EditIcon from "@mui/icons-material/Edit"
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useState } from "react"
import consultantService from "../Services/consultantService"
import techService from "../Services/techService";

// MAJOR DRAWBACK: To see the changes a refresh of the page is needed. This needs to be fixed, but can be pushed to the nex sprint
// TODO next: 
//    Testing (robot atleast). 


const SkillsCard = ({ user }) => {
  const [editable, setEditable] = useState(false)
  const [newSkill, setNewSkill] = useState(false)
  const [formValues, setFormValues] = useState([]) // This handles the changes in existing skills
  const [techFormValues, setTechFormValues] = useState() // this handels the new skill. Feel free to rename these 

  const handleClick = (edit) => {
    setEditable(!edit)
  }

  const handleAdd = (edit) => {
    setNewSkill(!edit)
  }

  const handleChange = (event) => {
    const value = event.target.value
    setFormValues([...formValues, { skill_level: value, tech: [event.target.name][0] }])
  }
  const handleTechChange = (event) => {
    const value = event.target.value
    setTechFormValues(({...techFormValues, [event.target.name]: value}))
  }
  // This method now handles both, adding the new skill and updating the consultant afterwards.
  // That means that there is some reduntant repetition of code, feel free to refactor.

  const handleNewSkill = async (event) => {
    event.preventDefault()
    const newSkillName = {tech_name: techFormValues.new_skill_name}
    const newSkillLevel = techFormValues.new_skill_level
    let newObject = null
    let skillsList = null
    try{ // if adding of the new skill fails, catch finds a skill with same name from the DB. Probably should be moved elsewere
      newObject = await techService.createTech(newSkillName)// new object contains the skill_name and id of the created skill 
      skillsList = {skills:[{skill_level: newSkillLevel, tech: newObject.id}]}
      consultantService.editConsultant(user.id, skillsList)
    } catch{
        newObject = await techService.getSelectedTechByName(newSkillName.tech_name)
        skillsList = {skills:[{skill_level: newSkillLevel, tech: newObject[0].id}]}
        consultantService.editConsultant(user.id, skillsList)

      }
    setNewSkill(!newSkill)
    setTechFormValues() // This empties the state after it is not needed anymore
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const skillsList = { skills: formValues }
    consultantService.editConsultant(user.id, skillsList)
    setEditable(!editable)
    setFormValues([]) // This empties the state after it is not needed anymore
  }

  const skills = () => {
    let t = []
    user.skills?.map(
      (skill) =>
        (t = t.concat([
          {
            id: skill.tech,
            tech: skill.tech_name,
            skillLevel: skill.skill_level,
          },
        ]))
    )
    return t
  }

  // The free text fields are now refactored to dropdowns. Works better, but propably broke robot tests, because they expect inputs.
  // No need to test wrong inputs anymore, so those tests can just go (robotests live in tests folder found in the root)
  return (
    <div>
      <Card>
        <CardHeader
          action={
            <Box>
              <IconButton
                id="add_skills_button"
                onClick={() => handleAdd(newSkill)}
              >
                <AddCircleIcon />
              </IconButton>
              <IconButton
                id="edit_skills_button"
                onClick={() => handleClick(editable)}
              >
                <EditIcon />
              </IconButton>
            </Box>
          }
          title="Technical skills"
        />
        <CardContent>
          <Box
            
            sx={{
              "& .MuiTextField-root": { m: 1, width: "25ch" },
            }}
          >
            {newSkill && (
                <form onSubmit={handleNewSkill}>
                  <div><TextField
                      required
                      id="skill-name"
                      label="Add skill"
                      variant="standard"
                      name="new_skill_name"
                      onChange={handleTechChange} // <- handleChange moved inside the Textfield element.
                    />
                    </div>
                    <div>
                      <TextField
                      required
                      id="skill-level"
                      label="Add skill level"
                      variant="standard"
                      name="new_skill_level"
                      select
                      onChange={handleTechChange} // <- handleChange moved inside the Textfield element.
                      >
                      <MenuItem key="key1" value="1">Wants to learn</MenuItem>
                      <MenuItem key="key2" value="2">Can work with</MenuItem>
                      <MenuItem key="key3" value="3">Proficient</MenuItem>
                      </TextField></div>
                    
                    <div><Button type="submit" id="add_skills_button">
                      Add
                    </Button></div>
                </form>
              )}
            <form onSubmit={handleSubmit}>
              {skills().map((skill) => (
                <TextField
                  disabled={!editable}
                  select
                  id={skill.id.toString()}
                  label={skill.tech}
                  name={skill.id.toString()}
                  defaultValue={skill.skillLevel}
                  variant="standard"
                  onChange={handleChange} // <- handleChange moved inside the Textfield element.
                >
                <MenuItem key="key1" value="1">Wants to learn</MenuItem>
                <MenuItem key="key2" value="2">Can work with</MenuItem>
                <MenuItem key="key3" value="3">Proficient</MenuItem>


                </TextField>
              ))}
              
              {editable && (
                <Button type="submit" id="submit_skills_button">
                  Submit
                </Button>
              )}
            </form>
            
          </Box>
        </CardContent>
      </Card>
    </div>
  )
}

export default SkillsCard

