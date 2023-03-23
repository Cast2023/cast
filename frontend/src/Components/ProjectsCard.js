import {
  Card,
  CardHeader,
  CardContent,
  IconButton,
  Box,
  MenuItem,
  TextField,
  Button,
} from "@mui/material"
import AddCircleIcon from "@mui/icons-material/AddCircle"
import EditIcon from "@mui/icons-material/Edit"
import Autocomplete from "@mui/material/Autocomplete"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { DatePicker } from "@mui/x-date-pickers/DatePicker"
import dayjs from "dayjs"
import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import consultantService from "../Services/consultantService"
import { addNewProject, updateAddState } from "../Reducers/projectCardReducer"
import {
  updateEditability,
  updateNewSkillAddability,
} from "../Reducers/skillCardReducer"


const ProjectsCard = ({ user, activeUserId }) => {
  const [newProject, setNewProject] = useState(null)
  const [newProjectId, setNewProjectId] = useState(null)
  const [newAllocation, setNewAllocation] = useState(0)
  const [newStartDate, setNewStartDate] = useState(null)
  const [newEndDate, setNewEndDate] = useState(null)

  const dispatch = useDispatch()
  const addProjectState = useSelector(
    (state) => state.projectCard.addProjectActivated
  )

  const projects = useSelector((state) => state.projectCard.allProjects)

  const updateAddProjectState = (addProjectState) => {
    dispatch(updateAddState(!addProjectState))
  }

  const handleSubmitNewProject = (event) => {
    event.preventDefault()
    const newEmployeeProjectParticipation = {
      id: user.id,
      projects: [
        {
          project: newProjectId,
          employee_participation_start_date:
            dayjs(newStartDate).format("YYYY-MM-DD"),
          employee_participation_end_date:
            dayjs(newEndDate).format("YYYY-MM-DD"),
          allocation_busy: newAllocation,
        },
      ],
    }
    dispatch(addNewProject(newEmployeeProjectParticipation))
    console.log(newEmployeeProjectParticipation)
  }


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

  const activateAddProject = () => {
    console.log("activateAddProject")
  }

  const projectlist = () => {
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
          action={
            user.id === activeUserId && (
              <Box>
                <IconButton
                  id="add_project_button"
                  onClick={() => updateAddProjectState(addProjectState)}
                >
                  <AddCircleIcon />
                </IconButton>
                <IconButton id="editProjectsButton">
                  <EditIcon />
                </IconButton>
              </Box>
            )
          }
        />
        <CardContent>
          <Box sx={{ "& .MuiTextField-root": { m: 1, width: "25ch" } }}>
            {addProjectState && (
              <form onSubmit={handleSubmitNewProject}>
                <Box>
                  <Autocomplete
                    label="Choose project"
                    text="Choose project"
                    name="project"
                    disablePortal
                    id="projects-combo-box"
                    options={projects.map((project) => ({
                      id: project.id,
                      label: project.project_name,
                    }))}
                    sx={{ width: 300 }}
                    renderInput={(params) => (
                      <TextField {...params} label="Select project" />
                    )}
                    isOptionEqualToValue={(option, value) =>
                      option.id === value.id
                    }
                    onChange={(event, newValue) => {
                      setNewProject(newValue.label)
                      setNewProjectId(newValue.id)
                    }}
                  />
                </Box>
                <Box>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="Employee participation start date"
                      text="Employee participation start date"
                      name="employee_start_date"
                      id="employee_start_date"
                      inputFormat="yyyy-MM-dd"
                      onChange={(newValue) => {
                        setNewStartDate(newValue)
                      }}
                      value={newStartDate}
                    />
                  </LocalizationProvider>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="Employee participation end date"
                      text="Employee participation end date"
                      name="employee_end_date"
                      id="employee_end_date"
                      inputFormat="yyyy-MM-dd"
                      onChange={(newValue) => {
                        setNewEndDate(newValue)
                      }}
                      value={newEndDate}
                    />
                  </LocalizationProvider>
                </Box>
                <Box>
                  <TextField
                    label="Allocation busy"
                    id="allocation_busy"
                    name="allocation_busy"
                    type="number"
                    inputProps={{ min: 0, max: 100, step: "5" }}
                    onChange={(event) => setNewAllocation(event.target.value)}
                    defaultValue={newAllocation}
                  ></TextField>
                </Box>
                <Button type="submit">Submit</Button>
              </form>
            )}
          </Box>
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
              {projectlist().map((project) => (
                <div key={project.name}>
                  {project.name}
                  <p />
                  <TextField
                    disabled={!editable}
                    label="Participation starts"
                    // select
                    // id={skill.id.toString()}
                    // name={skill.id.toString()}
                    defaultValue={project.emplStartDate}
                    variant="standard"
                    // onChange={handleChange} // <- handleChange moved inside the Textfield element.
                  />
                  <TextField
                    disabled={!editable}
                    label="Participation ends"
                    defaultValue={project.emplEndDate}
                    variant="standard"
                    // onChange={handleChange} // <- handleChange moved inside the Textfield element.
                  />
                  <TextField
                    disabled={!editable}
                    label="Allocation"
                    select
                    defaultValue={project.allocation}
                    variant="standard"
                    // onChange={handleChange} // <- handleChange moved inside the Textfield element.
                  >
                    <MenuItem id="Key1" key="key1" value="20">
                      20%
                    </MenuItem>
                    <MenuItem id="Key2" key="key2" value="40">
                      40%
                    </MenuItem>
                    <MenuItem id="Key3" key="key3" value="60">
                      60%
                    </MenuItem>
                    <MenuItem id="Key4" key="key4" value="80">
                      80%
                    </MenuItem>
                    <MenuItem id="Key5" key="key5" value="100">
                      100%
                    </MenuItem>
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
