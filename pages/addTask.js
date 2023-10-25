"use client";
import React from "react";
import { TaskProvider } from "@/app/context/context";
import AddTaskItem from "@/app/components/addTaskItem";
import Navbar from "@/app/components/navbar";
import Head from "next/head";


function AddItemPage() {
  return (
    <TaskProvider>
      <Navbar />
      <Head>
          <title>Task App</title>
        </Head>
      <div style={{ height: "100vh" }} >
        <AddTaskItem />
      </div>
    </TaskProvider>
  );
}

export default AddItemPage;
