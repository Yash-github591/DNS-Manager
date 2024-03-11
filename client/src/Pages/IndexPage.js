import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import { dnsContext } from "../context/dnsContext";
import Chart from "../Components/Chart";
import axios from "axios";
import { Paper, Typography } from "@mui/material";
import TableComponent from "../Components/TableComponent";
import CreateRecord from "../Components/CreateRecord";

function IndexPage() {
  const [zoneRecords, setZoneRecords] = useState([]);
  const { userInfo } = useContext(UserContext);
  const { currZone } = useContext(dnsContext);

  useEffect(() => {
    const fetchRecords = () => {
      axios
        .get(`${process.env.REACT_APP_API_URL}/see-all-dns-records`, {
          params: {
            zone: currZone.name,
          },
          withCredentials: true,
        })
        .then((res) => {
          console.log(res.data);
          setZoneRecords(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    if (userInfo && currZone) {
      fetchRecords();
    }
  }, [currZone, userInfo]);

  return (
    <>
      {userInfo && (
        <div
          id="mainDiv"
          style={{
            height: "90vh",
            width: "100%",
          }}
        >
          <div
            id="upperDiv"
            style={{
              display: "flex",
              justifyContent: "space-between",
              height: "45%",
            }}
          >
            <div
              id="leftDiv"
              style={{
                width: "60%",
                borderRight: "1px solid black",
                borderBottom: "1px solid black",
              }}
            >
              {currZone && userInfo && (
                <div
                  style={{
                    display: "flex",
                  }}
                >
                  <div
                    style={{
                      margin: "5%",
                    }}
                  >
                    <div>
                      <b
                        style={{
                          display: "block",
                          fontSize: "20px",
                        }}
                      >
                        Project Id:{" "}
                      </b>
                      {userInfo.projectId}
                      <br />
                      <br />
                      <b
                        style={{
                          display: "block",
                          fontSize: "20px",
                        }}
                      >
                        current Zone:{" "}
                      </b>
                      {currZone.name}
                    </div>
                  </div>
                  {zoneRecords && (
                    <Chart
                      setZoneRecords={setZoneRecords}
                      value={zoneRecords.rrsets}
                    />
                  )}
                </div>
              )}
            </div>
            <div
              id="rightDiv"
              style={{
                width: "40%",
                borderBottom: "1px solid black",
              }}
            >
              filters
            </div>
          </div>
          <div
            id="lowerDiv"
            style={{
              display: "flex",
              height: "55%",
              textAlign: "center",
            }}
          >
            {zoneRecords && (
              <TableComponent
                style={{
                  width: "50%",
                  padding: "5%",
                  height: "100%",
                }}
                setZoneRecords={setZoneRecords}
                value={zoneRecords.rrsets}
              />
            )}
            <div
              id="lowerRight"
              style={{
                width: "50%",
                height: "100%",
                borderLeft: "1px solid black",
              }}
            >
              <CreateRecord
                setZoneRecords={setZoneRecords}
                zoneRecords={zoneRecords}
              />
            </div>
          </div>
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
