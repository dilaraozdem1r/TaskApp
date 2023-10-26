import React from "react";
import { TaskProvider } from "@/app/context/context";
import Navbar from "@/app/components/navbar";
import TaskChart from "@/app/components/taskChart";
import Head from "next/head";

export default function taskStatistics() {
  return (
    <TaskProvider>
      <div style={{ height: "100vh" }}>
        <Head>
          <title>Task App</title>
        </Head>
        <Navbar />
        <TaskChart />
      </div>
    </TaskProvider>
  );
}
