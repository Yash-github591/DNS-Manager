import React, { useState, useEffect, useContext } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import {
  Button,
  Drawer,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { UserContext } from "../context/UserContext";
import { dnsContext } from "../context/dnsContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Navbar() {
  const [open, setOpen] = useState(false);
  const { currZone, setCurrZone } = useContext(dnsContext);

  const { userInfo, setUserInfo } = useContext(UserContext);
  const [dnsZones, setDnsZones] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    function fetchUserInfo() {
      axios
        .get(`${process.env.REACT_APP_API_URL}/profile`, {
          withCredentials: true,
        })
        .then((response) => {
          if (response.data) {
            setUserInfo(response.data);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
    fetchUserInfo();
  }, []);

  useEffect(() => {
    function fetchDnsZones() {
      axios
        .get(`${process.env.REACT_APP_API_URL}/list-dns-zones`, {
          withCredentials: true,
        })
        .then((response) => {
          if (response.data) {
            // setDnsZones(response.data.managedZones);
            setDnsZones((prev) => response.data.managedZones); // to avoid react warning
            // setCurrZone(response.data.managedZones[0]);
            setCurrZone((prev) => response.data.managedZones[0]);
            console.log(response.data.managedZones);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
    fetchDnsZones();
  }, [userInfo]);

  function handleLogout() {
    axios.post(`${process.env.REACT_APP_API_URL}/logout`, null, {
      withCredentials: true,
    });
    setUserInfo(null);
    navigate("/login");
  }

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <h3
        style={{
          textAlign: "center",
          marginTop: "10%",
        }}
      >
        Change DNS Domain
      </h3>
      {dnsZones && (
        <Box sx={{ minWidth: 120 }}>
          <FormControl sx={{ ml: 4, minWidth: 180 }}>
            <InputLabel id="demo-simple-select-label">Domains</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={currZone}
              label="Domains"
              onChange={(event) => setCurrZone(event.target.value)}
            >
              {dnsZones.map((zone) => (
                <MenuItem value={zone} key={zone.id}>
                  {zone.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      )}
      <Button
        variant="outlined"
        style={{
          marginLeft: "24%",
          marginTop: "10%",
        }}
        onClick={() => {
          navigate("/editProfile");
        }}
      >
        Edit Profile
      </Button>
      <Button
        variant="outlined"
        style={{
          marginLeft: "30%",
          marginTop: "10%",
        }}
        onClick={handleLogout}
      >
        Logout
      </Button>
    </Box>
  );

  return (
    <>
      {userInfo && (
        <AppBar
          position="static"
          style={{
            height: "10vh",
            backgroundColor: "#1a1a1a",
          }}
        >
          <Container maxWidth="xl">
            <Toolbar
              disableGutters
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <Typography
                variant="h6"
                noWrap
                component="a"
                href="/"
                sx={{
                  mr: 2,
                  display: { xs: "none", md: "flex" },
                  fontFamily: "monospace",
                  fontWeight: 700,
                  fontSize: "2.5rem",
                  letterSpacing: ".3rem",
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                DNS Manager
              </Typography>
              <Typography
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <Typography
                  variant="h6"
                  noWrap
                  sx={{
                    mr: 5,
                    display: { xs: "none", md: "flex" },
                    fontFamily: "monospace",
                    fontWeight: 700,
                    fontSize: "1.5rem",
                    letterSpacing: ".3rem",
                    color: "inherit",
                    textDecoration: "none",
                  }}
                >
                  Hi {userInfo.username}!
                </Typography>

                <Typography
                  variant="h4"
                  noWrap
                  component="a"
                  sx={{
                    mr: 2,
                    display: { xs: "none", md: "flex" },
                    fontFamily: "monospace",
                    fontWeight: 300,
                    fontSize: "1rem",
                    letterSpacing: ".3rem",
                    color: "inherit",
                    textDecoration: "none",
                    padding: "0.5rem",
                    border: "1px solid #fff",
                    borderRadius: "15%",
                  }}
                  type="button"
                  onClick={toggleDrawer(true)}
                >
                  change domain
                </Typography>
              </Typography>
              <Drawer open={open} anchor="right" onClose={toggleDrawer(false)}>
                {DrawerList}
              </Drawer>
            </Toolbar>
          </Container>
        </AppBar>
      )}
      {!userInfo && (
        <AppBar position="static">
          <Container maxWidth="xl">
            <Toolbar
              disableGutters
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <Typography
                variant="h6"
                noWrap
                component="a"
                href="/"
                sx={{
                  mr: 2,
                  display: { xs: "none", md: "flex" },
                  fontFamily: "monospace",
                  fontWeight: 700,
                  fontSize: "1.5rem",
                  letterSpacing: ".3rem",
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                DNS Manager
              </Typography>
              <div>
                <button onClick={() => navigate("/login")}>Log in</button>
                <button
                  style={{ marginLeft: "20px" }}
                  onClick={() => navigate("/register")}
                >
                  Register
                </button>
              </div>
            </Toolbar>
          </Container>
        </AppBar>
      )}
    </>
  );
}
export default Navbar;
