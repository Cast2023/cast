import {
  TextField,
  Button,
  Grid,
  Card,
  CardContent,
  CardActionArea,
  CardMedia,
  List,
  ListItem,
  ListItemText,
  Avatar,
  CardHeader,
} from "@mui/material"
import { deepOrange } from "@mui/material/colors"
import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { setSearchFilter } from "../Reducers/searchReducer"
import { updateFilteredConsultansByName } from "../Reducers/consultantReducer"
import axios from "axios"


const Search = () => {
  const dispatch = useDispatch()
  const changeSearchTerm = (e) => {
    dispatch(setSearchFilter(e.target.value))
  }

  const consultants = useSelector((state) => state.consultants.allConsultants)
  const filteredUsers = useSelector((state) => state.consultants.filteredConsultants)
  const [catUrl, setCatUrl] = useState("")
  const filter = useSelector((state) => state.search.consultantName)


  useEffect(() => {
    if (consultants) {
      dispatch(updateFilteredConsultansByName(filter))
    } else {
      dispatch(updateFilteredConsultansByName(null))
    }
  }, [filter])

  // Just for debug/logging purposes to see your filteredUsers
  // useEffect(() => {
  //   console.log(filteredUsers)
  // }, [filteredUsers])

  const initCatUrl = async () => {
    const result = await axios
      .get("https://api.thecatapi.com/v1/images/search")
      .then((response) => response.data[0].url)
      .catch((error) => console.error(error))
    setCatUrl(result)
  }
  useEffect(() => {
    initCatUrl()
  }, [])

  return (
    <div>
      <div>
        <Grid container spacing={4} justifyContent="center" alignItems="left">
          <Grid item xs={12} md={12} lg={12}>
            <h2>Search consults</h2>
          </Grid>
          <Grid item xs={12} md={12} lg={12}>
            <TextField
              fullWidth
              onChange={changeSearchTerm}
              placeholder="search with first and last name"
              type="text"
              value={filter}
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
        <Grid container spacing={2}>
          {filteredUsers.map((consultant) => (
            <Grid item xs={12} sm={6} md={4} lg={4} >
              <Card variant="outlined" key={consultant.id}>
                <CardActionArea>
                  <CardHeader
                    title={`${consultant.first_name} ${consultant.last_name}`}
                    subheader={`${consultant.location_city}, ${consultant.location_country}`}
                  />
                  <CardMedia
                    component="img"
                    height="140"
                    // image={catUrl}
                    // image={`https://i.pravatar.cc/${consultant.id + 300}`}
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
                    {/* <List>
                      {consultant.skills.map((skill) => {
                        return (
                          <ListItem dense={true}>
                            <ListItemText>{skill.tech_name}</ListItemText>
                          </ListItem>
                        )
                      })}
                    </List> */}
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
