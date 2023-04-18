import axios from "axios"

const baseUrl = process.env.REACT_APP_BACKEND_URL + "api/consultant/"
const authHeader = (token) => ({
  headers: {
    "Content-Type": "application/json",
    Authorization: "Token token=" + token, //JSON.stringify(token)//
    //if every user has same rights, then the user_id is not needed.
    //different user_id's different right to access different data is not handled in backend yet.
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
  console.log("editcons payload:", payload)
  const request = axios.patch(`${baseUrl}${id}/`, payload, authHeader(APIToken))
  console.log(request)
  return request.then((response) => response.data)
}

export default {
  getAllConsultants,
  getSelectedConsultant,
  editConsultant,
}
