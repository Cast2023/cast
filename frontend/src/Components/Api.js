import { Button } from "@mui/material"
import UploadIcon from '@mui/icons-material/Upload'
import DownloadIcon from '@mui/icons-material/Download'
import axios from "axios"
import { useState } from "react"



const Api = () => {
  const [file, setFile] = useState(null);

  const importCertificates = async () => {
    const baseUrl = process.env.REACT_APP_BACKEND_URL + "api/import-certificates/"
    const formData = new FormData()
    formData.append('file', file)
    console.log(formData)
    await axios.post(baseUrl, formData)//newFile
    .then(response=>{
      return response.data
    })
    .catch(error => {
      alert(
        error//errors to alert, it should be edited
        
      )
    })
  }

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  return (
    <div>
      <h2>API</h2>

      <div>
        <input 
            type="file" 
            accept="*.csv" 
            onChange={handleFileChange} 
        />
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

      <div>

        <Button 
          variant="contained" 
          component="label" 
          size="small" 
          id="import-consultants-button" 
          startIcon={<UploadIcon />}
          
        >
          Import Consultants
          <input 
            type="file" 
            accept="*.csv" 
            hidden
          />
        </Button> &nbsp;
      </div>
      <br />
      
      <div>
        <Button 
          variant="contained" 
          component="label" 
          size="small" 
          id="import-projects-button" 
          startIcon={<UploadIcon />}
        >
          Import Projects
          <input 
            type="file" 
            accept="*.csv" 
            hidden
          />
        </Button>
      </div>

      <br />

      <div>
        <Button 
          variant="contained" 
          size="small" 
          id="export-consultants-button" 
          startIcon={<DownloadIcon />}
        >
          Export Consultants
        </Button>
      </div>
      <br />
      <div>
        <Button 
          variant="contained" 
          size="small" 
          id="export-certs-button" 
          startIcon={<DownloadIcon />}
        >
          Export Certificates
        </Button>
      </div>
      <br />
      <div>
        <Button 
          variant="contained" 
          size="small" 
          id="export-projects-button" 
          startIcon={<DownloadIcon />}
        >
          Export Projects
        </Button>
      </div>
    </div>
  )
}
  

export default Api
  