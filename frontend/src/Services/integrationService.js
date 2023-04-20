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


const deleteToken =  (id) => {
  const APIToken = localStorage.getItem("APIToken")
  const request = axios.post(`${baseUrl}${id}`, authHeader(APIToken))
  return request.then((response) => response.data)
}
const createToken =  (newObject) => {///id
  const APIToken = localStorage.getItem("APIToken")
  const request = axios.post(baseUrl, newObject, authHeader(APIToken))
  return request.then((response) => response.data)
}

export default {
  getAllTokens,
  deleteToken,
  createToken,
}
