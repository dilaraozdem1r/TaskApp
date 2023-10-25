import React from "react";
import Header from "./components/header";
import { TaskProvider } from "./context/context";
import TaskList from "./components/taskList";
import Navbar from "./components/navbar";

export default function Home({}) {
  return (
    <TaskProvider>
      <div style={{ height: "100vh" }}>
        <Navbar />
        <Header />
        <main>
          <TaskList />
        </main>
      </div>
    </TaskProvider>
  );
}
