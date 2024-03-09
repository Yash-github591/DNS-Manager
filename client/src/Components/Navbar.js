import React, { useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Navbar() {
  const { userInfo, setUserInfo } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchUserInfo() {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/profile`,
        {
          withCredentials: true,
        }
      );
      const data = await response.data;
      if (data) {
        setUserInfo(data);
      }
    }
    fetchUserInfo();
  }, []);

  function handleLogout() {
    axios.post(`${process.env.REACT_APP_API_URL}/logout`, null, {
      withCredentials: true,
    });
    setUserInfo(null);
    navigate("/login");
  }

  return (
    <>
      {userInfo && (
        <div>
          <div>
            <p>Logged in as {userInfo.username}</p>
            <button onClick={handleLogout}>Log out</button>
          </div>
        </div>
      )}
      {!userInfo && (
        <div>
          <button onClick={() => navigate("/login")}>Log in</button>
          <button onClick={() => navigate("/register")}>Register</button>
        </div>
      )}
    </>
  );
}

export default Navbar;
