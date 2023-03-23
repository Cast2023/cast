import { Card, CardHeader, CardContent, IconButton, Box } from "@mui/material"
import AddCircleIcon from "@mui/icons-material/AddCircle"
import EditIcon from "@mui/icons-material/Edit"

const ProjectsCard = ({ user, activeUserId }) => {
  const changeAddProjectState = () => {
    console.log("Add project button clicked")
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
                  onClick={() => changeAddProjectState()}
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
        <CardContent></CardContent>
      </Card>
    </div>
  )
}

export default ProjectsCard
