import { useState } from "react";
import { IconButton, Snackbar, Tooltip } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

const ClipboardButton = ({integrationTokenValue}) => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
    navigator.clipboard.writeText(integrationTokenValue)
  };

  return (
    <>
      <Tooltip title="Copy to clipboard" arrow>
        <IconButton name="copy to clipboard button" onClick={handleClick} color="primary">
          <ContentCopyIcon />
        </IconButton>
      </Tooltip>
      <Snackbar
        message="Copied to clibboard"
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        autoHideDuration={2000}
        onClose={() => setOpen(false)}
        open={open}
      />
    </>
  );
};

export default ClipboardButton;