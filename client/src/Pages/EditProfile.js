import { TextField, Button, Box, Typography, Paper, Grid } from "@mui/material";
import { useContext, useState, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function EditProfile() {
  const { userInfo, setUserInfo } = useContext(UserContext);
  const [username, setUsername] = useState("");
  const [projectId, setprojectId] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const navigate = useNavigate();
  const BASE_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    function fetchUserInfo() {
      axios
        .get(`${process.env.REACT_APP_API_URL}/profile`, {
          withCredentials: true,
        })
        .then((response) => {
          if (response.data) {
            // setUserInfo(response.data);
            setUsername(response.data.username);
            setprojectId(response.data.projectId);
            setPassword(response.data.password);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
    fetchUserInfo();
  }, []);
  function handleSubmit(event) {
    event.preventDefault();
    console.log("edited");
    axios
      .patch(
        `${BASE_URL}/update-profile`,
        { username, projectId, password },
        { withCredentials: true }
      )
      .then((response) => {
        if (response.status === 200) {
          setUserInfo(response.data);
          console.log(response.data);
          setRedirect(true);
          alert("Profile updated successfully");
        } else {
          alert("Profile update failed");
        }
      })
      .catch((error) => {
        alert("An error occurred: " + error.message);
      });
  }

  if (redirect) {
    navigate("/");
  }

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <Grid container justifyContent="center">
        <Grid item xs={12} sm={8} md={6} lg={4}>
          <Paper elevation={3} sx={{ p: 4, textAlign: "center" }}>
            <Typography variant="h4" mb={3} color="primary">
              Edit Profile
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                margin="normal"
                label="Username"
                value={username}
                onChange={(ev) => setUsername(ev.target.value)}
                variant="outlined"
                required="true"
              />
              <TextField
                fullWidth
                margin="normal"
                label="Project ID"
                value={projectId}
                onChange={(ev) => setprojectId(ev.target.value)}
                variant="outlined"
                required="true"
              />
              <TextField
                fullWidth
                margin="normal"
                label="Password"
                type="password"
                value={password}
                onChange={(ev) => setPassword(ev.target.value)}
                variant="outlined"
                required="true"
              />
              <Button
                variant="contained"
                color="primary"
                size="large"
                type="submit"
                fullWidth
                sx={{ mt: 3 }}
              >
                EditProfile
              </Button>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default EditProfile;
