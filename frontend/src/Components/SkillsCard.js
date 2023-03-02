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

const SkillsCard = ({ user }) => {
  const [editable, setEditable] = useState(false)
  const [newSkill, setNewSkill] = useState(false)
  const [formValues, setFormValues] = useState([])
  const [techFormValues, setTechFormValues] = useState()

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

  const handleNewSkill = async (event) => {
    event.preventDefault()
    const newSkillName = {tech_name: techFormValues.new_skill_name}
    const newSkillLevel = techFormValues.new_skill_level
    const newObject = await techService.createTech(newSkillName)// new object contains the skill_name and id of the created skill
    const skillsList = {skills:[{skill_level: newSkillLevel, tech: newObject.id}]}
    consultantService.editConsultant(user.id, skillsList)
    setNewSkill(!newSkill)
    setTechFormValues()
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const skillsList = { skills: formValues }
    consultantService.editConsultant(user.id, skillsList)
    setEditable(!editable)
    setFormValues([])
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
                  onChange={handleChange}
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
            {newSkill && (
                <form onSubmit={handleNewSkill}>
                  <div><TextField
                      required
                      id="skill-name"
                      label="Add skill"
                      variant="standard"
                      name="new_skill_name"
                      onChange={handleTechChange}
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
                      onChange={handleTechChange}
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
          </Box>
          <br />
          Skill levels:
          <br />1 = Wants to learn, 2 = Can work with, 3 = Proficient
        </CardContent>
      </Card>
    </div>
  )
}

export default SkillsCard

