import { Grid, Container } from "@mui/material"
import PropTypes from "prop-types"
import { useSelector } from "react-redux"
import SkillsCard from "./SkillsCard"
import ProfileCard from "./ProfileCard"
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
  console.log(selectedConsultant)
  if (consultant === null) {
    return <div>Nothing to render</div>
  }

  return (
    <div>
      <Container>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={12} sm={6} md={6}>
            <ProfileCard user={selectedConsultant} />
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <ProjectsCard user={selectedConsultant} />
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <SkillsCard user={selectedConsultant} />
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <CertsCard user={selectedConsultant} />
          </Grid>
        </Grid>
      </Container>
    </div>
  )
}

Profile.defaultProps = {
  consultant: null,
}

export default Profile
