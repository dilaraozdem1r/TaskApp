"use client";
import React, { useState, useEffect } from "react";
import Navbar from "@/app/components/navbar";
import axios from "axios";
import { useRouter } from "next/router";
import { Typography, TextField, Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import styles from "@/app/styles/Common.module.css";

function editPage() {
  const router = useRouter();
  const id = router.query.id;

  const [item, setItem] = useState({});
  const [updatedDescription, setUpdatedDescription] = useState("");

  const todosUrl = process.env.NEXT_PUBLIC_JSON_SERVER_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${todosUrl}/${id}`);
        setItem(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [id]);

  const handleUpdate = () => {
    axios
      .put(`${todosUrl}/${id}`, { ...item, description: updatedDescription })
      .then((res) => {
        console.log("To-Do güncellendi");
      })
      .catch((err) => {
        console.error(err);
      });
      router.push("/");
  };

  return (
    <div className={styles.container}>
      <Navbar />
      <main style={{ marginTop: "10rem" }}>
        <Typography variant="h3">
          {" "}
          <EditIcon sx={{ fontSize: 40 }} /> To-Do Update
        </Typography>
        <form style={{ marginTop: "2rem" }}>
          <Typography variant="h6" color="#63707E">
            Old Description: {item.description}
          </Typography>
          <br/>
          <TextField
            name="description"
            label="New Description"
            variant="outlined"
            multiline
            rows={3}
            fullWidth
            value={updatedDescription}
            onChange={(e) => setUpdatedDescription(e.target.value)}
          />
        </form>
        <Button
          className={styles.button}
          variant="contained"
          onClick={handleUpdate}
        >
          Update
        </Button>
      </main>
    </div>
  );
}

export default editPage;
