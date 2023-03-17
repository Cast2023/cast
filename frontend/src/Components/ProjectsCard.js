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
  
import EditIcon from '@mui/icons-material/Edit'
// import AddCircleIcon from '@mui/icons-material/AddCircle'
import { useState } from "react"
import consultantService from "../Services/consultantService"
// import techService from "../Services/techService"
import { useSelector, useDispatch } from "react-redux"
import { updateEditability, updateNewSkillAddability } from "../Reducers/skillCardReducer"
  
const ProjectsCard = ({ user, activeUserId }) => {
  const dispatch = useDispatch()

  const editable = useSelector((state) => state.skillCard.editable)
  // const newSkillAddable = useSelector((state) => state.skillCard.newSkillAddable)
  const [formValues, setFormValues] = useState([]) // This handles the changes in existing skills
  // const [techFormValues, setTechFormValues] = useState() // this handels the new skill. Feel free to rename these 

  // const handleChange = (event) => {
  //   const value = event.target.value
  //   setFormValues([...formValues, { skill_level: value, tech: [event.target.name][0] }])
  //   console.log("event:", event.target)
  // }

  const handleSubmit = (event) => {
    event.preventDefault()
    const skillsList = { skills: formValues }
    consultantService.editConsultant(user.id, skillsList)
    dispatch(updateEditability(!editable))
    setFormValues([]) // This empties the state after it is not needed anymore
  }

  const projects = () => {
    let p = []
    user.projects?.map(
      (project) =>
        (p = p.concat([
          {
            // id: project.tech,
            name: project.project_name,
            emplStartDate: project.employee_participation_start_date,
            emplEndDate: project.employee_participation_end_date,
            allocation: project.allocation_busy,
          },
        ]))
    )
    return p
  }

  return (
    <div>
      <Card>
        <CardHeader
          title="Projects"
          action={(user.id === activeUserId) && (
            <IconButton id="editProjectsButton">
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
            {/* {newSkillAddable && (
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
                        <MenuItem id= "Key1" key="key1" value="1">Wants to learn</MenuItem>
                        <MenuItem id= "Key2" key="key2" value="2">Can work with</MenuItem>
                        <MenuItem id= "Key3" key="key3" value="3">Proficient</MenuItem>
                      </TextField></div>
                    
                    <div><Button type="submit" id="submit_new_skill_button">
                      Add
                    </Button></div>
                </form>
              )} */}

            <form onSubmit={handleSubmit}>
              {projects().map((project) => (
                <div key={project.name}>
                  {project.name}
                  <p/>
                  <TextField
                    disabled={!editable}
                    label = "Participation starts"
                    // select
                    // id={skill.id.toString()}
                    // name={skill.id.toString()}
                    defaultValue={project.emplStartDate}
                    variant="standard"
                    // onChange={handleChange} // <- handleChange moved inside the Textfield element.
                  />
                  <TextField
                    disabled={!editable}
                    label= "Participation ends"
                    defaultValue={project.emplEndDate}
                    variant="standard"
                    // onChange={handleChange} // <- handleChange moved inside the Textfield element.
                  />
                  <TextField
                    disabled={!editable}
                    label= "Allocation"
                    select
                    defaultValue={project.allocation}
                    variant="standard"
                  // onChange={handleChange} // <- handleChange moved inside the Textfield element.
                  >
                    <MenuItem id= "Key1" key="key1" value="20">20%</MenuItem>
                    <MenuItem id= "Key2" key="key2" value="40">40%</MenuItem>
                    <MenuItem id= "Key3" key="key3" value="60">60%</MenuItem>
                    <MenuItem id= "Key4" key="key4" value="80">80%</MenuItem>
                    <MenuItem id= "Key5" key="key5" value="100">100%</MenuItem>
                  </TextField>
                </div>
              ))}
              
              {/* {editable && (
                <Button type="submit" id="submit_skills_button">
                  Submit
                </Button>
              )} */}
            </form>
            
          </Box>
        </CardContent>
      </Card>
    </div>
  )
}

export default ProjectsCard