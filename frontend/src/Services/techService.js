import axios from "axios"


const baseUrl = process.env.REACT_APP_BACKEND_URL + "api/tech/"

const authHeader = (token) => ({
  headers: {
    "Content-Type": "application/json",
    Authorization: "Token token=" + token,
  },
})

const getAllTechs = () => {
  const APIToken = localStorage.getItem("APIToken")
  const request = axios.get(baseUrl, authHeader(APIToken))
  return request.then((response) => response.data)
}

const createTech = async (newObject) => {
  const APIToken = localStorage.getItem("APIToken")
  const request = await axios.post(baseUrl, newObject, authHeader(APIToken))
  return request.data
}

const getSelectedTech =  (id) => {
  const APIToken = localStorage.getItem("APIToken")
  const request = axios.get(`${baseUrl}${id}/`, authHeader(APIToken))
  return request.then((response) => response.data)
}

const getSelectedTechByName =  (name) => {
  const APIToken = localStorage.getItem("APIToken")
  const request = axios.get(`${baseUrl}?tech_name=${name}`, authHeader(APIToken))
  return request.then((response) => response.data)
}


export default {
  getAllTechs,
  createTech,
  getSelectedTech,
  getSelectedTechByName,
}