import axios from "axios"

const baseUrl = process.env.REACT_APP_BACKEND_URL + "api/certificates/"
const authHeader = (token) => ({
  headers: {
    "Content-Type": "application/json",
    Authorization: "Token token=" + token,
  },
})
const getAllCertificates = () => {
  const APIToken = localStorage.getItem("APIToken")
  const request = axios.get(baseUrl, authHeader(APIToken))
  return request.then((response) => response.data)
}

export default { getAllCertificates }
