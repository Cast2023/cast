import { TextField, Button, Grid } from "@mui/material"

const NewNoteForm = ({ submitContent, newContent, handleContentChange }) => (
  <Grid container>
    <form onSubmit={submitContent}>
      <Grid item>
        <TextField value={newContent} onChange={handleContentChange} />
      </Grid>
      <Grid item alignItems="stretch" style={{ display: "flex" }}>
        <Button
          variant="contained"
          color="primary"
          type="submit"
          value="Submit"
        >
          Submit
        </Button>
      </Grid>
    </form>
  </Grid>
)

export default NewNoteForm
