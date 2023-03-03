import { Button } from "@mui/material"
import UploadIcon from '@mui/icons-material/Upload'
import DownloadIcon from '@mui/icons-material/Download'

 
const Api = () => {

  return (
    <div>
      <h2>API</h2>
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
          id="import-certs-button" 
          startIcon={<UploadIcon />}
        >
          Import Certificates
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
  