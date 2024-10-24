import React from "react";
import EditIcon from "@mui/icons-material/Edit";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

export const EditIconButton = ({ onEdit, onDelete }) => {
  return (
    <>
      <IconButton
        sx={{ color: "white" }}
        onClick={onEdit} 
        size="small"
      >
        <EditIcon />
      </IconButton>
      <IconButton
        onClick={onDelete} 
        size="small"
        data-testid="DeleteIconButton"
        sx={{ color: "red" }}
      >
        <DeleteIcon />
      </IconButton>
    </>
  );
};
