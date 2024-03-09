import React, { useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function IndexPage() {
  const { userInfo, setUserInfo } = useContext(UserContext);
  const navigate = useNavigate();

  return (
    <>
      {userInfo && (
        <div>
          <div>project id: {userInfo.projectId}</div>
          hello {userInfo.username}
        </div>
      )}
      {!userInfo && (
        <div
          style={{
            textAlign: "center",
            marginTop: "10%",
          }}
        >
          <h1>Welcome to the Google Cloud DNS Manager</h1>
          <p>
            This is a simple app to manage your Google Cloud DNS Zones. Please
            login or register to continue.
          </p>
        </div>
      )}
    </>
  );
}

export default IndexPage;
