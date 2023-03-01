import { 
  Card,
  CardHeader, 
  CardContent, 
  IconButton,
  Box,
} from "@mui/material"
  
import { DataGrid } from '@mui/x-data-grid'
import EditIcon from '@mui/icons-material/Edit'
  
  
const ProjectsCard = ({ user, activeUserId }) => {
  return (
    <div>
      <Card>
        <CardHeader
          title="Projects"
          action={(user.id === activeUserId) && (
            <IconButton>
              <EditIcon />
            </IconButton>
          )}
          />
        <CardContent> 
        
        </CardContent>
      </Card>
    </div>
  )
}

export default ProjectsCard