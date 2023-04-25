import axios from "axios"

const baseUrl = process.env.REACT_APP_BACKEND_URL + "api/integration-tokens/"
const authHeader = (token) => ({
  headers: {
    "Content-Type": "application/json",
    Authorization: "Token token=" + token,
  },
})
const getAllTokens = () => {
  const APIToken = localStorage.getItem("APIToken")
  const request = axios.get(baseUrl, authHeader(APIToken))
  return request.then((response) => response.data)
}


const deleteToken =  (tokenID) => {
  const APIToken = localStorage.getItem("APIToken")
  const request = axios.delete(`${baseUrl}${tokenID}`, authHeader(APIToken))
  return request.then((response) => response.data)
}
const createToken =  async (newObject) => {///id
  const APIToken = localStorage.getItem("APIToken")
  const request = await axios.post(baseUrl, newObject, authHeader(APIToken))
  return request 
  //return request.then((response) => response.data.token)
}

export default {
  getAllTokens,
  deleteToken,
  createToken
}
