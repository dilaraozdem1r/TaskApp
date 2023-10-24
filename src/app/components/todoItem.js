import React from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import styles from "../styles/TodoItem.module.css";
import DeleteIcon from "@mui/icons-material/Delete";


function TodoItem({ todo, onDelete }) {
  return (
    <div>
    <Paper elevation={3} className={styles.todoItem}>
      <Typography variant="h6">{todo.description}</Typography>
      <DeleteIcon onClick={() => onDelete(todo.id)} className={styles.deleteIcon} />
    </Paper>
    </div>
  );
}

export default TodoItem;
