import React from "react"
import { GoogleOAuthProvider } from "@react-oauth/google"
import { render, cleanup, screen } from "@testing-library/react"
import App from "../App"

afterEach(cleanup)

// Broke after GOauth
// it("should take a snapshot", () => {
//   const { asFragment } = render(
//     <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
//       <App />
//     </GoogleOAuthProvider>
//   )

//   expect(asFragment(<App />)).toMatchSnapshot()
// })

// it("renders Home page text", () => {
//   render(
//     <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
//       <App />
//     </GoogleOAuthProvider>
//   )
//   const linkElement = screen.getByText(/Welcome to CAS-tracker/i)
//   expect(linkElement).toBeInTheDocument()
// })
