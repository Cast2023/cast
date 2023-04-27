import axios from "axios"

const baseUrl = process.env.REACT_APP_BACKEND_URL + "api/consultant/"
const authHeader = (token) => ({
  headers: {
    "Content-Type": "application/json",
    Authorization: "Token token=" + token, 
    
  },
})

const getAllConsultants = () => {
   
  const APIToken = localStorage.getItem("APIToken")
  
  const request = axios.get(baseUrl, authHeader(APIToken))
  
  return request.then((response) => response.data)
}

const getSelectedConsultant = (id) => {
  const APIToken = localStorage.getItem("APIToken")
  const request = axios.get(`${baseUrl}${id}/`, authHeader(APIToken))
  return request.then((response) => response.data)
}

const editConsultant = (id, payload) => {
  const APIToken = localStorage.getItem("APIToken")
  const request = axios.patch(`${baseUrl}${id}/`, payload, authHeader(APIToken))
  return request.then((response) => response.data)
}
const exports = { getAllConsultants, getSelectedConsultant, editConsultant }
export default exports
