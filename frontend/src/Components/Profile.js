import { Grid, Container } from "@mui/material"
import SkillsCard from "./SkillsCard"
import PersonalInfoCard from "./PersonalInfoCard"
import CertsCard from "./CertsCard"
import ProjectsCard from "./ProjectsCard"

const Profile = ({ consultant }) => {
  // const user = useSelector((state) => state.session.activeUser)
  const selectedConsultant = consultant
    ? consultant
    : this.defaultProps.consultant

  // const selectedConsultant = useSelector(
  //   (state) => state.consultants.selectedConsultant
  // )
  //console.log(selectedConsultant)
  // if (!selectedConsultant.length) {
  //   return <div>Nothing to render</div>
  // }

  return selectedConsultant.id ? (
    <div>
      <Container id="container">
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} id="grid">
          <Grid item xs={12} sm={6} md={6} id="personalinfocard">
            <PersonalInfoCard user={selectedConsultant} />
          </Grid>
          <Grid item xs={12} sm={6} md={6} id="projectscard">
            <ProjectsCard user={selectedConsultant} />
          </Grid>
          <Grid item xs={12} sm={6} md={6} id="skillscard">
            <SkillsCard user={selectedConsultant} />
          </Grid>
          <Grid item xs={12} sm={6} md={6} id="certscard">
            <CertsCard user={selectedConsultant} />
          </Grid>
        </Grid>
      </Container>
    </div>
  ) : (
    <div>Loading data... spinner here </div>
  )
}

Profile.defaultProps = {
  consultant: [],
}

export default Profile
