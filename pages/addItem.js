"use client";
import React, { useState } from "react";
import { useTodoContext, TodoProvider } from "@/app/context/context";
import AddTodoItem from "@/app/components/addTodoItem";
import Navbar from "@/app/components/navbar";


function AddItemPage() {
  return (
    <TodoProvider>
      <div >
        <Navbar />
        <AddTodoItem />
      </div>
    </TodoProvider>
  );
}

export default AddItemPage;
