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
  Checkbox
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
// MAJOR DRAWBACK: To see the changes a refresh of the page is needed. This needs to be fixed, but can be pushed to the nex sprint
// TODO next: 
//    Testing (robot atleast). 


const SkillsCard = ({ user, activeUserId }) => {
  const dispatch = useDispatch()
  const editable = useSelector((state) => state.skillCard.editable)
  const newSkillAddable = useSelector((state) => state.skillCard.newSkillAddable)
  const skillChanges = useSelector((state) => state.skillCard.skillChanges) // This handles the changes in existing skills
  const addableSkillDetail = useSelector((state) => state.skillCard.addableSkillDetail)
  const allSkills = useSelector((state) => state.skillCard.allSkills)
  const [trigger, setTrigger] = useState(false)
  
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
    dispatch(setSkillChanges([...skillChanges, { tech: [event.target.name][0], skill_level: event.target.id, tech_preference: value }]))
  }
  const handleTechChange = (event) => {
    const value = event.target.value
    dispatch(setAddableSkillDetail({...addableSkillDetail, [event.target.name]: value}))
  }
  // This method now handles both, adding the new skill and updating the consultant afterwards.
  // That means that there is some reduntant repetition of code, feel free to refactor.

  const handleNewSkill = async (event) => {
    event.preventDefault()
    const newSkillName = {tech_name: addableSkillDetail.new_skill_name}
    const newSkillLevel = addableSkillDetail.new_skill_level
    let newObject = null
    let skillsList = null
    newObject = await techService.createTech(newSkillName)// new object contains the skill_name and id of the created skill 
    skillsList = {skills:[{skill_level: newSkillLevel, tech: newObject.result.id, tech_preference: true}]}
    consultantService.editConsultant(user.id, skillsList)
    dispatch(updateNewSkillAddability(!newSkillAddable))
    dispatch(setAddableSkillDetail())// This empties the state after it is not needed anymore
    //update skillChanges
    const newSkillChanges = [...skillChanges, { skill_level: newSkillLevel, tech: newObject.result.id }]
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

  // The free text fields are now refactored to dropdowns. Works better, but propably broke robot tests, because they expect inputs.
  // No need to test wrong inputs anymore, so those tests can just go (robotests live in tests folder found in the root)
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
                  <div><TextField
                      sx= {{ m: 1, width: "25ch" }}
                      required
                      id="skill-name"
                      label="Add skill"
                      variant="standard"
                      name="new_skill_name"
                      onChange={handleTechChange} // <- handleSkillChange moved inside the Textfield element.
                    />
                    </div>
                    <div>
                      <TextField
                        sx= {{ m: 1, width: "25ch" }}
                        required
                        id="skill-level"
                        label="Add skill level"
                        variant="standard"
                        name="new_skill_level"
                        select
                        defaultValue=""
                        onChange={handleTechChange} // <- handleChange moved inside the Textfield element.
                      >
                        <MenuItem id= "Key1" key="key1" value="1">Wants to learn</MenuItem>
                        <MenuItem id= "Key2" key="key2" value="2">Can work with</MenuItem>
                        <MenuItem id= "Key3" key="key3" value="3">Proficient</MenuItem>
                      </TextField></div>
                    
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


                        {/* Preference */}
                        <TableCell>
                        {/* <TextField      key = {skill.id}
                          disabled={!editable}
                          select
                          id={skill.id.toString()}
                          name={skill.id.toString()}
                          defaultValue={skill.skillLevel}
                          variant="standard"
                          onChange={handleChange} // <- handleChange moved inside the Textfield element.
                        >
                        <MenuItem id= "Key1" key="key1" value="1">Perferred</MenuItem>
                        <MenuItem id= "Key2" key="key2" value="2">NA</MenuItem>
                        <MenuItem id= "Key3" key="key3" value="3">NO!</MenuItem>
                        </TextField> */}
                        <Checkbox 
                          key = {skill.id}
                          onChange={handlePrefrenceChange}
                          name = {skill.id}
                          id= {skill.skillLevel}
                          
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