import axios from "axios"

const successCallback = (response) => {
  
  axios.get(process.env.REACT_APP_BACKEND_URL, {
    headers: {
      "Content-Type": "application/json",
      Authorization: JSON.stringify(response.credential),
    },
  })
}

export default successCallback
