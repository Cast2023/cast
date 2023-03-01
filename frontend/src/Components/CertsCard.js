import { 
  Card,
  CardHeader, 
  CardContent, 
  IconButton,
  Box,
} from "@mui/material"

import { DataGrid } from '@mui/x-data-grid'
import EditIcon from '@mui/icons-material/Edit'


const CertsCard = ({ user, activeUserId }) => {
  return (
    <div>
      <Card>
        <CardHeader
          title="Certificates"
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

export default CertsCard