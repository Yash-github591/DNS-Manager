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

function EditRecord() {
  const { currZone, recordTobeEdited } = useContext(dnsContext);
  const [editedRecord, setEditedRecord] = useState({
    name: recordTobeEdited ? recordTobeEdited.name.split(".")[0] : "",
    type: recordTobeEdited ? recordTobeEdited.type : "",
    ttl: recordTobeEdited ? recordTobeEdited.ttl : "",
    rrdatas: recordTobeEdited ? recordTobeEdited.rrdatas.join(",") : "", // Assuming rrdatas is an array
    kind: recordTobeEdited ? recordTobeEdited.kind : "",
    signatureRrdatas: recordTobeEdited ? recordTobeEdited.signatureRrdatas : "",
  });

  const navigate = useNavigate();
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedRecord((prevRecord) => ({
      ...prevRecord,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Perform the logic to update the record with editedRecord data
    if (editedRecord.rrdatas.includes(",")) {
      editedRecord.rrdatas = editedRecord.rrdatas.split(","); // Convert rrdatas to an array
      // remove spaces from editedRecord.rrdatas
      editedRecord.rrdatas = editedRecord.rrdatas.map((str) =>
        str.replace(/\s/g, "")
      );
    }
    console.log("new record:", editedRecord);
    console.log("Record data to be edited:", recordTobeEdited);
    axios
      .patch(
        `${process.env.REACT_APP_API_URL}/edit-dns-record`,
        {
          zone: currZone,
          record: {
            name: `${editedRecord.name}.${currZone.dnsName}`,
            type: editedRecord.type,
            ttl: editedRecord.ttl,
            rrdatas: editedRecord.rrdatas,
          },
          recordTobeEdited: recordTobeEdited,
        },
        { withCredentials: true }
      )
      .then((response) => {
        alert("Record updated successfully");
        navigate("/");
        console.log(response);
      })
      .catch((error) => {
        alert("Error updating record");
        console.error(error.response);
      });
  };

  return (
    <Container component="main" maxWidth="sm">
      <Paper
        elevation={3}
        sx={{
          padding: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: 8,
        }}
      >
        <Typography component="h1" variant="h5" gutterBottom>
          Edit Record
        </Typography>
        <form onSubmit={handleSubmit} style={{ width: "100%" }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Name(without domain)"
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
            Save Changes
          </Button>
        </form>
      </Paper>
    </Container>
  );
}

export default EditRecord;
