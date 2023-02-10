import axios from "axios"
const baseUrl = "http://127.0.0.1:8000/api/consult/"

const getAllConsults = () => {
  const request = axios.get(baseUrl)
  return request.then((response) => response.data)
}

const createConsult = (newObject) => {
  const request = axios.post(baseUrl, newObject)
  return request.then((response) => response.data)
}

export default { getAllConsults, createConsult }
