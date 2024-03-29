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
import { Button } from "@mui/material";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { dnsContext } from "../context/dnsContext";
import { filterContext } from "../context/FilterContext";
import DetailsModal from "./DetailsModal";
import DeleteDialog from "./DeleteDialog";

export default function TableComponent() {
  const [openAlert, setOpenAlert] = useState(false);
  const [record, setRecord] = useState(null);
  const [rows, setRows] = useState([]);
  const { type, setType } = useContext(filterContext);
  const [detailedRow, setDetailedRow] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const { currZone, setRecordTobeEdited, zoneRecords, setZoneRecords } =
    useContext(dnsContext);

  console.log(type);
  var isAgree = false;
  const navigate = useNavigate();

  useEffect(() => {
    if (zoneRecords && zoneRecords.rrsets && zoneRecords.rrsets.length > 0) {
      var temp = [],
        value = zoneRecords.rrsets;
      console.log(value);
      for (var i = 0; i < value.length; i++) {
        if (type == "Select" || type == value[i].type) {
          temp.push({
            kind: value[i].kind,
            name: value[i].name,
            type: value[i].type,
            ttl: value[i].ttl,
            rrdatas: value[i].rrdatas,
            signatureRrdatas: value[i].signatureRrdatas,
          });
        }
      }
      setRows(temp);
    }
  }, [type, zoneRecords]);

  return (
    <>
      <DetailsModal
        showDetails={showDetails}
        setShowDetails={setShowDetails}
        detailedRow={detailedRow}
      />
      <DeleteDialog
        openAlert={openAlert}
        setOpenAlert={setOpenAlert}
        record={record}
        rows={rows}
        setRows={setRows}
        currZone={currZone}
      />
      {rows.length > 0 && (
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
                <TableCell align="center"></TableCell>
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
                  {/* <TableCell align="center">{row.ttl}</TableCell> */}
                  <TableCell
                    align="center"
                    style={{
                      paddingRight: "0px",
                    }}
                  >
                    <Button
                      onClick={() => {
                        console.log(row);
                        setDetailedRow(row);
                        setShowDetails(true);
                      }}
                      size="small"
                      variant="outlined"
                    >
                      Details
                    </Button>
                  </TableCell>
                  <TableCell
                    align="center"
                    style={{
                      paddingRight: "0px",
                    }}
                  >
                    <Button
                      onClick={() => {
                        console.log(row);
                        setRecordTobeEdited(row);
                        navigate("/edit");
                      }}
                      size="small"
                      variant="outlined"
                    >
                      Edit
                    </Button>
                  </TableCell>
                  <TableCell
                    style={{
                      paddingLeft: "0px",
                    }}
                    align="center"
                  >
                    <IconButton
                      onClick={() => {
                        setOpenAlert(true);
                        setRecord(row);
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      {rows.length == 0 && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            width: "100%",
          }}
        >
          <h1>No records found</h1>
        </div>
      )}
    </>
  );
}
