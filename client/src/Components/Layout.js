import React from "react";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <main>
      <Navbar />
      <Outlet /> {/* This is where the child components will be rendered */}
    </main>
  );
}

export default Layout;
