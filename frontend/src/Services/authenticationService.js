import axios from "axios"

const successCallback = async ({ credentialResponse }) => {
  const baseUrl = process.env.REACT_APP_BACKEND_URL + "api/verify-google-token/"
  
  const result = await axios.get(baseUrl, {
    headers: {
      "Content-Type": "application/json",
      Authorization: JSON.stringify(credentialResponse.credential),
    },
  })
  return result
}

const verifyToken = async (token) => {
  const baseUrl = process.env.REACT_APP_BACKEND_URL + "api/verify-google-token/"
  
  const result = await axios.get(baseUrl, {
    headers: {
      "Content-Type": "application/json",
      Authorization: JSON.stringify(token),
    },
  })
  return result
}

export default {successCallback, verifyToken}
