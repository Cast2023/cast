import React from "react"
import { render, cleanup, screen } from "@testing-library/react"
import App from "../App"

afterEach(cleanup)

it("should take a snapshot", () => {
  const { asFragment } = render(<App />)

  expect(asFragment(<App />)).toMatchSnapshot()
})

it("renders learn react link", () => {
  render(<App />)
  const linkElement = screen.getByText(/Home page/i)
  expect(linkElement).toBeInTheDocument()
})
