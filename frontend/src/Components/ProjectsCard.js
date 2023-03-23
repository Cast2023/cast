import {
  Card,
  CardHeader,
  CardContent,
  IconButton,
  Box,
  TextField,
  Button,
} from "@mui/material"
import { useSelector, useDispatch } from "react-redux"
import AddCircleIcon from "@mui/icons-material/AddCircle"
import EditIcon from "@mui/icons-material/Edit"
import { updateAddState } from "../Reducers/projectCardReducer"
import Autocomplete from "@mui/material/Autocomplete"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { DatePicker } from "@mui/x-date-pickers/DatePicker"
import { useState } from "react"

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
      employee_id: user.id,
      project_id: newProjectId,
      participation_start_date: newStartDate,
      participation_end_date: newEndDate,
      allocation_busy: newAllocation,
    }
    console.log(newEmployeeProjectParticipation)
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
        </CardContent>
      </Card>
    </div>
  )
}

export default ProjectsCard
