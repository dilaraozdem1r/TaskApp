"use client";
import React, { useEffect, useState } from "react";
import { useTodoContext } from "../context/context";
import axios from "axios";
import Grid from "@mui/material/Grid";
import TodoItem from "./todoItem";
import { Pagination } from "@mui/material";
import Stack from "@mui/material/Stack";

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

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const indexOfLastTodo = currentPage * itemsPerPage;
  const indexOfFirstTodo = indexOfLastTodo - itemsPerPage;
  const displayedTodos = state.todos.slice(indexOfFirstTodo, indexOfLastTodo);

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
        {displayedTodos.map((todo) => (
          <Grid item xs={6} md={8}>
            <TodoItem key={todo.id} todo={todo} onDelete={handleDelete} />
          </Grid>
        ))}
      </Grid>
      <div style={{ position: 'fixed', bottom: '10px', left: '50%', transform: 'translateX(-50%)' }}>
    <Pagination
      count={Math.ceil(state.todos.length / itemsPerPage)}
      page={currentPage}
      onChange={handlePageChange}
    />
  </div>
    </div>
  );
}

export default TodoList;
