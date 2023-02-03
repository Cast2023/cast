import { TextField, Button, Grid } from "@mui/material"

const makeChange = () => {
  console.log("Life changes!")
}

const Search = () => (
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
  </div>
)

export default Search
