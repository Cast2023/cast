import axios from "axios"

const baseUrl = process.env.REACT_APP_BACKEND_URL + "api/consultant/"
const authHeader = (token) => ({
  headers: {
    "Content-Type": "application/json",
    Authorization: "Token " + token,
  },
})

const getAllConsultants = (APIToken) => {
  const request = axios.get(baseUrl, authHeader(APIToken))
  return request.then((response) => response.data)
}

const createConsultants = (newObject) => {
  const request = axios.post(baseUrl, newObject)
  return request.then((response) => response.data)
}

const getSelectedConsultant = (id, APIToken) => {
  const request = axios.get(`${baseUrl}${id}/`, authHeader(APIToken))
  return request.then((response) => response.data)
}

const getSelectedConsultantSkills = (id) => {
  const request = axios.get(`${baseUrl}${id}/`)
  return request.then((response) => response.data)
}

const editConsultant = (id, payload) => {
  console.log("editcons payload:", payload)
  const request = axios.patch(`${baseUrl}${id}/`, payload)
  console.log(request)
  return request.then((response) => response.data)
}

export default {
  getAllConsultants,
  createConsultants,
  getSelectedConsultant,
  editConsultant,
  getSelectedConsultantSkills,
}
