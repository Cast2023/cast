import { 
  Card,
  CardHeader, 
  CardContent, 
  IconButton,
  TextField,
  Box,
  Button,
} from "@mui/material"

import EditIcon from '@mui/icons-material/Edit'
import { useState } from "react"
import consultantService from "../Services/consultantService"


const ProfileCard = ({ user }) => {
  const [editable, setEditable] = useState(false)

  const toggleEditability = (event) => {
    setEditable(event.target.value)
  }

  const handleClick = (edit) => {
    setEditable(!edit)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    console.log('handlesubmit', event)
    return async (dispatch) => {
      const data = await consultantService.editConsultant(user.id, event.target.value)

    }
  }

  return (
    <div>
      <Card>
        <CardHeader
          action={
            <IconButton onClick={() => handleClick(editable)}>
              <EditIcon />
            </IconButton>
          }
          title="Personal info"
        />
        <CardContent>
          <Box
            //component="form"
            //onSubmit={handleSubmit}
            sx={{
              '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}
            //noValidate
            //autoComplete="off"
          >
            <form onSubmit={handleSubmit}>
              <TextField
                disabled={!editable}
                id="firstname"
                label="First name"
                defaultValue={user.first_name}
                variant="standard"
              />
              <TextField
                disabled={!editable}
                id="lastname"
                label="Last name"
                value={user.last_name}
                variant="standard"
              />
              <TextField
                disabled
                id="email"
                label="Email"
                value={user.email}
                variant="standard"
              />
              <TextField
                disabled={!editable}
                id="phonenumber"
                label="Phone"
                value={user.phone_number}
                variant="standard"
              />
              <div>
                <TextField
                  disabled={!editable}
                  id="city"
                  label="City"
                  value={user.location_city}
                  variant="standard"
                />
                <TextField
                  disabled={!editable}
                  id="country"
                  label="Country"
                  value={user.location_country}
                  variant="standard"
                />
              </div>
              <TextField
                disabled={!editable}
                id="team"
                label="Team"
                value="To Do"
                variant="standard"
              />
              <div>
                <TextField
                  disabled={!editable}
                  id="languages"
                  label="Languages"
                  value="To do"
                  variant="standard"
                />
              </div>
              <TextField
                disabled={!editable}
                id="worktime"
                label="Work time allocation"
                value={`${user.worktime_allocation}%`}
                variant="standard"
              />
              <TextField
                disabled={!editable}
                id="until"
                label="Work time allocation until"
                value={user.allocation_until}
                variant="standard"
              />
              <div>
                <TextField
                  disabled={!editable}
                  id="preferences"
                  label="Preferences with projects & techs"
                  multiline
                  rows={4}
                  value={user.wants_to_do}
                />
              </div>
              <div>
                <TextField
                  disabled={!editable}
                  id="dislikes"
                  label="Prefer not to work with"
                  multiline
                  rows={4}
                  value={user.wants_not_to_do}
                />
              </div>
              {editable && (
                <Button type='submit'>
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

export default ProfileCard





