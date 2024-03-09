import { TextField, Button, Box, Typography, Paper, Grid } from "@mui/material";
import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const { setUserInfo } = useContext(UserContext);
  const navigate = useNavigate();
  const BASE_URL = process.env.REACT_APP_API_URL;

  async function login(event) {
    event.preventDefault();

    try {
      const response = await axios.post(
        `${BASE_URL}/login`,
        { username, password },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        setUserInfo(response.data);
        setRedirect(true);
        alert(`Welcome ${response.data.username}`);
      } else {
        alert("An error occurred. Please try again.");
      }
    } catch (error) {
      alert("An error occurred: " + error.message);
    }
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
              login
            </Typography>
            <form onSubmit={login}>
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
                login
              </Button>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default LoginPage;
