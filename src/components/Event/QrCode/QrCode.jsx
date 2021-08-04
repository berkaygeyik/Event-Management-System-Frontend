import { Card } from "@material-ui/core";
import React, { useState } from "react";

// console.log(qrCodeImage);
export default function QrCode(props) {
  if (!props.user || !props.userRole || !props.event) {
    return null;
  }
  return (
    <div>
      <Card style={{ padding: 0, marginTop: "30px" }}>
        <h3 style={{ textAlign: "center", margin: "15px 10px" }}>Event And Participant Details</h3>

        <hr
          style={{
            margin: "10px 10px",
            marginBottom: "0",
            opacity: "0.15 !important",
          }}
        />
        <img style={{ width: "100%" }} src={require("../../../qr-code-images/qr.png").default} alt="Logo" />
      </Card>
    </div>
  );
}
