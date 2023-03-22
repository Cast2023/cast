import {
  Card,
  CardHeader,
  CardContent,
  IconButton,
  Box,
  TextField,
} from "@mui/material"
import { useSelector, useDispatch } from "react-redux"
import AddCircleIcon from "@mui/icons-material/AddCircle"
import EditIcon from "@mui/icons-material/Edit"
import { updateAddState } from "../Reducers/projectCardReducer"
import Autocomplete from "@mui/material/Autocomplete"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { DatePicker } from "@mui/x-date-pickers/DatePicker"

const ProjectsCard = ({ user, activeUserId }) => {
  const dispatch = useDispatch()
  const addProjectState = useSelector(
    (state) => state.projectCard.addProjectActivated
  )

  const projects = useSelector((state) => state.projectCard.allProjects)

  const updateAddProjectState = (addProjectState) => {
    dispatch(updateAddState(!addProjectState))
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
                  id="add_skills_button"
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
          <Box>
            {addProjectState && (
              <Box>
                <Autocomplete
                  disablePortal
                  id="projects-combo-box"
                  options={projects.map((project) => project.project_name)}
                  sx={{ width: 300 }}
                  renderInput={(params) => (
                    <TextField {...params} project_name="project" />
                  )}
                />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker />
                </LocalizationProvider>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker />
                </LocalizationProvider>
                <TextField
                  type="number"
                  inputProps={{ min: 0, max: 100, step: "5" }}
                ></TextField>
              </Box>
            )}
          </Box>
        </CardContent>
      </Card>
    </div>
  )
}

export default ProjectsCard
