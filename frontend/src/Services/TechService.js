import axios from "axios"
const baseUrl = "http://127.0.0.1:8000/api/techname/"

const getAllTechs = () => {
  const request = axios.get(baseUrl)
  return request.then((response) => response.data)
}

const createTech = (newObject) => {
  const request = axios.post(baseUrl, newObject)
  return request.then((response) => response.data)
}

export default { getAllTechs, createTech }
