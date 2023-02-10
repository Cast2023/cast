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
  const user = useSelector((state) => state.session.activeUser)
  if (user.length === 0) {
    return <div>Nothing to render</div>
  }
  console.log("User:", user)
  return (
    <div>
      <h2>Profile</h2>
      <div>This is the profile page.</div>
      <div>
        <ul>
          <li>
            Name: {user.firstname} {user.last_name}
          </li>
          <li>Email: {user.email}</li>
          <li>Phone: {user.phone_number}</li>
          <li>
            Location: {user.location_city}, {user.location_country}
          </li>
          <li>
            Worktime allocation: {user.worktime_allocation}, until{" "}
            {user.allocation_until}
          </li>
          <li>I want to do: {user.wants_to_do}</li>
          <li>I want not to do: {user.wants_not_to_do}</li>
        </ul>
      </div>
      Available Skills:
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            {user.skills.map((skill) => (
              <TableRow key={skill.id}>
                <TableCell>
                  {skill.tech_name} {skill.skill_level}
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
