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
  IconButton,
  
 } from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete"
import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { initializeIntegrationTokenTB,
        updateintegrationTokenName,
        updateintegrationTokenTtl,
        updateintegrationTokenValue,} from "../Reducers/integrationReducer"
import integrationService from "../Services/integrationService"
import ClipboardButton from "./ClipboardButton"
import moment from "moment"

const Api = () => {
  const [trigger, setTrigger] = useState(false)
  const dispatch = useDispatch()

  const integrationTokenName = useSelector((state)=> state.integration.integrationTokenName)
  const integrationTokenValue = useSelector((state)=> state.integration.integrationTokenValue)
  const allIntegrationTokens = useSelector((state)=> state.integration.allIntegrationTokens)
  const ttl = useSelector((state)=> state.integration.ttl)

  useEffect(() => {//magic
    dispatch(initializeIntegrationTokenTB())
  }, [trigger])
    
  const currentUserId = useSelector((state) => state.session.activeUserId) 
  const handleSubmit = (event) => {
    event.preventDefault()

    const newObject = {
      "ttl": ttl,
      "token_name": integrationTokenName,
      "is_integration_token": true,
      "user": currentUserId,
    } 
    integrationService.createToken(newObject).then((response) => {
      
      dispatch(updateintegrationTokenValue(response.data.token))
    })
    setTrigger(!trigger)
  }

  const changeTokenName = (event) => {
    event.preventDefault()
    const value = event.target.value
    dispatch(updateintegrationTokenName(value))
  }

  const changeTokenTtl = (value) => {
    const ttl = value.id
    dispatch(updateintegrationTokenTtl(ttl))
  }
  const handleDelete = (event,id) => {
    event.preventDefault()
    const shouldDelete = window.confirm(
      "Delete this token? This action cannot be undone."
      );

    if (shouldDelete) {
        deleteToken(id);
    } 
}
  const deleteToken = (id) => {
    integrationService.deleteToken(id)
    setTrigger(!trigger)
  }

  const timeToLive = [{ inSeconds: 86400, ttl: "One Day" }, { inSeconds:604800 , ttl: "One Week" }, { inSeconds: 2419200, ttl: "One Month" }, {inSeconds:29030400, ttl: "One Year"}]

  const tokens = () => {
    let t = []
    allIntegrationTokens?.map(
      (token) =>
        (t = t.concat([
          {
            id: token.id,
            name: token.token_name,
            creator: token.email,
            token: token.token,
            ttl: moment(token.valid_until).toString(),
          },
        ]))
    )
    return t
  }
  return (
    <div>
      <h2>Integration tokens</h2>
    

      <div>
        Use the form below to create new integration tokens. Please give the token a name that describes the use case. 
        The token will be valid until the time to live expires or until you delete it.
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
              sx= {{ width: 300 }}
            />
          <Autocomplete
            placeholder="Time To Live"
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
            onChange={(event,value)=>{changeTokenTtl(value)}}
          />
            <br />
            <Button type="submit" id="generate new token button">
              Add
            </Button>

        </form>
      </div>
      
      {integrationTokenValue===null 
      ?<div></div> 
      :<div>
        Generated token:   {integrationTokenValue}
        <ClipboardButton integrationTokenValue = {integrationTokenValue}/>   
      </div>}
      
      

      <h3>Active integration tokens</h3>
      <div>Here you can review and manage the active integration tokens</div>
      <br />
      
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>                
                <TableCell>Token name</TableCell>
                <TableCell>Created by</TableCell>
                <TableCell>Token</TableCell>
                <TableCell>Valid until</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            {tokens().map((token) => (
                    <TableBody key={token.token}>
                        <TableRow key={token.token}>
                          
                          <TableCell>{token.name}</TableCell>
                          <TableCell>{token.creator} </TableCell>
                          <TableCell>{token.token} </TableCell>
                          <TableCell>{token.ttl}</TableCell>
                          <TableCell><ClipboardButton integrationTokenValue = {tokens().find((t) => t.id === token.id).token}/> 
                            <IconButton id={token.name} name="delete token button" onClick={(event) => {handleDelete(event, token.id)}}><DeleteIcon /></IconButton>
                            
                          </TableCell>
                        </TableRow>
                    </TableBody>
                    ))}
            </Table>
        </TableContainer>
        
      
      <br />
    </div>
  )
}

export default Api
