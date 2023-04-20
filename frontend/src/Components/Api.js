import { Button, 
  Autocomplete, 
  TextField,   
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableContainer,
  TableHead,
  Paper,
  Checkbox } from "@mui/material"
import UploadIcon from "@mui/icons-material/Upload"
import DownloadIcon from "@mui/icons-material/Download"
import axios from "axios"
import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { initializeIntegrationTokenTB,
        updateintegrationTokenName,
        updateintegrationTokenValue,} from "../Reducers/integrationReducer"

const Api = () => {
  const [file, setFile] = useState(null)

  const importCertificates = async () => {
    const baseUrl =
      process.env.REACT_APP_BACKEND_URL + "api/import-certificates/"
    const formData = new FormData()
    formData.append("file", file)
    //
    await axios
      .post(baseUrl, formData) //newFile
      .then((response) => {
        return response.data
      })
      .catch((error) => {
        alert(
          error //errors to alert, it should be edited
        )
      })
  }

  const handleFileChange = (event) => {
    <button onClick={() =>  navigator.clipboard.writeText('Copy this text to clipboard')}>
      Copy
    </button>
    setFile(event.target.files[0])
  }

  /////////////////////////////Integration tokens///////////////////////////////
  const dispatch = useDispatch()

  const integrationTokenName = useSelector((state)=> state.integration.integrationTokenName)
  const integrationTokenValue = useSelector((state)=> state.integration.integrationTokenValue)
  const allIntegrationTokens = useSelector((state)=> state.integration.allIntegrationTokens)
  const tll = useSelector((state)=> state.integration.ttl)
  dispatch(initializeIntegrationTokenTB())


  const handleSubmit = (event) => {
    event.preventDefault()
    const baseUrl = process.env.REACT_APP_BACKEND_URL + "api/create-token/"
  }

  const changeTokenName = (event) => {
    event.preventDefault()
    const value = event.target.value
    dispatch(updateintegrationTokenName(value))
    console.log(integrationTokenName)
  }
  const handleDelete = (event) => {
    event.preventDefault()
  }
  
  const timeToLive = [{ inSeconds: 86400, ttl: "One Day" }, { inSeconds:604800 , ttl: "One Week" }, { inSeconds: 2419200, ttl: "One Month" }, {inSeconds:29030400, ttl: "One Year"}]

  // FOR LATER USE A BUTTON TO COPY THE TOKEN TO CLIPBOARD
  //<button 
  //    onClick={() =>  navigator.clipboard.writeText('this is copied to clipboard')}
  //  >
  //   Copy
  //  </button>
  const tokenList = [{name: "testToken", creator: "testCreator", token:"hdsjkhfkjhfdkjahfjjoir2uu2e ", ttl: "1 year"},
{name: "testToken2", creator: "testCreator2", token:"hdsjkhfkjhfdkjahfjjoir2uu2e ", ttl: "1 month"},
{name: "testToken3", creator: "testCreator3", token:"hdsjkhfkjhfdkjahfjjoir2uu2e ", ttl: "1 week"}]
  const tokens = () => {
    let t = []
    tokenList?.map(
      (token) =>
        (t = t.concat([
          {
            name: token.name,
            creator: token.creator,
            token: token.token,
            ttl: token.ttl,
          },
        ]))
    )
    return t
  }
  return (
    <div>
      <h2>Integration tokens</h2>
    

      <div>
        Use the form below to create new integration tokens. Integration tokens
        have a ttl (time-to-live) of one day to one year. Please provide the
        ttl-value as an integer value.
      </div>

      <br />

      <div>
        <form onSubmit={handleSubmit}>
          <TextField
              
              onChange={changeTokenName}
              placeholder="Token Name"
              type="text"
              value={integrationTokenName}
              id="New Token Name"
            />
          <Autocomplete
            label="Time To Live"
            text="Time To Live"
            name="Time To Live"
            disablePortal
            id="New Token Time To Live"
            options={timeToLive.map((ttl) => ({
              id: ttl.inSeconds,
              label: ttl.ttl,
            }))}
            sx={{ width: 300 }}
            renderInput={(params) => (
              <TextField {...params} label="Time to live" />
            )}
            isOptionEqualToValue={(option, value) =>
              option.id === value.id
            }
            //onChange={(event, value) => {handleNewSkillChange(value)}}
          />
            <br />
            <Button type="submit" id="submit_new_skill_button">
              Add
            </Button>
        </form>
      </div>

      

      <h3>Active integration tokens</h3>
      <div>Here you can review and manage the active integration tokens</div>
      <br />
      <form onSubmit={handleDelete}>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>Token name</TableCell>
              <TableCell>Created by</TableCell>
              <TableCell>Token</TableCell>
              <TableCell>Valid until</TableCell>
            </TableRow>
          </TableHead>
          {tokens().map((token) => (
                  <TableBody key={token.name}>
                      <TableRow key={token.name}>
                        <Checkbox 
                          key = {token.name}
                          //onChange={handlePrefrenceChange}
                          name = {token.name}
                          id= {token.name}
                          
                        >
                        </Checkbox>
                        <TableCell>{token.name}</TableCell>
                        <TableCell>{token.creator} </TableCell>
                        <TableCell>{token.token}</TableCell>
                        <TableCell>{token.ttl}</TableCell>

                      </TableRow>
                  </TableBody>
                  ))}
          </Table>
      </TableContainer>
      <Button type="submit" id="delete">
                  Delete Selected
                </Button>
      </form>
      <div>
        <h3>Import certificates</h3>
        <input type="file" accept="*.csv" onChange={handleFileChange} />
        <Button
          variant="contained"
          component="label"
          size="small"
          id="import-certs-button"
          startIcon={<UploadIcon />}
          onClick={importCertificates}
        >
          Import Certificates
        </Button>
      </div>
      <br />
    </div>
  )
}

export default Api
