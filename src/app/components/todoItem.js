"use client"
import React from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import styles from "../styles/TodoItem.module.css";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from '@mui/icons-material/Edit';
import Link from "next/link";

function TodoItem({ todo, onDelete }) {

  
  return (
    <div>
    <Paper elevation={3} className={styles.todoItem}>
    <Link href={`/editPage/${todo.id}`} className={styles.editIcon}><EditIcon/></Link> 
      <Typography variant="h6"> {todo.description}</Typography>
      <DeleteIcon onClick={() => onDelete(todo.id)} className={styles.deleteIcon} />
    </Paper>
    </div>
  );
}

export default TodoItem;
