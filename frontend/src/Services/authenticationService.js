import axios from "axios"

const SuccessCallback = ({ credentialResponse }) => {
  const baseUrl = process.env.REACT_APP_BACKEND_URL + "api/verify-google-token/"

  const result = axios.get(baseUrl, {
    headers: {
      "Content-Type": "application/json",
      Authorization: JSON.stringify(credentialResponse.credential),
    },
  })
  return result
}

export default SuccessCallback
