import {
  Card,
  CardHeader,
  CardContent,
  IconButton,
  Box,
  Button,
  TextField,
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
  const skillChanges = useSelector((state) => state.skillCard.skillChanges) 
  const addableSkillDetail = useSelector((state) => state.skillCard.addableSkillDetail)
  const userSkills = useSelector((state) => state.skillCard.userSkills)
  const allSkills = useSelector((state) => state.consultants.allTechSkills)

  const [trigger, setTrigger] = useState(false)

  useEffect(() =>{
    const id = (activeUserId===user.id)? activeUserId : user.id
    dispatch(initializeSkillCard(id))
  }, [trigger])

  const handleClick = (edit) => {
    dispatch(updateEditability(!edit))
  }

  const handleAdd = (edit) => {
    dispatch(updateNewSkillAddability(!edit))
  }
  
  const handleSkillLevelChange = (event, value) => {
    dispatch(setSkillChanges([...skillChanges, { tech: event.target.id[0],  skill_level: value.id }]))    
  }

  const handlePrefrenceChange = (event) => {
    const value = event.target.checked
    dispatch(setSkillChanges([...skillChanges, { tech: [event.target.name][0],  tech_preference: value }]))
  }

  const handleNewSkillChange = (value) => {    
    dispatch(setAddableSkillDetail({...addableSkillDetail, new_skill_id: value.id}))
  }

  const handleNewSkillLevelChange = (value) => {
    dispatch(setAddableSkillDetail({...addableSkillDetail, new_skill_level: value.id}))
  }
  
  const handleNewSkill = async (event) => {
    event.preventDefault()
    const newSkillId = addableSkillDetail.new_skill_id
    const newSkillLevel = addableSkillDetail.new_skill_level    
    const skillsList = {skills:[{skill_level: newSkillLevel, tech: newSkillId, tech_preference: true}]}
    consultantService.editConsultant(user.id, skillsList)
    dispatch(updateNewSkillAddability(!newSkillAddable))
    dispatch(setAddableSkillDetail())
    const newSkillChanges = [...skillChanges, { skill_level: newSkillLevel, tech: newSkillId }]
    dispatch(setSkillChanges(newSkillChanges))
    setTrigger(!trigger)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const skillsList = { skills: skillChanges }
    consultantService.editConsultant(user.id, skillsList)
    dispatch(updateEditability(!editable))
    dispatch(setSkillChanges([]))
  }
  
  const skills = () => {
    let t = []
    userSkills?.map(
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
  const skillLevels = [{ id: 1, level: "Beginner" }, { id: 2, level: "Intermediate" }, { id: 3, level: "Proficient" }]
  
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
          <Box sx={{ "& .MuiTextField-root": { m: 1, width: "25ch" } }}>
            {newSkillAddable && (
                <form onSubmit={handleNewSkill}>
                    
                  <Autocomplete
                    label="Add skill"
                    text="Add new skill"
                    name="new_skill_name"
                    disablePortal
                    id="skill-name"
                    options={allSkills.map((skill) => ({
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
                    onChange={(event, value) => {handleNewSkillChange(value)}}
                  />
                    
                  <Autocomplete
                    label="Skill level"
                    text="Define skill level"
                    name="new_skill_level"
                    disablePortal
                    id="skill-level"
                    options={skillLevels.map((skill) => ({id: skill.id, label: skill.level}))}
                    sx={{ width: 300 }}
                    renderInput={(params) => (
                      <TextField {...params} label="Select skill level" />
                    )}
                    isOptionEqualToValue={(option, value) =>
                      option.id === value.id
                    }
                    onChange={(event, value) => {handleNewSkillLevelChange(value)}}                    
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
                      <TableCell>Preference</TableCell>
                    </TableRow>
                  </TableHead>
                  {skills().map((skill) => (
                  <TableBody key={skill.id}>
                      <TableRow key={skill.id}>
                        {/* Tech */}
                        <TableCell>{skill.tech}</TableCell>

                        {/* Skill level */}
                        <TableCell>
                          <Autocomplete
                            key = {skill.id}
                            disabled={!editable}
                            label="Skill level"
                            text="Define skill level"
                            name={skill.id+"new_skill_level"}
                            disablePortal
                            freeSolo
                            forcePopupIcon={true}
                            id={skill.id.toString()}
                            defaultValue={skillLevels.find((level) => level.id === skill.skillLevel).level}
                            options={skillLevels.map((skill) => ({id: skill.id, label: skill.level}))}
                            sx={{ width: 300 }}
                            renderInput={(params) => (
                              <TextField {...params} label={skill.level} />
                            )}
                            isOptionEqualToValue={(option, value) =>
                              option.id === value.id
                            }
                            onChange={(event, value) => {handleSkillLevelChange(event, value)}}
                        />            
                          
                        </TableCell>
                        <TableCell>
                        <Checkbox 
                          key = {skill.id}
                          onChange={handlePrefrenceChange}
                          name = {skill.id.toString()}
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