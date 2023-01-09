import React, { useState, useEffect } from "react";

export default function TriggerURL() {
  const [payerName, setPayerName] = useState("");
  const [payerURL, setPayerURL] = useState("");

  const handleInputChange = (e) => {
    if (e.target.id === "payerName") setPayerName(e.target.value);
    if (e.target.id === "payerURL") setPayerURL(e.target.value);
  };
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-3">
          <label style={{ fontWeight: "bold", fontStyle: "oblique" }}>
            payerName<span style={{ color: "red" }}>*</span>
          </label>
          <input
            style={{
              fontWeight: "normal",
              fontStyle: "italic",
              padding: "5px",
            }}
            id="payerName"
            className="col-md-12"
            type="text"
            placeholder="Enter Payer Name"
            onChange={handleInputChange}
          />
        </div>
        <div className="col-md-4" style={{ marginLeft: "35px" }}>
          <label style={{ fontWeight: "bold", fontStyle: "oblique" }}>
            payerYRL<span style={{ color: "red" }}>*</span>
          </label>
          <input
            style={{
              fontWeight: "normal",
              fontStyle: "italic",
              padding: "5px",
            }}
            id="payerURL"
            onChange={handleInputChange}
            className="col-md-12"
            type="text"
            placeholder="Enter Payer URL"
          />
        </div>
        <div
          className="col-md-1 offset-md-1 mt-3"
          style={{ marginLeft: "20px" }}
        >
          <button
            type="button"
            className="btn btn-secondary mt-2"
            style={{ width: "80px", borderRadius: "18px" }}
          >
            RUN
          </button>
        </div>
      </div>
      <h5 style={{ margin: "50px", textAlign: "center", fontSize: "40px" }}>
        {payerName} {payerURL}
      </h5>
    </div>
  );
}
