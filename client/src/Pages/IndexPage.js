import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import { dnsContext } from "../context/dnsContext";
import { useNavigate } from "react-router-dom";
import Chart from "../Components/Chart";
import axios from "axios";

function IndexPage() {
  const [zoneRecords, setZoneRecords] = useState([]);
  const { userInfo, setUserInfo } = useContext(UserContext);
  const { currZone } = useContext(dnsContext);
  const navigate = useNavigate();

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
              height: "30%",
            }}
          >
            <div
              id="leftDiv"
              style={{
                width: "50%",
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
                  <div>
                    <div>
                      <b
                        style={{
                          fontSize: "20px",
                        }}
                      >
                        Project Id:{" "}
                      </b>
                      {userInfo.projectId}
                      <br />
                      <b
                        style={{
                          fontSize: "20px",
                        }}
                      >
                        current Zone:{" "}
                      </b>
                      {currZone.name}
                    </div>
                  </div>
                  <Chart />
                </div>
              )}
            </div>
            <div
              id="rightDiv"
              style={{
                width: "50%",
                borderBottom: "1px solid black",
              }}
            >
              div2
            </div>
          </div>
          <div
            id="lowerDiv"
            style={{
              height: "70%",
              textAlign: "center",
              // borderTop: "1px solid black",
            }}
          >
            div3
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
