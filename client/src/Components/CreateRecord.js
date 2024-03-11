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
  const { currZone, zoneRecords, setZoneRecords } = useContext(dnsContext);
  const [rrdatasInput, setRrdatasInput] = useState(""); // Assuming rrdatas is an array
  const [Record, setRecord] = useState({
    name: "",
    type: "",
    ttl: "",
  });

  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setRecord((prevRecord) => ({
      ...prevRecord,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Perform the logic to update the record with editedRecord data
    console.log("data before adding:", Record);
    var newRrdatas = [];
    if (rrdatasInput.includes(",")) {
      newRrdatas = rrdatasInput.split(",");
      // remove spaces from newRrdatas
      newRrdatas = newRrdatas.map((str) => str.replace(/\s/g, ""));
    } else {
      newRrdatas = [rrdatasInput.trim()];
    }
    console.log("newRrdatas:", newRrdatas);
    console.log("Record Data to be added:", Record);
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/create-dns-record`,
        {
          zone: currZone,
          record: {
            name: `${Record.name}.${currZone.dnsName}`,
            type: Record.type,
            ttl: Record.ttl,
            rrdatas: newRrdatas,
          },
        },
        { withCredentials: true }
      )
      .then((response) => {
        alert("Record added successfully");
        var newRecord = {
          name: Record.name,
          type: Record.type,
          ttl: Record.ttl,
          rrdatas: newRrdatas,
        };
        // setZoneRecords((prevRecords) => [...prevRecords, newRecord]);
        console.log(response);
      })
      .catch((error) => {
        alert("Error adding record");
        console.error(error);
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
                label="Name(without domain)"
                name="name"
                value={Record.name}
                onChange={handleInputChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Type"
                name="type"
                value={Record.type}
                onChange={handleInputChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="TTL(seconds)"
                name="ttl"
                value={Record.ttl}
                onChange={handleInputChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="IP Addresses(Comma separated)"
                name="rrdatas"
                value={rrdatasInput}
                onChange={(e) => setRrdatasInput(e.target.value)}
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
            onClick={handleSubmit}
          >
            Create
          </Button>
        </form>
      </Paper>
    </Container>
  );
}

export default CreateRecord;
