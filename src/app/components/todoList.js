"use client";

import React, { useEffect } from "react";
import { useTodoContext } from "../context/context";
import axios from "axios";
import Grid from "@mui/material/Grid";
import TodoItem from "./todoItem";
import AddTaskIcon from "@mui/icons-material/AddTask";


function TodoList() {
  const { state, dispatch } = useTodoContext();
  const todosUrl = process.env.NEXT_PUBLIC_JSON_SERVER_URL;

  useEffect(() => {
    console.log(todosUrl);
    axios
      .get(todosUrl)
      .then((response) => {
        dispatch({ type: "GET_TODOS", payload: response.data });
      })
      .catch((err) => {
        console.log("Veriler alınırken bir hata oluştu:" + err.message);
      });


  }, [dispatch]);

    const handleDelete = (id) => {
    axios
      .delete(`${todosUrl}/${id}`)
      .then((response) => {
        dispatch({ type: "DELETE_TODO", payload: id });
        
      })
      .catch((err) => {
        console.log("Silme işlemi sırasında bir hata oluştu:" + err.message);
      });
    };

  return (
   
    <Grid container spacing={1} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {state.todos.map((todo) => (
        <Grid item xs={6} md={8}>
          <TodoItem key={todo.id} todo={todo}  onDelete={handleDelete} />
        </Grid>
      ))}
    </Grid>

  
  );
}

export default TodoList;
