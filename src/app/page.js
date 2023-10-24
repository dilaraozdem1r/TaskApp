import React from "react";
import Header from "./components/header";
import { TodoProvider } from "./context/context";
import TodoList from "./components/todoList";
import Navbar from "./components/navbar";
export default function Home({  }) {
  return (
    <TodoProvider>
    <div style={{ height: "100vh" }}>
    <Navbar />
      <Header />
      <TodoList />
    </div>
    </TodoProvider>
  );
}
