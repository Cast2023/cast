import { TextField, Button, Grid } from "@mui/material"
import { useSelector } from "react-redux"

const makeChange = () => {
  console.log("Life changes!")
}

const Search = () => {
  const consultants = useSelector((state) => state.consultants)

  return (
    <div>
      <h2>Search consults</h2>

      <div>
        <Grid container>
          <form onSubmit={makeChange}>
            <Grid item>
              <TextField value="" onChange={makeChange} />
            </Grid>
            <Grid item alignItems="stretch" style={{ display: "flex" }}>
              <Button
                variant="contained"
                color="secondary"
                type="submit"
                value="submit"
              >
                Search
              </Button>
            </Grid>
          </form>
        </Grid>
      </div>
      <br />
      <div>Search results here</div>
      <ul>
        {consultants.map((consultant) => (
          <li key={consultant.id}>
            {consultant.first_name} {consultant.last_name}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Search
