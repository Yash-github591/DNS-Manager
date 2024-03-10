import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function createData(name, type, ttl) {
  return { name, type, ttl };
}

export default function TableComponent({ value }) {
  console.log(value);

  const rows = [];
  if (value && value.length > 0) {
    for (var i = 0; i < value.length; i++) {
      rows.push(createData(value[i].name, value[i].type, value[i].ttl));
    }
  }

  return (
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
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
