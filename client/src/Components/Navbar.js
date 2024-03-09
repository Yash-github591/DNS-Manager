import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";

function Navbar() {
  const { userInfo, setUserInfo } = useContext(UserContext);

  return (
    <div>
      {userInfo ? (
        <div>
          <p>Logged in as {userInfo.username}</p>
          <button onClick={() => setUserInfo(null)}>Log out</button>
        </div>
      ) : (
        <div>
          <a href="/login">Log in</a>
          <a href="/register">Register</a>
        </div>
      )}
    </div>
  );
}

export default Navbar;
