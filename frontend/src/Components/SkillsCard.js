import * as React from 'react'
import {
  Card,
  CardHeader,
  CardContent,
  IconButton,
  Box,
  Button,
  TextField,
  Checkbox,
  FormControlLabel
} from "@mui/material"

import EditIcon from "@mui/icons-material/Edit"
import { useState } from "react"
import consultantService from "../Services/consultantService"

const SkillsCard = ({ user, activeUserId }) => {
  const [editable, setEditable] = useState(false)
  const [formValues, setFormValues] = useState([])

  const handleClick = (edit) => {
    setEditable(!edit)
  }

  const handleChange = (event) => {
    const value = event.target.value
    const id = event.target.id
    setFormValues([...formValues, { skill_level: value, tech: id }])
    // setFormValues({...formValues, [event.target.name]: value})
    // setFormValues([...formValues, { [event.target.name]: value, tech: id }])
  }

  const [checked, setChecked] = React.useState([true, false]);

  const handleChangeLike = (event) => {
    setChecked([event.target.checked, event.target.checked]);
  };

  // const handleChangeDx = (event) => {
  //   setChecked([event.target.checked, checked[1]]);
  // };

  const handleChangeDis = (event) => {
    setChecked([checked[0], event.target.checked]);
  };

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
          title="Technical skills"
          action={(user.id === activeUserId) && (
            <IconButton
              id="edit_skills_button"
              onClick={() => handleClick(editable)}
            >
              <EditIcon />
            </IconButton>
          )}
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
                  key={skill.id}
                  label={skill.tech}
                  name="skill_level"
                  defaultValue={skill.skillLevel}
                  variant="standard"
                />
                {/* <Checkbox label='Like'/>
                <Checkbox label='Do not like'/> */}              
                {/* const children = ( */}
                {/* <Box sx={{ display: 'flex', flexDirection: 'column', ml: 3 }}> */}
                <FormControlLabel
                control={
                  <Checkbox
                    name="like"
                    id={skill.id}
                    value="whatisvalue"
                    checked={checked[0]}
                    onChange={handleChangeLike}
                  />
                }
                label='Like' />
                <FormControlLabel
                control={
                  <Checkbox
                    name="dislike"
                    id={skill.id}
                    value="whatisvalue"
                    checked={checked[1]}
                    onChange={handleChangeDis}
                    />
                }
                label='Dislike' />

                {/* <TextField
                  disabled={!editable}
                  id="preference"
                  label="Preferred"
                  name="tech_preference"
                  defaultValue={skill.techPreference}
                  variant="standard" 
                /> */}
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
