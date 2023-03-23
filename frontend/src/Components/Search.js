import {
  TextField,
  Grid,
  Card,
  CardContent,
  CardActionArea,
  CardMedia,
  CardHeader,
} from "@mui/material"
import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { setNameFilter } from "../Reducers/searchReducer"
import { setTechFilter } from "../Reducers/searchReducer"
import { updateFilteredConsultantsByName } from "../Reducers/consultantReducer"
import { updateFilteredConsultantsByTech } from "../Reducers/consultantReducer"
import { Link } from "react-router-dom"

const Search = () => {
  const consultants = useSelector((state) => state.consultants.allConsultants)
  const filteredUsers = useSelector(
    (state) => state.consultants.filteredConsultants
  )
  const nameFilter = useSelector((state) => state.search.nameFilter)
  const techFilter = useSelector((state) => state.search.techFilter)


  useEffect(() => {
    if (consultants) {
      dispatch(updateFilteredConsultantsByName(nameFilter))
    } else {
      dispatch(updateFilteredConsultantsByName(null))
    }
  }, [nameFilter], [techFilter])
  //if (!(techFilter==null)) {
  //  dispatch(updateFilteredConsultantsByTech(techFilter))
  //} 

  const dispatch = useDispatch()
  const changeSearchTerm = (e) => {
    dispatch(setNameFilter(e.target.value))
  }
  const changeTechSearchTerm = (e) => {
    dispatch(setTechFilter(e.target.value))
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
              size="medium"
              onChange={changeSearchTerm}
              placeholder="First and/or last name"
              type="text"
              value={nameFilter}
              id="search_bar"
            />
            <TextField
              size="medium"
              onChange={changeTechSearchTerm}
              placeholder="Technology"
              type="text"
              value={techFilter}
              id="search_bar_tech"
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
