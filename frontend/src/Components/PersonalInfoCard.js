import { useState } from "react"
import { 
  Box,
  Button,
  Card,
  CardContent,
  CardHeader, 
  IconButton,
  TextField,
} from "@mui/material"
import EditIcon from '@mui/icons-material/Edit'
import consultantService from "../Services/consultantService"


const PersonalInfoCard = ({ user, activeUserId }) => {
  const [editable, setEditable] = useState(false)
  const [formValues, setFormValues] = useState(({}))

  const handleClick = () => {
    setEditable(!editable)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const values = formValues
    consultantService.editConsultant(user.id, values)
    handleClick()
  }
  
  const handleChange = (event) => {
    const value = event.target.value
    setFormValues({...formValues, [event.target.name]: value})
  }

  return (
    <div>
      <Card id="personalinfocard">
        <CardHeader
          title="Personal info"
          action={(user.id === activeUserId) && (
            <IconButton onClick={() => handleClick()} id="editPersonalInfoButton">
              <EditIcon />
            </IconButton>
          )}
        />
        <CardContent>
          <Box
            sx={{
              '& .MuiTextField-root': { m: 1, minWidth: 0 },
            }}
          >
            <form onSubmit={handleSubmit} onChange={handleChange}>
              <TextField
                disabled={!editable}
                id="firstname"
                label="First name"
                name="first_name"
                defaultValue={user.first_name}
                variant="standard"
              />
              <TextField
                disabled={!editable}
                id="lastname"
                label="Last name"
                name="last_name"
                defaultValue={user.last_name}
                variant="standard"
              />
              <TextField
                disabled
                id="email"
                label="Email"
                name="email"
                defaultValue={user.email}
                variant="standard"
              />
              <TextField
                disabled={!editable}
                id="phonenumber"
                label="Phone"
                name="phone_number"
                defaultValue={user.phone_number}
                variant="standard"
              />
              <div>
                <TextField
                  disabled={!editable}
                  id="city"
                  label="City"
                  name="location_city"
                  defaultValue={user.location_city}
                  variant="standard"
                />
                <TextField
                  disabled={!editable}
                  id="country"
                  label="Country"
                  name="location_country"
                  defaultValue={user.location_country}
                  variant="standard"
                />
              </div>
              <TextField
                disabled={!editable}
                id="worktime"
                label="Work time allocation"
                name="worktime_allocation"
                defaultValue={`${user.worktime_allocation}%`}
                variant="standard"
              />
              <TextField
                disabled={!editable}
                id="until"
                label="Work time allocation until"
                name="allocation_until"
                defaultValue={user.allocation_until}
                variant="standard"
              />
              <div>
                <TextField
                  disabled={!editable}
                  id="preferences"
                  label="Prefer to work with (e.g. projects)"
                  name="wants_to_do"
                  multiline
                  rows={4}
                  defaultValue={user.wants_to_do}
                  sx={{ width: '90%' }}
                />
              </div>
              <div>
                <TextField
                  disabled={!editable}
                  id="dislikes"
                  label="Prefer not to work with (e.g. projects)"
                  name="wants_not_to_do"
                  multiline
                  rows={4}
                  defaultValue={user.wants_not_to_do}
                  sx={{ width: '90%' }}
                />
              </div>
              {editable && (
                <Button type='submit' id="submitPersonalInfoButton">
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

export default PersonalInfoCard





