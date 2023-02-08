import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
} from "@mui/material"

import { useSelector } from "react-redux"



const Profile = () => {
  const consultants = useSelector( state => state.consultants)
  return(
    <div>
      <h2>Profile</h2>
      <div>This is the profile page.</div>
      <div>
        <ul>
          <li>Name:</li>
          <li>Role:</li>
          <li>Skills</li>
          <li>Certifications</li>
          <li>Allocation</li>
          <li>Etc.</li>
        </ul>
      </div>
      Available Skills:
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            {consultants.map((consultant) => (
              <TableRow key={consultant.id}>
                <TableCell>
                  {consultant.first_name} {consultant.last_name}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}
export default Profile
