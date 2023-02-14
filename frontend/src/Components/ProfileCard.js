import { 
  Card,
  CardHeader, 
  CardContent, 
  IconButton,
  TextField,
  Box,
} from "@mui/material"

import EditIcon from '@mui/icons-material/Edit'


const ProfileCard = ({ user }) => {
  return (
    <div>
      <Card>
        <CardHeader
          action={
            <IconButton>
              <EditIcon />
            </IconButton>
          }
          title="Personal info"
        />
        <CardContent>
          <Box
            //component="form"
            sx={{
              '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}
            //noValidate
            //autoComplete="off"
          >
            <TextField
              disabled
              id="firstname-disabled"
              label="First name"
              value={user.first_name}
              variant="standard"
            />
            <TextField
              disabled
              id="lastname-disabled"
              label="Last name"
              value={user.last_name}
              variant="standard"
            />
            <TextField
              disabled
              id="email-disabled"
              label="Email"
              value={user.email}
              variant="standard"
            />
            <TextField
              disabled
              id="phonenumber-disabled"
              label="Phone"
              value={user.phone_number}
              variant="standard"
            />
            <div>
              <TextField
                disabled
                id="city-disabled"
                label="City"
                value={user.location_city}
                variant="standard"
              />
              <TextField
                disabled
                id="country-disabled"
                label="Country"
                value={user.location_country}
                variant="standard"
              />
            </div>
            <TextField
              disabled
              id="team-disabled"
              label="Team"
              value="To Do"
              variant="standard"
            />
            <div>
              <TextField
                disabled
                id="languages-disabled"
                label="Languages"
                value="To do"
                variant="standard"
              />
            </div>
            <TextField
              disabled
              id="worktime-disabled"
              label="Work time allocation"
              value={`${user.worktime_allocation}%`}
              variant="standard"
            />
            <TextField
              disabled
              id="until-disabled"
              label="Work time allocation until"
              value={user.allocation_until}
              variant="standard"
            />
            <div>
              <TextField
                disabled
                id="preferences-disabled"
                label="Preferences with projects & techs"
                multiline
                rows={4}
                value={user.wants_to_do}
              />
            </div>
            <div>
              <TextField
                disabled
                id="dislikes-disabled"
                label="Prefer not to work with"
                multiline
                rows={4}
                value={user.wants_not_to_do}
              />
            </div>
          </Box>
        </CardContent>
      </Card>
    </div>
  )
}

export default ProfileCard





