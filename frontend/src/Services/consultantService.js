import axios from "axios"

const baseUrl = process.env.REACT_APP_BACKEND_URL + "api/consultant/"

const getAllConsultants = () => {
  const request = axios.get(baseUrl)
  return request.then((response) => response.data)
}

const createConsultants = (newObject) => {
  const request = axios.post(baseUrl, newObject)
  return request.then((response) => response.data)
}

const getSelectedConsultant = (id) => {
  const request = axios.get(`${baseUrl}${id}/`)
  return request.then((response) => response.data)
}

export default {
  getAllConsultants,
  createConsultants,
  getSelectedConsultant,
}
