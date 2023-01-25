import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
} from "@mui/material"
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"
import React, { useState, useEffect } from "react"
import axios from "axios"

const Notes = ({ notes }) => (
  <div>
    <h2>Notes</h2>

    <TableContainer component={Paper}>
      <Table>
        <TableBody>
          {notes.map((note) => (
            <TableRow key={note.id}>
              <TableCell>
                <Link to={`/notes/${note.id}`}>{note.content}</Link>
              </TableCell>
              <TableCell>{note.name}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </div>
)

const App = () => {
  const [content, setContent] = useState([])
  const [newContent, setNewContent] = useState("a new note...")

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/backend ").then((response) => {
      setContent(response.data)
    })
  }, [])

  const result = content.map((item) => <li> {item.content} </li>)

  const addContent = (event) => {
    event.preventDefault()
    const contentObject = {
      content: newContent,
    }

    axios
      .post("http://127.0.0.1:8000/api/backend ", contentObject)
      .then((response) => {
        console.log("LOGGING: ", response)
      })
      .catch((error) => {
        console.log(error, contentObject)
      })
    const addContentObject = {
      content: newContent,
      id: content.length + 1,
    }

    setContent(content.concat(addContentObject))
    setNewContent("")
  }
  const handleContentChange = (event) => {
    setNewContent(event.target.value)
  }

  return (
    <Container>
      <div>
        <p>Hello world</p>

        <Notes notes={result} />
        <div>
          <form onSubmit={addContent}>
            <input value={newContent} onChange={handleContentChange} />
            <br />
            <input type="submit" value="OK" />
          </form>
        </div>
      </div>
    </Container>
  )
}

export default App
