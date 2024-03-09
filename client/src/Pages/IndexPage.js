import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { Navigate } from "react-router-dom";

function IndexPage() {
  const { userInfo } = useContext(UserContext);

  if (!userInfo) {
    return <Navigate to="/login" />;
  }

  return <div>hello Yash</div>;
}

export default IndexPage;
