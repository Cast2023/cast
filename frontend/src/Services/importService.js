import axios from "axios"

const importCertificates = async (event) => {
  const file = event.target.files[0]
  const baseUrl = process.env.REACT_APP_BACKEND_URL + "api/import-certificates/"
  const formData = new FormData()
  formData.append("file", file)

  const result = await axios
    .post(baseUrl, formData) //newFile
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      alert(
        "error",
        error //errors to alert, it should be edited
      )
    })
}
const exports = { importCertificates }
export default exports
