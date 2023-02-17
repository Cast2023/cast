import { 
  Card,
  CardHeader, 
  CardContent, 
  IconButton,
  Box,
  Button,
} from "@mui/material"

import { DataGrid } from '@mui/x-data-grid'
import EditIcon from '@mui/icons-material/Edit'
import { useState } from "react"
import consultantService from "../Services/consultantService"


const SkillsCard = ({ user }) => {
  const [editable, setEditable] = useState(false)
 // const [formValues, setFormValues] = useState(({}))

  const handleClick = (edit) => {
    setEditable(!edit)
  }
  
  //const handleChange = (event) => {
  //  const value = event.target.value
  //  
  //  console.log(value)
  //  setFormValues({...formValues, [event.target.name]: value})
  //}
  //const handleSubmit = (event) => {
  //  event.preventDefault()
  //  const values = formValues
  //  console.log("handlesubmit",formValues)
  //  consultantService.editConsultant(user.id, values)
  //  //log("boom", data)
  //  setEditable(!editable)
  //
  //}
  const columns = [
    { 
      field: 'tech', 
      headerName: 'Technical skill', 
      flex: 1,
      editable: false,
      sortable: true,
      
    },
    {
      field: 'skillLevel',
      headerName: 'Skill level',
      flex: 0.7,
      editable: editable,
      sortable: true,
      type: "singleSelect",
      valueOptions: ["1","2","3"],
    }
  ]
      
  const rows = () => {
      const t = []
      user.skills.map(skill =>
        t.push({ id: skill.tech, tech: skill.tech_name, skillLevel: skill.skill_level }) //use concat instead of push?
      )
      return t
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
          title="Technical skills"
        />
        <CardContent > 
          <Box sx={{ height: 400, width: '100%' }}>
            <DataGrid
              rows={rows()}
              columns={columns}
              autoPageSize
              rowHeight={45}
              disableSelectionOnClick
              //checkboxSelection
            />
            
          </Box>
          <br/>Skill levels: 
          <br/>1 = Wants to learn, 2 = Can work with, 3 = Proficient
          
        </CardContent>
        
      </Card>
    </div>
  )
}

export default SkillsCard





