import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React, { useState, useContext } from "react";
import { filterContext } from "../context/FilterContext";

function Filters() {
  const { type, setType } = useContext(filterContext);

  return (
    <>
      <div
        style={{
          fontSize: "30px",
          fontWeight: "bold",
          fontFamily: "cursive",
          textAlign: "center",
        }}
      >
        <div>
          <u>Filters</u>
        </div>
        <Box
          id="typeFilter"
          style={{
            width: "150px",
            paddingTop: "10%",
            paddingRight: "10%",
            paddingLeft: "60%",
          }}
        >
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Type</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={type}
              label="Age"
              onChange={(e) => setType(e.target.value)}
            >
              <MenuItem value={"Select"}>Select</MenuItem>
              <MenuItem value={"A"}>A</MenuItem>
              <MenuItem value={"AAAA"}>AAAA</MenuItem>
              <MenuItem value={"MX"}>MX</MenuItem>
              <MenuItem value={"NS"}>NS</MenuItem>
              <MenuItem value={"PTR"}>PTR</MenuItem>
              <MenuItem value={"SOA"}>SOA</MenuItem>
              <MenuItem value={"SRV"}>SRV</MenuItem>
              <MenuItem value={"TXT"}>TXT</MenuItem>
              <MenuItem value={"DNSSEC"}>DNSSEC</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </div>
    </>
  );
}

export default Filters;
