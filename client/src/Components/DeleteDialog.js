import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";
import axios from "axios";
import React from "react";

function DeleteDialog({
  openAlert,
  setOpenAlert,
  record,
  rows,
  setRows,
  currZone,
}) {
  var isAgree = false;
  const handleClose = () => {
    setOpenAlert(false);
    if (isAgree) {
      // delete the record
      console.log("Delete the record", record);
      axios
        .delete(`${process.env.REACT_APP_API_URL}/delete-dns-record`, {
          params: {
            zone: currZone,
            record: {
              name: record.name,
              type: record.type,
              ttl: record.ttl,
              rrdatas: record.rrdatas,
              kind: record.kind,
              signatureRrdatas: record.signatureRrdatas,
            },
          },
          withCredentials: true,
        })
        .then((res) => {
          alert("Record deleted successfully");
          setRows(rows.filter((row) => row.name !== record.name));
          console.log(res);
        })
        .catch((err) => {
          alert(err);
          console.log(err);
        });
    } else {
      console.log("Don't delete the record");
    }
  };

  return (
    <Dialog
      open={openAlert}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {"Are you sure you want to delete this record ?"}
      </DialogTitle>
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
  );
}

export default DeleteDialog;
