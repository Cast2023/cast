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
import { useState } from "react"
import consultantService from "../Services/consultantService"

const SkillsCard = ({ user }) => {
  const [editable, setEditable] = useState(false)
  const [formValues, setFormValues] = useState([])

  const handleClick = (edit) => {
    setEditable(!edit)
  }

  const handleChange = (event) => {
    const value = event.target.value
    const id = event.target.id
    setFormValues([...formValues, { skill_level: value, tech: id }])
  }

  const handleSubmit = (event) => {
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
            techPreference: skill.tech_preference
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
            <IconButton
              id="edit_skills_button"
              onClick={() => handleClick(editable)}
            >
              <EditIcon />
            </IconButton>
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
                <div>
                <TextField
                  disabled={!editable}
                  id={skill.id}
                  label={skill.tech}
                  name="skill_level"
                  defaultValue={skill.skillLevel}
                  variant="standard"
                />
                <TextField
                disabled={!editable}
                id="preference"
                label="Preferred"
                name="tech_preference"
                defaultValue={skill.techPreference}
                variant="standard" 
              />
                </div>
              ))}
              {editable && (
                <Button type="submit" id="submit_skills_button">
                  Submit
                </Button>
              )}
            </form>
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
