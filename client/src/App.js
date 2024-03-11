import { useEffect, useState } from "react";
import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Layout from "./Components/Layout";
import IndexPage from "./Pages/IndexPage";
import LoginPage from "./Pages/LoginPage";
import RegisterPage from "./Pages/RegisterPage";
import EditRecord from "./Pages/EditRecord";
import { UserContextProvider } from "./context/UserContext";
import { DnsContextProvider } from "./context/dnsContext";
import { FilterContextProvider } from "./context/FilterContext";

function App() {
  return (
    <FilterContextProvider>
      <DnsContextProvider>
        <UserContextProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route path="/" element={<IndexPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/edit" element={<EditRecord />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </UserContextProvider>
      </DnsContextProvider>
    </FilterContextProvider>
  );
}

export default App;
