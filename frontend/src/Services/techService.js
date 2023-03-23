import axios from "axios"

const baseUrl = process.env.REACT_APP_BACKEND_URL + "api/tech/"

const getAllTechs = () => {
  const request = axios.get(baseUrl)
  return request.then((response) => response.data)
}

const createTech = async (newObject) => {
  const request = await axios.post(baseUrl, newObject)
  
  //console.log("req", request.data) 
  return request.data
}

const getSelectedTech =  (id) => {
  const request = axios.get(`${baseUrl}${id}/`)
  return request.then((response) => response.data)
}
const getSelectedTechByName =  (name) => {
  const request = axios.get(`${baseUrl}?tech_name=${name}`)
  return request.then((response) => response.data)
}
//const editTech = (id, payload) => {
//    //Todo if we need it
//}

export default {
  getAllTechs,
  createTech,
  getSelectedTech,
  getSelectedTechByName,
//  editConsultant,
}