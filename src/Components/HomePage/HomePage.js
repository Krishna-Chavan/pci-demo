import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const [selected, setSelected] = useState("");
  const options = ["centene", "anthem", "aetna", "cigna", "uhc", "humana"];
  const [noOfFiles, setNoOfFiles] = useState([]);

  let navigate = useNavigate();
  const routeChange = () => {
    let path = `/home`;
    navigate(path);
  };

  let centeneIndexFiles = "";
  let centeneRateFiles = "";
  let centeneTotalFiles = "";
  let payerName = "";

  let type = [" Select Payer's URL"];
  let urlvalues = null;

  const changeSelectOptionHandler = (e) => {
    setSelected(e.target.value);
    // payerNamePost();
  };

  if (selected === "centene") {
    type = ["https://www.centene.com/price-transparency-files.html"];
  } else if (selected === "anthem") {
    type = ["https://www.anthem.com/ca/machine-readable-file"];
  } else if (selected === "cigna") {
    type = ["https://www.cigna.com/legal/compliance/machine-readable-files"];
  } else if (selected === "uhc") {
    type = ["https://transparency-in-coverage.uhc.com/"];
  } else if (selected === "humana") {
    type = ["https://developers.humana.com/cost-transparency"];
  } else if (selected === "aetna") {
    type = [
      "https://health1.aetna.com/app/public/#/one/insurerCode=AETNACVS_I&brandCode=ALICSI/machine-readable-transparency-in-coverage?reportingEntityType=Third%20Party%20Administrator_6644&lock=true",
    ];
  }

  if (type) {
    urlvalues = type.map((el) => <option key={el}>{el}</option>);
  }

  const payerNamePost = (e) => {
    // console.log(`payer - ${selected}, url - ${urlvalues}`);
    const api = `https://6koohc8cu1.execute-api.us-west-2.amazonaws.com/PCIredshiftFileCount?PayerName=${selected}`;
    const data = { name: "centeneone", url: "http" };
    axios
      .post(api, data)
      .then((response) => {
        console.log(response);
        setNoOfFiles(response.data);
        // console.log(noOfFiles);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  if (noOfFiles.companyName) {
    payerName = noOfFiles.companyName;
    centeneIndexFiles = noOfFiles.indexFiles;
    centeneRateFiles = noOfFiles.rateFiles;
    centeneTotalFiles = noOfFiles.total_files;
  }

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-3 offset-md-1" style={{ marginLeft: "55px" }}>
          <label style={{ fontWeight: "bold", fontStyle: "italic" }}>
            Payer's Name<span style={{ color: "red" }}>*</span>
          </label>
          <select
            id="releaseType"
            style={{
              fontWeight: "normal",
              fontStyle: "italic",
              padding: "5px",
            }}
            className="col-md-12"
            onChange={changeSelectOptionHandler}
          >
            <option style={{ fontWeight: "bold", fontStyle: "italic" }}>
              Select Payer's Name
            </option>
            {options.map((option, index) => {
              return <option key={index}>{option}</option>;
            })}
          </select>
        </div>
        <div className="col-md-4 offset-md-1" style={{ marginLeft: "20px" }}>
          <label style={{ fontWeight: "bold", fontStyle: "italic" }}>
            Payer's URL<span style={{ color: "red" }}>*</span>
          </label>
          <select
            id="releaseType"
            style={{
              fontWeight: "normal",
              fontStyle: "italic",
              padding: "5px",
            }}
            className="col-md-12"
          >
            <option style={{ fontWeight: "bold", fontStyle: "italic" }}>
              {urlvalues}
            </option>
          </select>
        </div>
        <div
          className="col-md-2 offset-md-1 mt-3"
          style={{ marginLeft: "20px" }}
        >
          <button
            type="button"
            className="btn btn-secondary mt-2"
            onClick={payerNamePost}
          >
            Get Files
          </button>
        </div>
        <div className="col-md-1 mt-3">
          <button
            type="button"
            className="btn btn-secondary mt-2"
            onClick={routeChange}
          >
            Pipelines
          </button>
        </div>
      </div>
      <table
        className="table mt-5"
        style={{
          boxShadow:
            " 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
          width: "1050px",
          marginLeft: "40px",
        }}
      >
        <thead>
          <tr>
            <th style={{ textAlign: "center" }} scope="col">
              SI no
            </th>
            <th style={{ textAlign: "center" }} scope="col">
              Payes Name
            </th>
            <th style={{ textAlign: "center" }} scope="col">
              Total Processed Files
            </th>
            <th style={{ textAlign: "center" }} scope="col">
              Index Processed File
            </th>
            <th style={{ textAlign: "center" }} scope="col">
              Rate File Captured
            </th>
            <th style={{ textAlign: "center" }} scope="col">
              Rate Processed File
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th style={{ textAlign: "center" }} scope="row">
              1
            </th>
            <td style={{ textAlign: "center" }}>{payerName}</td>
            <td style={{ textAlign: "center" }}>{centeneTotalFiles}</td>
            <td style={{ textAlign: "center" }}>{centeneIndexFiles}</td>
            <td style={{ textAlign: "center" }}>{centeneRateFiles}</td>
            <td style={{ textAlign: "center" }}>{centeneRateFiles}</td>
          </tr>
          {/* <tr>
            <th style={{ textAlign: "center" }} scope="row">
              1
            </th>
            <td style={{ textAlign: "center" }}>Centene</td>
            <td style={{ textAlign: "center" }}>50</td>
            <td style={{ textAlign: "center" }}>13</td>
            <td style={{ textAlign: "center" }}>37</td>
          </tr> */}
          {/* <tr>
            <th scope="row">2</th>
            <td>Anthem</td>
            <td>11930</td>
            <td>1</td>
            <td>11929</td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td>Cigna</td>
            <td>75</td>
            <td>1</td>
            <td>74</td>
          </tr>
          <tr>
            <th scope="row">4</th>
            <td>United</td>
            <td>35145</td>
            <td>35145</td>
            <td>TBC</td>
          </tr>
          <tr>
            <th scope="row">5</th>
            <td>Aetna</td>
            <td>3</td>
            <td>1</td>
            <td>2</td>
          </tr>
          <tr>
            <th scope="row">6</th>
            <td>Humana</td>
            <td>1</td>
            <td>0</td>
            <td>1</td>
          </tr> */}
        </tbody>
      </table>
    </div>
  );
}
