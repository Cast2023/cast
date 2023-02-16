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
  const [formValues, setFormValues] = useState(({
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
    phone_number: user.phone_number,
    location_country: user.location_country,
    location_city_: user.location_city,
    worktime_allocation: user.worktime_allocation,
    allocation_until: user.allocation_until,
    wants_to_do: user.wants_to_do,
    wants_not_to_do: user.wants_not_to_do,
  }))

  //const toggleEditability = (event) => {
  //  setEditable(event.target.value)
  //}

  const handleClick = (edit) => {
    setEditable(!edit)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const values = formValues
    //console.log("handlesubmit",formValues)
    const data = consultantService.editConsultant(user.id, values)
    //log("boom", data)
    setEditable(!editable)
  
  }
  
  const handleChange = (event) => {
    const value = event.target.value
    console.log(value)
    setFormValues({...formValues, [event.target.name]: value})
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
            <form onSubmit={handleSubmit} onChange={handleChange}>
              <TextField
                disabled={!editable}
                id="firstname"
                label="First Name"
                name="first_name"
                defaultValue={user.first_name}
                variant="standard"
              />
              <TextField
                disabled={!editable}
                id="lastname"
                label="Last Name"
                name="last_name"
                defaultValue={user.last_name}
                variant="standard"
              />
              <TextField
                disabled
                id="email"
                label="Email"
                name="email"
                value={user.email}
                variant="standard"
              />
              <TextField
                disabled={!editable}
                id="phonenumber"
                label="Phone"
                name="phone_number"
                value={user.phone_number}
                variant="standard"
              />
              <div>
                <TextField
                  disabled={!editable}
                  id="city"
                  label="City"
                  name="location_city"
                  value={user.location_city}
                  variant="standard"
                />
                <TextField
                  disabled={!editable}
                  id="country"
                  label="Country"
                  name="location_country"
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
                name="worktime_allocation"
                value={`${user.worktime_allocation}%`}
                variant="standard"
              />
              <TextField
                disabled={!editable}
                id="until"
                label="Work time allocation until"
                name="allocation_until"
                value={user.allocation_until}
                variant="standard"
              />
              <div>
                <TextField
                  disabled={!editable}
                  id="preferences"
                  label="Preferences with projects & techs"
                  name="wants_to_do"
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
                  name="wants_not_to_do"
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





