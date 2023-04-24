import moment from "moment"
import "moment/locale/en-gb"
import {
  Button,
  Card,
  CardHeader,
  CardContent,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableContainer,
  TableHead,
  Paper,
  Box,
  TextField,
} from "@mui/material"

import EditIcon from "@mui/icons-material/Edit"
import Autocomplete from "@mui/material/Autocomplete"
import AddCircleIcon from "@mui/icons-material/AddCircle"
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { DatePicker } from "@mui/x-date-pickers/DatePicker"
import { useSelector, useDispatch } from "react-redux"
import {
  updateEditability,
  setCertChanges,
  setNewVendorId,
  setNewCertificateName,
  setNewValidUntil,
  updateAddCState,
  initializeCertCard,
  addNewCert,
  editCertificates,
  setSelectedNewVendor,
  setSelectedNewCertificateID,
} from "../Reducers/certCardReducer"
import { useEffect, useState } from "react"

const CertsCard = ({ user, activeUserId }) => {
  const dispatch = useDispatch()
  const editable = useSelector((state) => state.certCard.editable)
  const allConsultantCerts = useSelector(
    (state) => state.certCard.allConsultantCerts
  ) // used when allCert?.map() is used
  const allCertificates = useSelector((state) => state.certCard.allCertificates)
  const vendors = useSelector((state) => state.certCard.vendors)
  const selectedNewVendor = useSelector(
    (state) => state.certCard.selectedNewVendor
  )
  const selectedNewCertificateID = useSelector(
    (state) => state.certCard.selectedNewCertificateID
  )
  const certChanges = useSelector((state) => state.certCard.certChanges) // This handles the changes in existing certs
  const addCertState = useSelector((state) => state.certCard.addCertActivated)
  const newValidUntil = useSelector((state) => state.certCard.newValidUntil)
  const [trigger, setTrigger] = useState(false)

  useEffect(() => {
    const id = activeUserId === user.id ? activeUserId : user.id
    dispatch(initializeCertCard(id)) // fetch consultant from database and initialize/update certs
  }, [trigger])

  const handleUpdateEditableClick = (edit) => {
    dispatch(updateEditability(!edit))
  }

  const handleCertChange = (event, certId) => {
    const date = moment(event).format("YYYY-MM-DD")
    date !== "Invalid Date" &&
      dispatch(
        setCertChanges([...certChanges, { cert: certId, valid_until: date }])
      )
  }

  const updateAddCertState = (addCertState) => {
    dispatch(updateAddCState(!addCertState))
  }

  const handleAddNewCert = (event) => {
    event.preventDefault()
    const newEmployeeCert = {
      id: user.id,
      certificates: [
        {
          cert: selectedNewCertificateID,
          valid_until: newValidUntil,
        },
      ],
    }
    dispatch(addNewCert(newEmployeeCert))
    setTrigger(!trigger)
    dispatch(setNewVendorId(null))
    dispatch(setSelectedNewVendor(null))
    dispatch(setNewCertificateName(null))
    dispatch(setSelectedNewCertificateID(null))
    dispatch(setNewValidUntil(null))
  }

  const handleSubmitEditedCertificates = (event) => {
    event.preventDefault()
    const editedCertificates = { id: user.id, certificates: certChanges }
    dispatch(editCertificates(editedCertificates))
  }

  const handleNewVendorChange = (value) => {
    dispatch(setSelectedNewVendor(value))
    dispatch(setSelectedNewCertificateID(""))
  }

  const handleNewCertificateChange = (value) => {
    dispatch(setSelectedNewCertificateID(value))
  }

  const handleNewValidUntilChange = (value) => {
    dispatch(setNewValidUntil(moment(value).format("YYYY-MM-DD")))
  }

  const certificateList = () => {
    let certlist = []

    !allConsultantCerts.id &&
      allConsultantCerts?.map(
        (cert) =>
          (certlist = certlist.concat([
            {
              id: cert.cert,
              vendor: cert.vendor,
              certificate: cert.certificate,
              validUntil: cert.valid_until,
            },
          ]))
      )
    return certlist
  }

  return (
    <div>
      <Card>
        <CardHeader
          title="Certificates"
          action={
            user.id === activeUserId && (
              <Box>
                <IconButton
                  id="add_cert_button"
                  onClick={() => updateAddCertState(addCertState)}
                >
                  <AddCircleIcon />
                </IconButton>
                <IconButton
                  id="editCertsButton"
                  onClick={() => handleUpdateEditableClick(editable)}
                >
                  <EditIcon />
                </IconButton>
              </Box>
            )
          }
        />
        <CardContent>
          <Box sx={{ "& .MuiTextField-root": { m: 1, width: "25ch" } }}>
            {addCertState && (
              <form onSubmit={handleAddNewCert}>
                <Box>
                  <Autocomplete
                    label="Choose vendor"
                    text="Choose vendor"
                    name="vendor"
                    disablePortal
                    disableClearable
                    id="vendor-box"
                    options={Object.values(vendors).map((vendor) => ({
                      id: vendor,
                      label: vendor,
                    }))}
                    sx={{ width: 300 }}
                    renderInput={(params) => (
                      <TextField {...params} label="Select vendor" />
                    )}
                    isOptionEqualToValue={(option, value) =>
                      option.id === value.id
                    }
                    onChange={(event, newValue) => {
                      handleNewVendorChange(newValue.label)
                    }}
                  />
                </Box>
                <Box>
                  <Autocomplete
                    key="testi"
                    label="Choose certificate"
                    text="Choose certificate"
                    name="certificate"
                    disablePortal
                    disableClearable
                    id="certs-box"
                    options={allCertificates
                      .filter(
                        (certificate) =>
                          certificate.vendor === selectedNewVendor
                      )
                      .map((cert) => ({
                        id: cert.id,
                        label: cert.certificate_name,
                      }))}
                    sx={{ width: 300 }}
                    renderInput={(params) => (
                      <TextField {...params} label="Select certificate" />
                    )}
                    isOptionEqualToValue={(option, value) =>
                      option.id === value.id
                    }
                    onChange={(event, newValue) => {
                      handleNewCertificateChange(newValue.id)
                    }}
                  />
                </Box>
                <Box>
                  <LocalizationProvider
                    dateAdapter={AdapterMoment}
                    adapterLocale={moment.locale("en-gb")}
                  >
                    <DatePicker
                      label="Certificate valid until date"
                      format="YYYY-MM-DD"
                      onChange={(newValue) =>
                        handleNewValidUntilChange(newValue)
                      }
                      slotProps={{
                        textField: {
                          id: "certValidUntil",
                          required: true,
                        },
                      }}
                    />
                  </LocalizationProvider>
                </Box>
                <Button type="submit" id="add_new_cert_button">
                  Add
                </Button>
              </form>
            )}
          </Box>

          <Box
            sx={{
              "& .MuiTextField-root": { m: 1, width: "25ch" },
            }}
          >
            <form onSubmit={handleSubmitEditedCertificates}>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Vendor</TableCell>
                      <TableCell>Certificate</TableCell>
                      <TableCell>Valid until</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {certificateList().map((certificate) => (
                      <TableRow key={certificate.id}>
                        <TableCell>{certificate.vendor}</TableCell>
                        <TableCell>{certificate.certificate}</TableCell>
                        {!editable && (
                          <TableCell>{certificate.validUntil}</TableCell>
                        )}
                        {editable && (
                          <TableCell id={certificate.id}>
                            <LocalizationProvider
                              dateAdapter={AdapterMoment}
                              adapterLocale={moment.locale("en-gb")}
                            >
                              <DatePicker
                                onChange={(event) => {
                                  handleCertChange(event, certificate.id)
                                }}
                                format="YYYY-MM-DD"
                                slotProps={{
                                  textField: {
                                    id: "cert" + certificate.id,
                                    placeholder: certificate.validUntil,
                                  },
                                }}
                              />
                            </LocalizationProvider>
                          </TableCell>
                        )}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              {editable && (
                <Button type="submit" id="submitCertsButton">
                  Submit
                </Button>
              )}
            </form>
          </Box>
        </CardContent>
      </Card>
    </div>
  )
}

export default CertsCard
