import { Grid, Container } from "@mui/material"

import { useSelector } from "react-redux"
import SkillsCard from "./SkillsCard"
import ProfileCard from "./ProfileCard"
import CertsCard from "./CertsCard"
import ProjectsCard from "./ProjectsCard"

const Profile = () => {
  // const user = useSelector((state) => state.session.activeUser)
  const user = useSelector((state) => state.consultants.selectedConsultant)
  console.log(user)
  if (user.length === 0) {
    return <div>Nothing to render</div>
  }

  return (
    <div>
      <Container>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={12} sm={6} md={6}>
            <ProfileCard user={user} />
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <ProjectsCard user={user} />
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <SkillsCard user={user} />
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <CertsCard user={user} />
          </Grid>
        </Grid>
      </Container>
    </div>
  )
}

export default Profile
