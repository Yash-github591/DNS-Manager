import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useState } from "react";

export default function TableComponent({ value }) {
  const [openAlert, setOpenAlert] = useState(false);

  console.log(value);

  function createData(name, type, ttl) {
    return { name, type, ttl };
  }
  const rows = [],
    isAgree = false;

  const handleClose = () => {
    setOpenAlert(false);
    if (isAgree) {
      // delete the record
      console.log("Delete the record");
    } else {
      console.log("Don't delete the record");
    }
  };

  if (value && value.length > 0) {
    for (var i = 0; i < value.length; i++) {
      rows.push(createData(value[i].name, value[i].type, value[i].ttl));
    }
  }

  return (
    <>
      <Dialog
        open={openAlert}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Use Google's location service?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Let Google help apps determine location. This means sending
            anonymous location data to Google, even when no apps are running.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button
            onClick={() => {
              isAgree = true;
              handleClose();
            }}
            autoFocus
          >
            Agree
          </Button>
        </DialogActions>
      </Dialog>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 150 }} aria-label="simple table">
          <TableHead
            style={{
              backgroundColor: "#f5f5f5",
              position: "sticky",
              top: 0,
              zIndex: 1,
            }}
          >
            <TableRow>
              <TableCell align="center">S.No</TableCell>
              <TableCell align="center">Name</TableCell>
              <TableCell align="center">Type</TableCell>
              <TableCell align="center">TTL</TableCell>
              <TableCell align="center"></TableCell>
              <TableCell align="center"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="center">{index + 1}</TableCell>
                <TableCell align="center" component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="center">{row.type}</TableCell>
                <TableCell align="center">{row.ttl}</TableCell>
                <TableCell
                  align="center"
                  style={{
                    paddingRight: "0px",
                  }}
                >
                  <Button size="small" variant="outlined">
                    Edit
                  </Button>
                </TableCell>
                <TableCell
                  style={{
                    paddingLeft: "0px",
                  }}
                  align="center"
                >
                  <IconButton onClick={() => setOpenAlert(true)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
