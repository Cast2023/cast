import {
  Card,
  CardHeader,
  CardContent,
  IconButton,
  Box,
  Button,
  TextField,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableContainer,
  TableHead,
  Paper,
  Checkbox,
  Autocomplete
} from "@mui/material"

import EditIcon from "@mui/icons-material/Edit"
import AddCircleIcon from '@mui/icons-material/AddCircle';
import consultantService from "../Services/consultantService"
import techService from "../Services/techService";
import { useSelector, useDispatch } from "react-redux"
import { updateEditability, 
        updateNewSkillAddability, 
        setSkillChanges,  
        setAddableSkillDetail, 
        initializeSkillCard, } from "../Reducers/skillCardReducer";
import { useEffect, useState } from "react";



const SkillsCard = ({ user, activeUserId }) => {
  const dispatch = useDispatch()
  const editable = useSelector((state) => state.skillCard.editable)
  const newSkillAddable = useSelector((state) => state.skillCard.newSkillAddable)
  const skillChanges = useSelector((state) => state.skillCard.skillChanges) // This handles the changes in existing skills and existing preferences
  const addableSkillDetail = useSelector((state) => state.skillCard.addableSkillDetail)
  const allSkills = useSelector((state) => state.skillCard.allSkills)// used when allSkill?.map() is used
  const allerSkills = useSelector((state) => state.consultants.allTechSkills)

  const [trigger, setTrigger] = useState(false)
 // const [newSkillLevel, setNewSkillLevel] = useState(1)

  useEffect(() =>{
    const id = (activeUserId===user.id)? activeUserId : user.id
    dispatch(initializeSkillCard(id))// fetch consultant from database and initialize/update skills
  }, [trigger])

  const handleClick = (edit) => {
    dispatch(updateEditability(!edit))
  }

  const handleAdd = (edit) => {
    dispatch(updateNewSkillAddability(!edit))
  }

  const handleSkillChange = (event) => {
    const value = event.target.value
    dispatch(setSkillChanges([...skillChanges, { tech: [event.target.name][0], skill_level: value}]))
  }

  const handlePrefrenceChange = (event) => {
    const value = event.target.checked
    console.log(event.target.id)
    dispatch(setSkillChanges([...skillChanges, { tech: [event.target.name][0],  tech_preference: value }]))
  }
  const handleTechChange = (event, value) => {
    //const name = event.target.name
    const skillId = value.id
    const label = value.label
    console.log("event", "idd", skillId, "label", label)

    dispatch(setAddableSkillDetail({...addableSkillDetail, new_skill_id: skillId}))
  }
  // This method now handles both, adding the new skill and updating the consultant afterwards.
  // That means that there is some reduntant repetition of code, feel free to refactor.

  const handleNewSkill = async (event) => {
    event.preventDefault()
    const newSkillId = addableSkillDetail.new_skill_id
    const newSkillLevel = addableSkillDetail.new_skill_level
    console.log("newSkillName", newSkillId, "newSkillLevel", newSkillLevel)
    let skillsList = null
    //newObject = await techService.createTech(newSkillName)// new object contains the skill_name and id of the created skill 
    skillsList = {skills:[{skill_level: newSkillLevel, tech: newSkillId, tech_preference: true}]}
    consultantService.editConsultant(user.id, skillsList)
    dispatch(updateNewSkillAddability(!newSkillAddable))
    dispatch(setAddableSkillDetail())// This empties the state after it is not needed anymore
    //update skillChanges
    const newSkillChanges = [...skillChanges, { skill_level: newSkillLevel, tech: newSkillId }]
    dispatch(setSkillChanges(newSkillChanges))
    setTrigger(!trigger)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const skillsList = { skills: skillChanges }
    consultantService.editConsultant(user.id, skillsList)
    dispatch(updateEditability(!editable))
    dispatch(setSkillChanges([])) // This empties the state after it is not needed anymore
  }

  const skills = () => {
    let t = []
    allSkills?.map(
      (skill) =>
        (t = t.concat([
          {
            id: skill.tech,
            tech: skill.tech_name,
            skillLevel: skill.skill_level,
            preference: skill.tech_preference,
          },
        ]))
    )
    return t
  }
  const skillLevels = [{ id: 1, level: "Beginner" }, { id: 2, level: "Intermediate" }, { id: 3, level: "Advanced" }]
  
  return (
    <div>
      <Card>
        <CardHeader
          action={(user.id === activeUserId) && (
            <Box>
              <IconButton
                id="add_skills_button"
                onClick={() => handleAdd(newSkillAddable)}
              >
                <AddCircleIcon />
              </IconButton>
              <IconButton
                id="edit_skills_button"
                onClick={() => handleClick(editable)}
              >
                <EditIcon />
              </IconButton>
            </Box>
          )}
          title="Technical skills"

        />
        <CardContent>
          <Box
            
            // sx={{
            //   "& .MuiTextField-root": { m: 1, width: "25ch" },
            // }}
          >
            {newSkillAddable && (
                <form onSubmit={handleNewSkill}>
                    
                      <Autocomplete
                    label="Add skill"
                    text="Add new skill"
                    name="new_skill_name"
                    disablePortal
                    required
                    id="skill-name"
                    options={allerSkills.map((skill) => ({
                      id: skill.id,
                      label: skill.tech_name,
                    }))}
                    sx={{ width: 300 }}
                    renderInput={(params) => (
                      <TextField {...params} label="Select skill" />
                    )}
                    isOptionEqualToValue={(option, value) =>
                      option.id === value.id
                    }
                    onChange={(event, value) => {
                      console.log("autoevent", event)
                      console.log("autovalue", value)
                      //handleTechChange(event, value)
                      dispatch(setAddableSkillDetail({...addableSkillDetail, new_skill_id: value.id}))
  
                      //setNewProject(newValue.label)
                      //setNewProjectId(newValue.id)
                    }}
                  />
                    
                      <Autocomplete
                    label="Skill level"
                    text="Define skill level"
                    name="new_skill_level"
                    disablePortal
                    required={true}
                    id="skill-level"
                    options={skillLevels.map((skill) => ({id: skill.id, label: skill.level}))}
                    sx={{ width: 300 }}
                    renderInput={(params) => (
                      <TextField {...params} label="Select skill level" />
                    )}
                    isOptionEqualToValue={(option, value) =>
                      option.id === value.id
                    }
                    onChange={(event, value) => {
                      console.log("autoevent", event)
                      console.log("autovalue", value)
                      dispatch(setAddableSkillDetail({...addableSkillDetail, new_skill_level: value.id}))

                    }}
                  />
                     
                    
                    <div><Button type="submit" id="submit_new_skill_button">
                      Add
                    </Button></div>
                </form>
              )}
            <form onSubmit={handleSubmit}>

                <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Tech</TableCell>
                      <TableCell>Skill level</TableCell>
                      <TableCell>Perference</TableCell>
                    </TableRow>
                  </TableHead>
                  {skills().map((skill) => (
                  <TableBody key={skill.id}>
                      <TableRow key={skill.id}>
                        {/* Tech */}
                        <TableCell>{skill.tech}</TableCell>

                        {/* Skill level */}
                        <TableCell>            
                          <TextField      
                          key = {skill.id}
                          disabled={!editable}
                          select
                          id={skill.id.toString()}
                          name={skill.id.toString()}
                          defaultValue={skill.skillLevel}
                          variant="standard"
                          onChange={handleSkillChange} // <- handleChange moved inside the Textfield element.
                          >
                            <MenuItem id= "Key1" key="key1" value="1">Wants to learn</MenuItem>
                            <MenuItem id= "Key2" key="key2" value="2">Can work with</MenuItem>
                            <MenuItem id= "Key3" key="key3" value="3">Proficient</MenuItem>
                          </TextField>
                        </TableCell>
                        <TableCell>
                        <Checkbox 
                          key = {skill.id}
                          onChange={handlePrefrenceChange}
                          name = {skill.id}
                          id= {skill.id +"pref"}
                          disabled={!editable}
                          defaultChecked = {skill.preference}
                        >
                        </Checkbox>
                        </TableCell>
                      </TableRow>
                  </TableBody>
                  ))}
                </Table>
                </TableContainer>


              
              
              {editable && (
                <Button type="submit" id="submit_skills_button">
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

export default SkillsCard