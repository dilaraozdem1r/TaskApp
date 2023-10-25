import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Checkbox from "@mui/material/Checkbox";
import styles from "../styles/TaskItem.module.css";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from '@mui/icons-material/Edit';
import Link from "next/link";
import axios from "axios";

function TaskItem({ task, onDelete }) {
  const tasksUrl = process.env.NEXT_PUBLIC_JSON_SERVER_URL;
  const [isChecked, setIsChecked] = useState(task.isCompleted);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
    axios.put(`${tasksUrl}/${task.id}`, { ...task,isCompleted: !isChecked })
  }

  return (
    <div>
      <Paper elevation={3} className={styles.taskItem} style={{ height: '40px' }}>
        <Link href={`/editPage/${task.id}`} className={styles.editIcon}><EditIcon/></Link>
        <Checkbox
        className={styles.checkboxIcon}
          checked={isChecked}
          onChange={handleCheckboxChange}
        />
        <Typography
          variant="h8"
          style={{ textDecoration: isChecked ? "line-through" : "none" }}
        >
          {task.description}
        </Typography>
        <DeleteIcon onClick={() => onDelete(task.id)} className={styles.deleteIcon} />
      </Paper>
    </div>
  );
}

export default TaskItem;
