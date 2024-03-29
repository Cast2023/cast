import { useState } from "react"
import { Button, Popover } from "@mui/material"


const Home = () => {
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)

  return(
    <div>
    <h2>Welcome to CAS-tracker</h2>
    <br />
      <div>
        Recent news/updates:
        TBD
        <br />
        <br />
        <br />
        <div>
          <Button
            variant="contained"
            color="primary"
            id="getstarted"
            onClick={(event) => {
              setAnchorEl(event.currentTarget);
            }}
          >
            Get Started
          </Button>
          <Popover
            anchorEl={anchorEl}
            open={open}
            id={open ? "simple-popover" : undefined}
            onClose={() => {
              setAnchorEl(null);
            }}
            transformOrigin={{
              horizontal: "center",
              vertical: "top",
            }}
            anchorOrigin={{
              horizontal: "center",
              vertical: "bottom",
            }}
          >
            This is very helpful
          </Popover>
        </div>
        <br /> 
      </div>
    </div>
  )
}

export default Home
