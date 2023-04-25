import { useSelector } from "react-redux"
import { Grid } from "@mui/material"
import CertsCard from "./CertsCard"
import PersonalInfoCard from "./PersonalInfoCard"
import ProjectsCard from "./ProjectsCard"
import SkillsCard from "./SkillsCard"

const Profile = ({ consultant }) => {
  const activeUserId = useSelector((state) => state.session.activeUserId)
  
  const selectedConsultant = consultant
    ? consultant
    : this.defaultProps.consultant

  return selectedConsultant.id ? (
    <div>
      <Grid
        container
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        id="grid"
      >
        <Grid item xs={12} sm={6} md={6} id="personalinfocard">
          <PersonalInfoCard
            user={selectedConsultant}
            activeUserId={activeUserId}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={6} id="projectscard">
          <ProjectsCard
            user={selectedConsultant}
            activeUserId={activeUserId} 
          />
        </Grid>
        <Grid item xs={12} sm={6} md={6} id="skillscard">
          <SkillsCard 
            user={selectedConsultant}
            activeUserId={activeUserId} 
          />
        </Grid>
        <Grid item xs={12} sm={6} md={6} id="certscard">
          <CertsCard
            user={selectedConsultant}
            activeUserId={activeUserId} 
          />
        </Grid>
      </Grid>
    </div>
  ) : (
    <div>Loading data... spinner here </div>
  )
}

Profile.defaultProps = {
  consultant: [],
}

export default Profile
