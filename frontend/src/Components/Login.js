import { Button, Grid } from "@mui/material"


const Login = ({handleLogIn}) => (
  <Grid container>
    <form onSubmit={handleLogIn}>
      <Grid item alignItems="stretch" style={{ display: "flex" }}>
        <Button
          variant="contained"
          color="primary"
          type="submit"
          value="Submit"
          id="login"
        >
          Log in
        </Button>
      </Grid>
    </form>
  </Grid>
)

export default Login
