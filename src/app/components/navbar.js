"use client";
import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ListAltIcon from "@mui/icons-material/ListAlt";
import Link from "next/link";
import AddTaskIcon from "@mui/icons-material/AddTask";
import InsertChartIcon from '@mui/icons-material/InsertChart';
import HomeIcon from '@mui/icons-material/Home';

function Navbar() {


  return (
    <AppBar position="absolute" style={{ backgroundColor: "#090580"}}>
      <Toolbar>
        <ListAltIcon />
        <Typography variant="h6" style={{ marginRight: "15px" }}>
          TaskApp
        </Typography>
        <Link href="/">
          <Button ><HomeIcon/></Button>
        </Link>
        <Link href="/addItem">
          {" "}
          <Button> <AddTaskIcon/>Add Task</Button>
        </Link>

        <Link href="/taskStatistics">
          {" "}
          <Button> <InsertChartIcon/>Task Statistics</Button>
        </Link>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
