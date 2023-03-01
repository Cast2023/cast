import axios from "axios"

const baseUrl = process.env.REACT_APP_BACKEND_URL + "api/tech/"

const getAllTechs = () => {
  const request = axios.get(baseUrl)
  return request.then((response) => response.data)
}

const createTech = (newObject) => {
  const request = axios.post(baseUrl, newObject)
  return request.then((response) => response.data)
}

const getSelectedTech = (id) => {
  const request = axios.get(`${baseUrl}${id}/`)
  return request.then((response) => response.data)
}

//const editTech = (id, payload) => {
//    //Todo if we need it
//}

export default {
  getAllTechs,
  createTech,
  getSelectedTech,
//  editConsultant,
}
