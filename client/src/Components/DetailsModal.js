import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function DetailsModal({
  showDetails,
  setShowDetails,
  detailedRow,
}) {
  const handleClose = () => setShowDetails(false);

  console.log(showDetails);

  return (
    <>
      {detailedRow && (
        <div>
          <Modal
            open={showDetails}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <h1>
                <strong>Record Details</strong>
              </h1>
              <Typography variant="h6" component="h2">
                <strong>URL: </strong> {detailedRow.name}
              </Typography>
              <Typography sx={{ mt: 2 }}>
                <strong>Type:</strong> {detailedRow.type}
              </Typography>
              <Typography sx={{ mt: 1 }}>
                <strong>TTL(Time to Live in seconds):</strong> {detailedRow.ttl}
              </Typography>
              <Typography sx={{ mt: 1 }}>
                <strong>IP Addresses:</strong>{" "}
                <ul>
                  {detailedRow.rrdatas.map((data, index) => (
                    <li key={index}>{data}</li>
                  ))}
                </ul>
              </Typography>
              <Button onClick={handleClose} sx={{ mt: 2 }}>
                Close
              </Button>
            </Box>
          </Modal>
        </div>
      )}
    </>
  );
}
