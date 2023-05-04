import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import { GoogleOAuthProvider } from "@react-oauth/google"
import { Provider } from "react-redux"
import store from "./Reducers/store"

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
        <App />
      </GoogleOAuthProvider>
    </Provider>
  </React.StrictMode>
)

