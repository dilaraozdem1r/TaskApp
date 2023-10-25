import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Checkbox from "@mui/material/Checkbox";
import styles from "../styles/TodoItem.module.css";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from '@mui/icons-material/Edit';
import Link from "next/link";
import axios from "axios";

function TodoItem({ todo, onDelete }) {
  const todosUrl = process.env.NEXT_PUBLIC_JSON_SERVER_URL;
  const [isChecked, setIsChecked] = useState(todo.isCompleted);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
    axios.put(`${todosUrl}/${todo.id}`, { ...todo,isCompleted: !isChecked })
  }

  return (
    <div>
      <Paper elevation={3} className={styles.todoItem}>
        <Link href={`/editPage/${todo.id}`} className={styles.editIcon}><EditIcon/></Link>
        <Checkbox
        className={styles.checkboxIcon}
          checked={isChecked}
          onChange={handleCheckboxChange}
        />
        <Typography
          variant="h6"
          style={{ textDecoration: isChecked ? "line-through" : "none" }}
        >
          {todo.description}
        </Typography>
        <DeleteIcon onClick={() => onDelete(todo.id)} className={styles.deleteIcon} />
      </Paper>
    </div>
  );
}

export default TodoItem;
