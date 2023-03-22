import axios from "axios"

const baseUrl = process.env.REACT_APP_BACKEND_URL + "api/projects/"

const getAllProjects = () => {
  const request = axios.get(baseUrl)
  return request.then((response) => response.data)
}

export default {
  getAllProjects,
}
