import React, { useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function IndexPage() {
  const { userInfo, setUserInfo } = useContext(UserContext);
  const navigate = useNavigate();

  return (
    <>
      {userInfo && <div>hello {userInfo.username}</div>}
      {!userInfo && <div>Please register or log in to view this page</div>}
    </>
  );
}

export default IndexPage;
