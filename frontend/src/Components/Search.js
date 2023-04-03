import {
  TextField,
  Grid,
  Card,
  CardContent,
  CardActionArea,
  CardMedia,
  CardHeader,
} from "@mui/material"
import Autocomplete from "@mui/material/Autocomplete"
import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import {
  updateFilteredConsultants,
  setFilteredName,
  setFilteredCertificates,
  setFilteredCertificatesInputValue,
  setFilteredSkills,
  setFilteredSkillsInputValue,
} from "../Reducers/consultantReducer"
import { Link } from "react-router-dom"
import certificateService from "../Services/certificateService"

const Search = () => {
  const dispatch = useDispatch()
  const consultants = useSelector((state) => state.consultants.allConsultants)
  const skills = useSelector((state) => state.consultants.allTechSkills)
  const certs = useSelector((state) => state.consultants.allCertificates)
  const filteredUsers = useSelector(
    (state) => state.consultants.filteredConsultants
  )
  const nameFilter = useSelector((state) => state.consultants.filteredName)

  useEffect(() => {
    dispatch(updateFilteredConsultants())
  }, [])

  const changeSearchTerm = (e) => {
    dispatch(setFilteredName(e.target.value))
    dispatch(updateFilteredConsultants())
  }

  return (
    <div>
      <div>
        <Grid container spacing={4} justifyContent="center" alignItems="left">
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <h2>Search consultants</h2>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <TextField
              fullWidth
              onChange={changeSearchTerm}
              placeholder="search with first and last name"
              type="text"
              value={nameFilter}
              id="search_bar"
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <Autocomplete
              multiple
              label="Select tech skills"
              text="Select tech skills"
              name="skills"
              disablePortal
              id="skills-combo-box"
              value={useSelector((state) => state.consultants.filteredSkills)}
              inputValue={useSelector(
                (state) => state.consultants.filteredSkillsInputValue
              )}
              onInputChange={(event, value) => {
                dispatch(setFilteredSkillsInputValue(value))
              }}
              options={skills.map((skill) => ({
                id: skill.id,
                label: skill.tech_name,
              }))}
              sx={{ width: 300 }}
              renderInput={(params) => (
                <TextField {...params} label="Select skills" />
              )}
              isOptionEqualToValue={(option, value) => option.id === value.id}
              onChange={(event, value) => {
                dispatch(setFilteredSkills(value))
                dispatch(updateFilteredConsultants())
              }}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <Autocomplete
              multiple
              label="Select certs"
              text="Select certs"
              name="certs"
              disablePortal
              id="certs-combo-box"
              value={useSelector((state) => state.consultants.filteredCertificates)}
              inputValue={useSelector(
                (state) => state.consultants.filteredCertificatesInputValue
              )}
              onInputChange={(event, value) => {
                dispatch(setFilteredCertificatesInputValue(value))
              }}
              options={certs.map((certificate) => ({
                id: certificate.vendor,
                label: certificate.certificate,
              }))}
              sx={{ width: 300 }}
              renderInput={(params) => (
                <TextField {...params} label="Select certs" />
              )}
              isOptionEqualToValue={(option, value) => option.id === value.id}
              onChange={(event, value) => {
                dispatch(setFilteredCertificates(value))
                dispatch(updateFilteredConsultants())
              }}
            />
          </Grid>
          {/* <Grid item xs={4}>
              <Button
                variant="contained"
                color="secondary"
                type="submit"
                value="submit"
              >
                Search
              </Button>
            </Grid> */}
            
        </Grid>
      </div>
      <br />
      <div>Search results here</div>
      {filteredUsers ? (
        <Grid container spacing={2} id="searchresults">
          {filteredUsers.map((consultant) => (
            <Grid item xs={12} sm={6} md={4} lg={4} key={consultant.id}>
              <Card variant="outlined">
                <CardActionArea>
                  <CardHeader
                    title={
                      <Link id={consultant.id} to={`/profile/${consultant.id}`}>
                        {consultant.first_name} {consultant.last_name}
                      </Link>
                    }
                    subheader={`${consultant.location_city}, ${consultant.location_country}`}
                  />
                  <CardMedia
                    component="img"
                    height="140"
                    image={`https://cataas.com/cat?${consultant.id}`}
                    alt="placeholder img"
                  />
                  <CardContent>
                    <div>
                      <b>Wants to do:</b> {consultant.wants_to_do}
                    </div>
                    <br />
                    <div>
                      <b>Wants not to do:</b> {consultant.wants_not_to_do}
                    </div>
                    <br />
                    <div>
                      Allocation: {consultant.worktime_allocation}, until:{" "}
                      {consultant.allocation_until}
                    </div>
                    <br />
                    <b>Skills:</b>
                    <div>
                      {" "}
                      {consultant.skills.map((skill) => skill.tech_name + "  ")}
                    </div>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <div>Nothing to show yet</div>
      )}
    </div>
  )
}

export default Search
