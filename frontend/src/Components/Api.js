import { Button } from "@mui/material"
import UploadIcon from "@mui/icons-material/Upload"
import DownloadIcon from "@mui/icons-material/Download"
import axios from "axios"
import { useState } from "react"

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
    setFile(event.target.files[0])
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

      <div>FORM HERE</div>

      <br />

      <h3>Active integration tokens</h3>
      <div>Here you can review and manage the active integration tokens</div>
      <br />

      <div>TABLE HERE</div>

      <div>
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
