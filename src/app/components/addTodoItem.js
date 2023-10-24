"use client";
import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import Navbar from "@/app/components/navbar";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import AddTaskIcon from "@mui/icons-material/AddTask";
import Grid from "@mui/material/Grid";
import { useTodoContext, TodoProvider } from "@/app/context/context";
import axios from "axios";
import styles from "../styles/AddTodoItem.module.css";
import { useRouter } from "next/router";

export default function addTodoItem() {
  const { state, dispatch } = useTodoContext();
  const todosUrl = process.env.NEXT_PUBLIC_JSON_SERVER_URL;
  const router = useRouter();

  const [todoData, setTodoData] = useState({
    subject: "",
    description: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTodoData({
      ...todoData,
      [name]: value,
    });
  };

  const handleSave = () => {
    const data = {
      subject: todoData.subject,
      description: todoData.description,
      isCompleted: false,
    };

    axios
      .post(todosUrl, data)
      .then((response) => {
        dispatch({ type: "ADD_TODO", payload: response.data });

        setTodoData({
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
    <TodoProvider>
      <div className={styles.container}>
        <Navbar />
        <main style={{ marginTop: "10rem" }}>
          <Typography variant="h3">
            {" "}
            <AddTaskIcon sx={{ fontSize: 40 }} /> Add To Do Item
          </Typography>
          <form style={{ marginTop: "2rem" }}>
            <Typography color="#FF5722">Please choose a subject</Typography>
            <RadioGroup
              name="subject"
              value={todoData.subject}
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
              value={todoData.description}
              onChange={handleInputChange}
            />
          </form>
          <Button
            className={styles.button}
            variant="contained"
            onClick={handleSave}
            disabled={!todoData.subject || !todoData.description}
          >
            Add to do
          </Button>
        </main>
      </div>
    </TodoProvider>
  );
}
