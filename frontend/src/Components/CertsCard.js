import { 
  Card,
  CardHeader, 
  CardContent, 
  IconButton,
  Box,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableContainer,
  TableHead,
  Paper,
} from "@mui/material"
import EditIcon from '@mui/icons-material/Edit'
// import AddCircleIcon from '@mui/icons-material/AddCircle';
import consultantService from "../Services/consultantService"
import certService from "../Services/certificateService"
import { useSelector, useDispatch } from "react-redux"
import { updateEditability, 
        updateNewCertAddability, 
        setCertChanges,  
        setAddableCertDetail, 
        initializeCertCard, } from "../Reducers/certCardReducer"
import { useEffect, useState } from "react"


const CertsCard = ({ user, activeUserId }) => {
  const dispatch = useDispatch()
  const editable = useSelector((state) => state.certCard.editable)
  const newCertAddable = useSelector((state) => state.certCard.newCertAddable)
  const certChanges = useSelector((state) => state.certCard.certChanges) // This handles the changes in existing certs and existing preferences
  const addableCertDetail = useSelector((state) => state.certCard.addableCertDetail)
  const allCerts = useSelector((state) => state.certCard.allCerts)// used when allCert?.map() is used
  const [trigger, setTrigger] = useState(false)
  
  useEffect(() =>{
    const id = (activeUserId===user.id)? activeUserId : user.id
    dispatch(initializeCertCard(id))// fetch consultant from database and initialize/update certs
  }, [trigger])

  const handleClick = (edit) => {
    dispatch(updateEditability(!edit))
  }

  const handleAdd = (edit) => {
    dispatch(updateNewCertAddability(!edit))
  }

  const handleCertChange = (event) => {
    const value = event.target.value
    dispatch(setCertChanges([...certChanges, { certificate: [event.target.name][0], valid_until: value}]))
  }

  // const handlePrefrenceChange = (event) => {
  //   const value = event.target.checked
  //   console.log(event.target.id)
  //   dispatch(setCertChanges([...certChanges, { tech: [event.target.name][0],  tech_preference: value }]))
  // }

  const handleTechChange = (event) => {
    const value = event.target.value
    dispatch(setAddableCertDetail({...addableCertDetail, [event.target.name]: value}))
  }
  // This method now handles both, adding the new cert and updating the consultant afterwards.
  // That means that there is some reduntant repetition of code, feel free to refactor.

  // const handleNewCert = async (event) => {
  //   event.preventDefault()
  //   const newCertName = {tech_name: addableCertDetail.new_cert_name}
  //   const newCertLevel = addableCertDetail.new_cert_level
  //   let newObject = null
  //   let certsList = null
  //   newObject = await certService.createTech(newCertName)// new object contains the cert_name and id of the created cert 
  //   certsList = {certs:[{cert_level: newCertLevel, tech: newObject.result.id, tech_preference: true}]}
  //   consultantService.editConsultant(user.id, certsList)
  //   dispatch(updateNewCertAddability(!newCertAddable))
  //   dispatch(setAddableCertDetail())// This empties the state after it is not needed anymore
  //   //update certChanges
  //   const newCertChanges = [...certChanges, { cert_level: newCertLevel, tech: newObject.result.id }]
  //   dispatch(setCertChanges(newCertChanges))
  //   setTrigger(!trigger)
  // }

  const handleSubmit = (event) => {
    event.preventDefault()
    const certsList = { certs: certChanges }
    consultantService.editConsultant(user.id, certsList)
    dispatch(updateEditability(!editable))
    dispatch(setCertChanges([])) // This empties the state after it is not needed anymore
  }

  const certs = () => {
    let t = []
    allCerts?.map(
      (cert) =>
        (t = t.concat([
          {
            id: cert.cert,
            vendor: cert.vendor,
            certificate: cert.certificate,
            validUntil: cert.valid_until,
          },
        ]))
    )
    return t
  }

  return (
    <div>
      <Card>
        <CardHeader
          title="Certificates"
          action={(user.id === 1) && (    //activeUserId) && (
            <IconButton 
              id="editCertsButton"
              onClick={() => handleClick(editable)}
            >
              <EditIcon />
            </IconButton>
          )}
        />
        <CardContent> 
          {editable && (
            <form onSubmit={handleSubmit}>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Vendor</TableCell>
                    <TableCell>Certificate</TableCell>
                    <TableCell>Valid until</TableCell>
                  </TableRow>
                </TableHead>
                {certs().map((certificate) => (
                <TableBody>
                  <TableRow key={certificate.id}>
                    <TableCell>{certificate.vendor}</TableCell>
                    <TableCell>{certificate.certificate}</TableCell>
                    <TableCell>{certificate.validUntil}</TableCell>
                  </TableRow>
                </TableBody>
                ))}
              </Table>
            </TableContainer>
          </form>
          )}
          {!editable && (
            <form onSubmit={handleSubmit}>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Vendor</TableCell>
                    <TableCell>Certificate</TableCell>
                    <TableCell>Valid until</TableCell>
                  </TableRow>
                </TableHead>
                {certs().map((certificate) => (
                <TableBody>
                  <TableRow key={certificate.id}>
                    <TableCell>{certificate.vendor}</TableCell>
                    <TableCell>{certificate.certificate}</TableCell>
                    <TableCell>{certificate.validUntil}</TableCell>
                  </TableRow>
                </TableBody>
                ))}
              </Table>
            </TableContainer>
          </form>
          )}

          
        </CardContent>
      </Card>
    </div>
  )
}

export default CertsCard