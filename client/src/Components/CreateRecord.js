import React, { useState, useContext } from "react";
import { dnsContext } from "../context/dnsContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  TextField,
  Button,
  Typography,
  Container,
  Grid,
  Paper,
} from "@mui/material";

function CreateRecord() {
  const { currZone, recordTobeEdited } = useContext(dnsContext);
  const [editedRecord, setEditedRecord] = useState({
    name: "",
    type: "",
    ttl: "",
    rrdatas: [], // Assuming rrdatas is an array
  });

  const navigate = useNavigate();
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedRecord((prevRecord) => ({
      ...prevRecord,
      [name]: value,
    }));
  };

  //   const handleSubmit = (event) => {
  //     event.preventDefault();
  //     // Perform the logic to update the record with editedRecord data
  //     if (editedRecord.rrdatas.includes(",")) {
  //       editedRecord.rrdatas = editedRecord.rrdatas.split(","); // Convert rrdatas to an array
  //     }
  //     console.log("Record Data to be edited:", editedRecord);
  //     axios
  //       .patch(
  //         `${process.env.REACT_APP_API_URL}/edit-dns-record`,
  //         {
  //           zone: currZone,
  //           record: editedRecord,
  //           recordTobeEdited: recordTobeEdited,
  //         },
  //         { withCredentials: true }
  //       )
  //       .then((response) => {
  //         alert("Record updated successfully");
  //         navigate("/");
  //         console.log(response);
  //       })
  //       .catch((error) => {
  //         alert("Error updating record");
  //         console.error(error.response);
  //       });
  //   };

  return (
    <Container component="main" maxWidth="sm">
      <Paper
        elevation={3}
        sx={{
          padding: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: 2,
        }}
      >
        <Typography component="h1" variant="h5" gutterBottom>
          Create Record
        </Typography>
        <form onSubmit={() => {}} style={{ width: "100%" }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Name"
                name="name"
                value={editedRecord.name}
                onChange={handleInputChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Type"
                name="type"
                value={editedRecord.type}
                onChange={handleInputChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="TTL(seconds)"
                name="ttl"
                value={editedRecord.ttl}
                onChange={handleInputChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="IP Addresses(Comma separated)"
                name="rrdatas"
                value={editedRecord.rrdatas}
                onChange={handleInputChange}
                fullWidth
                required
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Create
          </Button>
        </form>
      </Paper>
    </Container>
  );
}

export default CreateRecord;
