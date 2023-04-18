import moment from "moment"
import "moment/locale/en-gb"
import {
  Card,
  CardHeader,
  CardContent,
  IconButton,
  Box,
  MenuItem,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableContainer,
  TableHead,
  Paper,
  Select,
} from "@mui/material"
import AddCircleIcon from "@mui/icons-material/AddCircle"
import EditIcon from "@mui/icons-material/Edit"
import Autocomplete from "@mui/material/Autocomplete"
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { DatePicker } from "@mui/x-date-pickers/DatePicker"
import dayjs from "dayjs"
import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import consultantService from "../Services/consultantService"
import {
  addNewProject,
  updateAddState,
  updateEditState,
  initializeProjectCard,
  setProjectChanges,
} from "../Reducers/projectCardReducer"


const ProjectsCard = ({ user, activeUserId }) => {
  const [newProjectId, setNewProjectId] = useState(null)
  const [newAllocation, setNewAllocation] = useState(0)
  const [newStartDate, setNewStartDate] = useState(null)
  const [newEndDate, setNewEndDate] = useState(null)
  const [trigger, setTrigger] = useState(false)
  const editable = useSelector((state) => state.projectCard.editProjectsActivated)
  const projectChanges = useSelector((state) => state.projectCard.projectChanges)
  const userProjects = useSelector((state) => state.projectCard.userProjects)
  const [projects, setProjects] = useState(
    useSelector((state) => state.projectCard.allProjects)
  )
  const addProjectState = useSelector((state) => state.projectCard.addProjectActivated)
  const dispatch = useDispatch()

  useEffect(() => {
    const id = activeUserId === user.id ? activeUserId : user.id
    dispatch(initializeProjectCard(id))
  }, [trigger])

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
    setTrigger(!trigger)
    setNewProjectId(null)
    setNewAllocation(0)
    setNewStartDate(null)
    setNewEndDate(null)
  }

  const handleProjectAllocationChange = (event, project) => {
    const allocation = event.target.value
    dispatch(setProjectChanges([...projectChanges, { project: project, allocation_busy: allocation }]))
  }

  const handleProjectStartDateChange = (event, project) => {
    const startDate = dayjs(event).format("YYYY-MM-DD")
    startDate != "Invalid Date" && (
      dispatch(setProjectChanges([...projectChanges, { project: project, employee_participation_start_date: startDate }]))
    )
  }

  const handleProjectEndDateChange = (event, project) => {
    const endDate = dayjs(event).format("YYYY-MM-DD")
    endDate != "Invalid Date" && (
      dispatch(setProjectChanges([...projectChanges, { project: project, employee_participation_end_date: endDate }]))
    )
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const projectList = { projects: projectChanges }
    consultantService.editConsultant(user.id, projectList)
    dispatch(updateEditState(!editable))
    dispatch(setProjectChanges([]))
    setTrigger(!trigger)
  }

  const handleClick = (editable) => {
    dispatch(updateEditState(!editable))
  }

  const projectlist = () => {
    let p = []
    userProjects?.map(
      (project) =>
        (p = p.concat([
          {
            id: project.project,
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
                <IconButton 
                  id="editProjectsButton"
                  onClick={() => handleClick(editable)}>
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
                      setNewProjectId(newValue.id)
                    }}
                  />
                </Box>
                <Box>
                  <LocalizationProvider
                    dateAdapter={AdapterMoment}
                    adapterLocale={moment.locale("en-gb")}
                  >
                    <DatePicker
                      label="Employee participation start date"
                      format="YYYY-MM-DD"
                      onChange={(newValue) => {
                        setNewStartDate(newValue)
                      }}
                      value={newStartDate}
                      slotProps={{
                        textField: {
                          id: "employeeStartDate",
                        },
                      }}
                    />
                    <DatePicker
                      label="Employee participation end date"
                      format="YYYY-MM-DD"
                      onChange={(newValue) => {
                        setNewEndDate(newValue)
                      }}
                      value={newEndDate}
                      slotProps={{
                        textField: {
                          id: "employeeEndDate",
                        },
                      }}
                    />
                  </LocalizationProvider>
                </Box>
                <Box>
                  <TextField
                    label="Allocation busy"
                    id="allocation_busy"
                    name="allocation_busy"
                    type="number"
                    inputProps={{ min: 0, max: 100, step: "10" }}
                    onChange={(event) => setNewAllocation(event.target.value)}
                    defaultValue={newAllocation}
                  />
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
            <form onSubmit={handleSubmit}>
              <TableContainer component={Paper}>               
                <Table id="projectTable">
                  <TableHead>
                    <TableRow>
                      <TableCell>Project</TableCell>
                      <TableCell>Allocation-%</TableCell>
                      <TableCell>Participation from | until</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {projectlist().map((project) => (
                      <TableRow key={project.name}>
                        <TableCell>{project.name}</TableCell>
                        <TableCell>            
                          <Select      
                            disabled={!editable}
                            id={project.name+"Allocation"}
                            defaultValue="none"
                            variant="standard"
                            autoWidth={true}
                            onChange={(event) => {handleProjectAllocationChange(event,project.id)}}
                          >
                            <MenuItem id="Key0" key="key0" disabled value="none">{project.allocation}%</MenuItem>
                            <MenuItem id="Key10" key="key10" value="10">10%</MenuItem>
                            <MenuItem id="Key20" key="key20" value="20">20%</MenuItem>
                            <MenuItem id="Key30" key="key30" value="30">30%</MenuItem>
                            <MenuItem id="Key40" key="key40" value="40">40%</MenuItem>
                            <MenuItem id="Key50" key="key50" value="50">50%</MenuItem>
                            <MenuItem id="Key60" key="key60" value="60">60%</MenuItem>
                            <MenuItem id="Key70" key="key70" value="70">70%</MenuItem>
                            <MenuItem id="Key80" key="key80" value="80">80%</MenuItem>
                            <MenuItem id="Key90" key="key90" value="90">90%</MenuItem>
                            <MenuItem id="Key100" key="key100" value="100">100%</MenuItem>
                          </Select>
                        </TableCell>
                        {!editable && (
                          <TableCell>
                            {project.emplStartDate} | {project.emplEndDate}
                          </TableCell>
                        )}
                        {editable && (
                          <TableCell>
                            <LocalizationProvider
                              dateAdapter={AdapterMoment}
                              adapterLocale={moment.locale("en-gb")}
                            >
                              <DatePicker
                                format="YYYY-MM-DD"
                                onChange={(event) => {
                                  handleProjectStartDateChange(event,project.id)
                                }}
                                slotProps={{
                                  textField: {
                                    id: project.name+"Start",
                                    placeholder: project.emplStartDate
                                  },
                                }}
                              />
                              <DatePicker
                                format="YYYY-MM-DD"
                                onChange={(event) => {
                                  handleProjectEndDateChange(event,project.id)
                                }}
                                slotProps={{
                                  textField: {
                                    id: project.name+"End",
                                    placeholder: project.emplEndDate
                                  },
                                }}
                              />
                            </LocalizationProvider>
                          </TableCell>
                        )}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
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

export default ProjectsCard
