import React, { useState, useEffect } from "react"
import axios from "axios"

const App = () => {
  const [content, setContent] = useState([])
  const [newContent, setNewContent] = useState("a new note...")

  useEffect(() => {
    axios.get("/api/backend/").then((response) => {
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
      .post("/api/backend/", contentObject)
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
    <div>
      <p>Hello world</p>

      <ul>{result}</ul>
      <div>
        <form onSubmit={addContent}>
          <input value={newContent} onChange={handleContentChange} />
          <br />
          <input type="submit" value="OK" />
        </form>
      </div>
    </div>
  )
}

export default App
