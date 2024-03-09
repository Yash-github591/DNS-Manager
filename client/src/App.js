import { useEffect, useState } from "react";
import "./App.css";
import Button from "@mui/material/Button";
import axios, { all } from "axios";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Layout from "./Components/Layout";
import IndexPage from "./Pages/IndexPage";
import LoginPage from "./Pages/LoginPage";
import RegisterPage from "./Pages/RegisterPage";
import { UserContextProvider } from "./context/UserContext";

function App() {
  // const [allDnsRecords, setAllDnsRecords] = useState([]);

  // useEffect(() => {
  //   async function fetchDnsRecords() {
  //     const response = await axios.get(
  //       `${process.env.REACT_APP_API_URL}/see-all-dns-records`
  //     );
  //     const data = response.data;
  //     console.log(data.rrsets);
  //     setAllDnsRecords(data.rrsets);
  //   }

  //   fetchDnsRecords();
  // }, []);

  // if (allDnsRecords.length > 0) {
  //   console.log(allDnsRecords);
  // }

  return (
    <UserContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<IndexPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </UserContextProvider>
  );
}

export default App;
