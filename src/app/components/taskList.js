"use client";
import React, { useEffect, useState } from "react";
import { useTaskContext } from "../context/context";
import axios from "axios";
import Grid from "@mui/material/Grid";
import TaskItem from "./taskItem";
import { Pagination } from "@mui/material";

function TaskList() {
  const { state, dispatch } = useTaskContext();
  const tasksUrl = process.env.NEXT_PUBLIC_JSON_SERVER_URL;

  useEffect(() => {
  
    axios
      .get(tasksUrl)
      .then((response) => {
        dispatch({ type: "GET_TASKS", payload: response.data });
      })
      .catch((err) => {
        console.log("Veriler alınırken bir hata oluştu:" + err.message);
      });
  }, [dispatch]);

  const handleDelete = (id) => {
    axios
      .delete(`${tasksUrl}/${id}`)
      .then((response) => {
        dispatch({ type: "DELETE_TASK", payload: id });
      })
      .catch((err) => {
        console.log("Silme işlemi sırasında bir hata oluştu:" + err.message);
      });
  };

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

  const indexOfLastTask = currentPage * itemsPerPage;
  const indexOfFirstTask = indexOfLastTask - itemsPerPage;
  const displayedTasks = state.tasks.slice(indexOfFirstTask, indexOfLastTask);

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <Grid
        container
        spacing={1}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {displayedTasks.map((task) => (
          <Grid item xs={6} md={8} key={task.id} >
            <TaskItem key={task.id} task={task} onDelete={handleDelete} />
          </Grid>
        ))}
      </Grid>
      <div style={{ position: 'fixed', bottom: '10px', left: '50%', transform: 'translateX(-50%)' }}>
    <Pagination
      count={Math.ceil(state.tasks.length / itemsPerPage)}
      page={currentPage}
      onChange={handlePageChange}
    />
  </div>
    </div>
  );
}

export default TaskList;
