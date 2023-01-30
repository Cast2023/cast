import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
} from "@mui/material"
const Profile = ({ consult }) => (
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
          {consult.map((consult) => (
            <TableRow key={consult.id}>
              <TableCell>
                {consult.first_name} {consult.last_name}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </div>
)

export default Profile
