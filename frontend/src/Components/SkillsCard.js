import {
  Card,
  CardHeader,
  CardContent,
  IconButton,
  Box,
  Button,
  TextField,
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
  const [TechFormValues, setTechFormValues] = useState()

  const handleClick = (edit) => {
    setEditable(!edit)
  }

  const handleAdd = (edit) => {
    setNewSkill(!edit)
  }

  const handleChange = (event) => {
    const value = event.target.value
    const id = event.target.id
    setFormValues([...formValues, { skill_level: value, tech: id }])
  }
  const handleTechChange = (event) => {
    const value = event.target.value
    //const id = event.target.id
    setTechFormValues({tech_name: value })
  }

  const handleNewSkill = (event) => {
    event.preventDefault()
    console.log('adding new skill', event.target)
    const values = TechFormValues
    const newSkill = techService.createTech(values)
    console.log("newskill", newSkill.value.id)
    setNewSkill(!newSkill)
  }

  const handleSubmit = (event) => {
    console.log("boom")
    event.preventDefault()
    const skillsList = { skills: formValues }
    consultantService.editConsultant(user.id, skillsList)
    setEditable(!editable)
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
            <form onSubmit={handleSubmit} onChange={handleChange}>
              {skills().map((skill) => (
                <TextField
                  disabled={!editable}
                  //disabled={!newSkill}
                  id={skill.id}
                  label={skill.tech}
                  name="skill_level"
                  defaultValue={skill.skillLevel}
                  variant="standard"
                />
              ))}
              
              {editable && (
                <Button type="submit" id="submit_skills_button">
                  Submit
                </Button>
              )}
            </form>
            {newSkill && (
                <form onSubmit={handleNewSkill} onChange={handleTechChange}>
                  <div><TextField
                      required
                      id="skill-name"
                      label="Add skill"
                      variant="standard"
                    />
                    </div>
                    
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

//<div><TextField
//                      required
//                      id="skill-level"
//                      label="Add skill level"
//                      variant="standard"
//                    /></div>