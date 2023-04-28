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
  setFilteredVendors,
  setFilteredVendorsInputValue,
  setFilteredSkills,
  setFilteredSkillsInputValue,
} from "../Reducers/consultantReducer"
import { Link } from "react-router-dom"
import certificateService from "../Services/certificateService"

const Search = () => {
  const dispatch = useDispatch()
  const consultants = useSelector((state) => state.consultants.allConsultants)
  const skills = useSelector((state) => state.consultants.allTechSkills)
  const allCertificates = useSelector(
    (state) => state.consultants.allCertificates
  )
  const allVendors = useSelector((state) => state.consultants.allVendors)
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

  const consultantCertificates = (consultant) => {
    const certificateCounts = consultant.certificates.reduce(
      (counts, certificate) => {
        const vendor = certificate.vendor
        counts[vendor] = (counts[vendor] || 0) + 1
        return counts
      },
      {}
    )

    let output = ""
    Object.entries(certificateCounts).forEach(([vendor, count]) => {
      if (output.length > 0) {
        output += `, ${vendor}: ${count}`
      } else {
        output += `${vendor}: ${count}`
      }
    })

    return output
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
          <Grid item xs={0} sm={0} md={0} lg={0}>
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
          <Grid item xs={0} sm={0} md={0} lg={0}>
            <Autocomplete
              multiple
              label="Select certs by name"
              text="Select certs by name"
              name="certs"
              disablePortal
              id="certs-combo-box"
              value={useSelector(
                (state) => state.consultants.filteredCertificates
              )}
              inputValue={useSelector(
                (state) => state.consultants.filteredCertificatesInputValue
              )}
              onInputChange={(event, value) => {
                dispatch(setFilteredCertificatesInputValue(value))
              }}
              options={allCertificates.map((certificate) => ({
                id: certificate.id,
                label: certificate.certificate_name,
              }))}
              sx={{ width: 300 }}
              renderInput={(params) => (
                <TextField {...params} label="Select certs by name" />
              )}
              isOptionEqualToValue={(option, value) => option.id === value.id}
              onChange={(event, value) => {
                dispatch(setFilteredCertificates(value))
                dispatch(updateFilteredConsultants())
              }}
            />
          </Grid>
          <Grid item xs={0} sm={0} md={0} lg={0}>
            <Autocomplete
              multiple
              label="Select certs by vendor"
              text="Select certs by vendor"
              name="certsVendor"
              disablePortal
              id="certsVendor-combo-box"
              value={useSelector((state) => state.consultants.filteredVendors)}
              inputValue={useSelector(
                (state) => state.consultants.setFilteredVendorsInputValue
              )}
              onInputChange={(event, value) => {
                
                dispatch(setFilteredVendorsInputValue(value))
              }}
              options={allVendors.map((vendor) => ({
                id: vendor.id,
                label: vendor.name,
              }))}
              sx={{ width: 300 }}
              renderInput={(params) => (
                <TextField {...params} label="Select certs by vendor" />
              )}
              isOptionEqualToValue={(option, value) => option.id === value.id}
              onChange={(event, value) => {
                dispatch(setFilteredVendors(value))
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
      {filteredUsers ? (
        <Grid container spacing={2} id="searchresults">
          {filteredUsers.map((consultant) => (
            <Grid item xs={0} sm={0} md={0} lg={0} key={consultant.id}>
              <Card variant="outlined" sx={{ width: 300 }}>
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
                    height="100"
                    image={`https://cataas.com/cat?${consultant.id}`}
                    alt="placeholder img"
                  />
                  <CardContent>
                    <b>Allocation:</b>
                    <div>
                      {consultant.worktime_allocation}% (until{" "}
                      {consultant.allocation_until})
                    </div>
                    <br />
                    <b>Skills:</b>
                    <div>
                      {consultant.skills.map((skill) => skill.tech_name + "  ")}
                    </div>
                    <br />
                    <b>Certificates:</b>
                    <div>{consultantCertificates(consultant)}</div>
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
