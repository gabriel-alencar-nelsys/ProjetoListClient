import React from "react";
import EditIcon from "@mui/icons-material/Edit";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

export const EditIconButton = ({ onClick }) => {
  return (
    <>
      <IconButton 
      sx={{color:'white'}}
      onClick={onClick} size="small">
        <EditIcon />
      </IconButton>
      <IconButton
        onClick={onClick}
        size="small"
        data-testid="DeleteIconButton"
        sx={{ color: "red" }}
      >
        <DeleteIcon />
      </IconButton>
    </>
  );
};
