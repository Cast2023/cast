import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import {
  Autocomplete,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material"
import AddCircleIcon from "@mui/icons-material/AddCircle"
import EditIcon from "@mui/icons-material/Edit"
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment"
import { DatePicker } from "@mui/x-date-pickers/DatePicker"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import moment from "moment"
import "moment/locale/en-gb"
import {
  addNewProject,
  initializeProjectCard,
  setNewProjectId,
  setNewProjectAllocation,
  setNewProjectStartDate,
  setNewProjectEndDate,
  setProjectChanges,
  updateAddState,
  updateEditState,
} from "../Reducers/projectCardReducer"
import consultantService from "../Services/consultantService"


const ProjectsCard = ({ user, activeUserId }) => {
  const addProjectState = useSelector((state) => state.projectCard.addProjectActivated)
  const editProjectsState = useSelector((state) => state.projectCard.editProjectsActivated)
  const allProjects = useSelector((state) => state.projectCard.allProjects)
  const userProjects = useSelector((state) => state.projectCard.userProjects)
  const newProjectId = useSelector((state) => state.projectCard.newProjectId)
  const newProjectAllocation = useSelector((state) => state.projectCard.newProjectAllocation)
  const newProjectStartDate = useSelector((state) => state.projectCard.newProjectStartDate)
  const newProjectEndDate = useSelector((state) => state.projectCard.newProjectEndDate)
  const projectChanges = useSelector((state) => state.projectCard.projectChanges)
  const [trigger, setTrigger] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeProjectCard(user.id))
  }, [trigger])

  const handleClickPlusButton = (addProjectState) => {
    dispatch(updateAddState(!addProjectState))
  }

  const handleClickEditButton = (editable) => {
    dispatch(updateEditState(!editable))
    dispatch(setProjectChanges([]))
  }

  const handleNewProjectId = (newValue) => {
    dispatch(setNewProjectId(newValue.id))
  }

  const handleNewProjectStart = (newValue) => {
    const newStartDate = moment(newValue).format("YYYY-MM-DD")
    dispatch(setNewProjectStartDate(newStartDate))
  }

  const handleNewProjectEnd = (newValue) => {
    const newEndDate = moment(newValue).format("YYYY-MM-DD")
    dispatch(setNewProjectEndDate(newEndDate))
  }

  const handleNewProjectAllocation = (newValue) => {
    dispatch(setNewProjectAllocation(newValue.target.value))
  }

  const handleSubmitNewProject = (event) => {
    event.preventDefault()
    if (
      newProjectStartDate !== "Invalid date" &&
      newProjectEndDate !== "Invalid date"
    ) {
      const newEmployeeProject = {
        userId: user.id,
        projects: [
          {
            project: newProjectId,
            employee_participation_start_date: newProjectStartDate,
            employee_participation_end_date: newProjectEndDate,
            allocation_busy: newProjectAllocation,
          },
        ],
      }
      dispatch(addNewProject(newEmployeeProject))
      setTrigger(!trigger)
    }
  }

  const handleProjectAllocationChange = (event, project) => {
    const allocation = event.target.value
    dispatch(setProjectChanges([...projectChanges, { project: project, allocation_busy: allocation }]))
  }

  const handleProjectStartDateChange = (event, project) => {
    const startDate = moment(event).format("YYYY-MM-DD")
    startDate != "Invalid date" && (
      dispatch(setProjectChanges([...projectChanges, { project: project, employee_participation_start_date: startDate }]))
    )
  }

  const handleProjectEndDateChange = (event, project) => {
    const endDate = moment(event).format("YYYY-MM-DD")
    endDate != "Invalid date" && (
      dispatch(setProjectChanges([...projectChanges, { project: project, employee_participation_end_date: endDate }]))
    )
  }

  const handleSubmitProjectChanges = (event) => {
    event.preventDefault()
    const projects = { projects: projectChanges }
    consultantService.editConsultant(user.id, projects)
    setTrigger(!trigger)
  }

  const projectlist = () => {
    let projects = []
    userProjects?.map(
      (project) => (
        projects = projects.concat([
          {
            id: project.project,
            name: project.project_name,
            emplStartDate: project.employee_participation_start_date,
            emplEndDate: project.employee_participation_end_date,
            allocation: project.allocation_busy,
          },
        ])
      )
    )
    return projects
  }

  const allocations = ["10", "20", "30", "40", "50", "60", "70", "80", "90", "100"]

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
                  onClick={() => handleClickPlusButton(addProjectState)}
                >
                  <AddCircleIcon />
                </IconButton>
                <IconButton 
                  id="editProjectsButton"
                  onClick={() => handleClickEditButton(editProjectsState)}>
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
                    label="Select project"
                    id="projects-combo-box"
                    options={allProjects?.map((project) => ({
                      id: project.id,
                      label: project.project_name,
                    }))}
                    sx={{ width: 300 }}
                    renderInput={(params) => (
                      <TextField {...params} label="Select project" required />
                    )}
                    isOptionEqualToValue={(option, value) =>
                      option.id === value.id
                    }
                    onChange={(event, newValue) => handleNewProjectId(newValue)}
                  />
                </Box>
                <Box>
                  <LocalizationProvider
                    dateAdapter={AdapterMoment}
                    adapterLocale={moment.locale("en-gb")}
                  >
                    <DatePicker
                      label="Participation start"
                      format="YYYY-MM-DD"
                      onChange={(newValue) => handleNewProjectStart(newValue)}
                      slotProps={{
                        textField: {
                          id: "participationStart",
                          required: true
                        },
                      }}
                    />
                    <DatePicker
                      label="Participation end"
                      format="YYYY-MM-DD"
                      onChange={(newEnd) => handleNewProjectEnd(newEnd)}
                      slotProps={{
                        textField: {
                          id: "participationEnd",
                          required: true
                        },
                      }}
                    />
                  </LocalizationProvider>
                </Box>
                <Box>
                  <FormControl sx={{ m: 1, minWidth: 170 }} required>
                    <InputLabel id="allocationBusy">Allocation busy</InputLabel>
                    <Select
                      id="allocationBusy"
                      label="Allocation busy"
                      defaultValue=""
                      onChange={(event) => handleNewProjectAllocation(event)}
                    >
                      {allocations.map((allocation) => (
                        <MenuItem key={allocation} id={"Key"+allocation} value={allocation}>
                          {allocation}%
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
                <Button type="submit">Submit</Button>
              </form>
            )}
          </Box>
          <Box sx={{ "& .MuiTextField-root": { m: 1, width: "25ch" } }}>
            <form onSubmit={handleSubmitProjectChanges} required>
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
                            disabled={!editProjectsState}
                            id={project.name+"Allocation"}
                            defaultValue="none"
                            variant="standard"
                            autoWidth={true}
                            onChange={(event) => handleProjectAllocationChange(event,project.id)}
                          >
                            <MenuItem disabled id="Key0" value="none">
                              {project.allocation}%
                            </MenuItem>
                            {allocations.map((allocation) => (
                              <MenuItem key={allocation} id={"Key"+allocation} value={allocation}>
                                {allocation}%
                              </MenuItem>
                            ))}
                          </Select>
                        </TableCell>
                        {!editProjectsState && (
                          <TableCell>
                            {project.emplStartDate} | {project.emplEndDate}
                          </TableCell>
                        )}
                        {editProjectsState && (
                          <TableCell>
                            <LocalizationProvider
                              dateAdapter={AdapterMoment}
                              adapterLocale={moment.locale("en-gb")}
                            >
                              <DatePicker
                                format="YYYY-MM-DD"
                                onChange={(event) => 
                                  handleProjectStartDateChange(event,project.id)
                                }
                                slotProps={{
                                  textField: {
                                    id: project.name+"Start",
                                    placeholder: project.emplStartDate
                                  },
                                }}
                              />
                              <DatePicker
                                format="YYYY-MM-DD"
                                onChange={(event) =>
                                  handleProjectEndDateChange(event,project.id)
                                }
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
              {editProjectsState && (
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
