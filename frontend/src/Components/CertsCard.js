import { 
  Card,
  CardHeader, 
  CardContent, 
  IconButton,
  Box,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableContainer,
  TableHead,
  Paper,
} from "@mui/material"

import { DataGrid } from '@mui/x-data-grid'
import EditIcon from '@mui/icons-material/Edit'


const CertsCard = ({ user, activeUserId }) => {
  //console.log(user.certificates)

  return (
    <div>
      <Card>
        <CardHeader
          title="Certificates"
          action={(user.id === activeUserId) && (
            <IconButton id="editCertsButton">
              <EditIcon />
            </IconButton>
          )}
        />
        <CardContent> 
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Vendor</TableCell>
                    <TableCell>Certificate</TableCell>
                    <TableCell>Valid until</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {user.certificates.map((certificate) => (
                    <TableRow key={certificate.certificate}>
                      <TableCell>{certificate.vendor}</TableCell>
                      <TableCell>{certificate.certificate}</TableCell>
                      <TableCell>{certificate.valid_until}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
        </CardContent>
      </Card>
    </div>
  )
}

export default CertsCard