import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
} from "@mui/material"
import NewNoteForm from "./NoteForm"

const Notes = ({ notes, submitContent, newContent, handleContentChange }) => (
  <div>
    <h2>Notes</h2>

    <TableContainer component={Paper}>
      <Table>
        <TableBody>
          {notes.map((note) => (
            <TableRow key={note.id}>
              <TableCell>{note.content}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <br />
    <NewNoteForm
      submitContent={submitContent}
      newContent={newContent}
      handleContentChange={handleContentChange}
    />
  </div>
)

export default Notes
