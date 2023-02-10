import axios from "axios"

const SuccessCallback = ({ credentialResponse }) => {
  //   console.log(credentialResponse.credential)

  const result = axios.get(process.env.REACT_APP_BACKEND_URL, {
    headers: {
      "Content-Type": "application/json",
      Authorization: JSON.stringify(credentialResponse.credential),
    },
  })
  return result
}

export default SuccessCallback
