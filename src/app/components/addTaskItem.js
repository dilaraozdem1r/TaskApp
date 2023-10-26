"use client";
import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import AddTaskIcon from "@mui/icons-material/AddTask";
import Grid from "@mui/material/Grid";
import { useTaskContext, TaskProvider } from "@/app/context/context";
import axios from "axios";
import styles from "../styles/Common.module.css";
import { useRouter } from "next/router";

function addTaskItem() {
  const { state, dispatch } = useTaskContext();
  const tasksUrl = process.env.NEXT_PUBLIC_JSON_SERVER_URL;
  const router = useRouter();

  const [taskData, setTaskData] = useState({
    subject: "",
    description: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTaskData({
      ...taskData,
      [name]: value,
    });
  };

  const handleSave = () => {
    const data = {
      subject: taskData.subject,
      description: taskData.description,
      isCompleted: false,
      createdOn: new Date().toISOString(),
    };

    axios
      .post(tasksUrl, data)
      .then((response) => {
        dispatch({ type: "ADD_TASK", payload: response.data });
        setTaskData({
          subject: "",
          description: "",
        });
      })
      .catch((err) => {
        console.log("Veri eklenirken bir hata oluştu:" + err.message);
      });

    router.push("/");
  };

  return (
    <TaskProvider>
      <div className={styles.container}>
        <main style={{ marginTop: "10rem" }}>
          <Typography variant="h3">
            {" "}
            <AddTaskIcon sx={{ fontSize: 40 }} /> Add Task Item
          </Typography>
          <form style={{ marginTop: "2rem" }} className={styles.form}>
            <Typography color="#FF5722">Please choose a subject</Typography>
            <RadioGroup
              name="subject"
              value={taskData.subject}
              onChange={handleInputChange}
            >
              <Grid container spacing={1}>
                {state.subjects.map((subject) => (
                  <Grid item key={subject}>
                    <FormControlLabel
                      value={subject}
                      control={<Radio />}
                      label={subject}
                    />
                  </Grid>
                ))}
              </Grid>
            </RadioGroup>
            <br />
            <TextField
              name="description"
              label="Description"
              variant="outlined"
              multiline
              rows={3}
              fullWidth
              value={taskData.description}
              onChange={handleInputChange}
            />
          </form>
          <Button
            className={styles.button}
            variant="contained"
            onClick={handleSave}
            disabled={!taskData.subject || !taskData.description}
          >
            Add task
          </Button>
        </main>
      </div>
    </TaskProvider>
  );
}

export default addTaskItem;
