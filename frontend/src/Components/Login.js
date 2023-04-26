import { Button, Grid } from "@mui/material"
import "./Login.css"

// const Login = ({setSessionState}) => (
//   <div className="login">
//     <div className="rectangle-1">
//       <span className="cast">CAST</span>
//       <button className="rectangle-2">
//         <span className="googlelogin">Googlelogin</span>
//       </button>
//     </div>
//   </div>
// )

// const handleLogIn=({event, setSessionState})=>{
//     event.preventDefault()
//     setSessionState(true)
// }

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
