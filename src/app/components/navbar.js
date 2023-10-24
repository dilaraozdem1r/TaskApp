"use client";
import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ListAltIcon from "@mui/icons-material/ListAlt";
import Link from "next/link";

function Navbar() {


  return (
    <AppBar position="absolute" style={{ backgroundColor: "#090580"}}>
      <Toolbar>
        <ListAltIcon />
        <Typography variant="h6" style={{ marginRight: "15px" }}>
          TO_DO_APP
        </Typography>
        <Link href="/">
          <Button >Home Page</Button>
        </Link>

        <Link href="/addItem">
          {" "}
          <Button >Add Item</Button>
        </Link>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
