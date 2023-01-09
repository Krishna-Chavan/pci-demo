import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Content() {
  const [lambdaResponse, setLambdaResponse] = useState([]);
  // const [ec2Response, setEc2Response] = useState([]);
  const [emrResponse, setEmrResponse] = useState([]);
  const [selected, setSelected] = useState("");
  const options = ["Centene", "Antheme", "Cigna", "United", "humana"];

  let type = " Select Payer's URL";
  let urlvalues = null;

  const changeSelectOptionHandler = (e) => {
    // console.log(`payer Name - ${e.target.value}`);
    setSelected(e.target.value);
  };

  const hancleInputChange = (e) => {
    console.log(e.target.value);
  };

  //   console.log(`selected value${selected}`);
  if (selected === "Centene") {
    type = "https://www.centene.com/price-transparency-files.html";
  } else if (selected === "Antheme") {
    type = "https://www.anthem.com/ca/machine-readable-file";
  } else if (selected === "Cigna") {
    type = "https://www.cigna.com/legal/compliance/machine-readable-files";
  } else if (selected === "United") {
    type = "https://transparency-in-coverage.uhc.com/";
  } else if (selected === "humana") {
    type = "https://developers.humana.com/cost-transparency";
  }

  if (type) {
    urlvalues = type;
  }

  const postMethos = (e) => {
    console.log(`payer - ${selected}, url - ${urlvalues}`);
    const api = `https://cxprsmilfk.execute-api.us-west-2.amazonaws.com/pcilambda?name=${selected}&url=${urlvalues}`;
    const data = { name: "centeneone", url: "http" };
    axios
      .post(api, data)
      .then((response) => {
        // console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
    getLambdaResponse();
  };

  const getLambdaResponse = () => {
    const api = `https://cxprsmilfk.execute-api.us-west-2.amazonaws.com/pcilambda?name=name&url=url`;
    const data = { name: "centeneone", url: "http" };
    axios
      .get(api, data)
      .then((response) => {
        setLambdaResponse(response.data);
        // console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    console.log(lambdaResponse);
    // getEc2Response();
  };

  // const getEc2Response = () => {
  //   const api = `https://wvuzzjksmi.execute-api.us-east-1.amazonaws.com/staging`;
  //   const data = { name: "centeneone", url: "http" };
  //   axios
  //     .get(api, data)
  //     .then((response) => {
  //       setEc2Response(response.data);
  //       // console.log(response.data);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  //   console.log(ec2Response);
  // };

  const isSuccess = () => {
    // if (lambdaResponse.statusCode == 200) {
    //   return (
    //     <button className="btn btn-success" style={{ width: "105px" }}>
    //       Success
    //     </button>
    //   );
    // } else if (lambdaResponse.errorMessage) {\
    if (lambdaResponse.errorMessage) {
      return (
        <button className="btn btn-danger" style={{ width: "105px" }}>
          Failed
        </button>
      );
    } else if (!lambdaResponse.errorMessage) {
      return (
        <button className="btn btn-success" style={{ width: "105px" }}>
          Success
        </button>
      );
    } else {
      return (
        <button className="btn btn-secondary" style={{ width: "105px" }}>
          Not Triggered
        </button>
      );
    }
  };

  const getEMRStatus = () => {
    const api = `https://0lcnbz6w47.execute-api.us-west-2.amazonaws.com/pcistatus`;
    const data = { name: "centeneone", url: "http" };
    axios
      .get(api, data)
      .then((response) => {
        setEmrResponse(response.data);
        // console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    console.log(emrResponse);
  };

  const isStatus = () => {
    if (emrResponse.clusterStatus == "STARTING") {
      return (
        <button className="btn btn-success" style={{ width: "105px" }}>
          Starting
        </button>
      );
    } else if (emrResponse.clusterStatus == "RUNNING") {
      return (
        <button className="btn btn-success" style={{ width: "105px" }}>
          Running
        </button>
      );
    } else if (emrResponse.clusterStatus == "TERMINATING") {
      return (
        <button className="btn btn-warning" style={{ width: "105px" }}>
          Terminating
        </button>
      );
    } else if (emrResponse.clusterStatus == "TERMINATED") {
      return (
        <button className="btn btn-secondary" style={{ width: "105px" }}>
          Terminated
        </button>
      );
    } else if (emrResponse.errorMessage) {
      return (
        <button className="btn btn-danger" style={{ width: "105px" }}>
          Failed
        </button>
      );
    } else {
      return (
        <button className="btn btn-secondary" style={{ width: "105px" }}>
          Terminated
        </button>
      );
    }
  };
  const isEC2Status = () => {
    if (emrResponse.InstanceState == "pending") {
      return (
        <button className="btn btn-warning" style={{ width: "105px" }}>
          pending
        </button>
      );
    } else if (emrResponse.InstanceState == "running") {
      return (
        <button className="btn btn-success" style={{ width: "105px" }}>
          running
        </button>
      );
    } else if (emrResponse.InstanceState == "stopping") {
      return (
        <button className="btn btn-info" style={{ width: "105px" }}>
          stopping
        </button>
      );
    } else if (emrResponse.InstanceState == "stopped") {
      return (
        <button className="btn btn-secondary" style={{ width: "105px" }}>
          stopped
        </button>
      );
    } else if (emrResponse.InstanceState == "shutting-down") {
      return (
        <button className="btn btn-secondary" style={{ width: "105px" }}>
          shutting-down
        </button>
      );
    } else if (emrResponse.InstanceState == "terminated") {
      return (
        <button className="btn btn-secondary" style={{ width: "105px" }}>
          terminated
        </button>
      );
    } else {
      return (
        <button className="btn btn-secondary" style={{ width: "105px" }}>
          Terminated
        </button>
      );
    }
  };

  const isEC2DedicatedStatus = () => {
    if (emrResponse.pci_instance_state == "pending") {
      return (
        <button className="btn btn-warning" style={{ width: "105px" }}>
          pending
        </button>
      );
    } else if (emrResponse.pci_instance_state == "running") {
      return (
        <button className="btn btn-success" style={{ width: "105px" }}>
          running
        </button>
      );
    } else if (emrResponse.pci_instance_state == "stopping") {
      return (
        <button className="btn btn-info" style={{ width: "105px" }}>
          stopping
        </button>
      );
    } else if (emrResponse.pci_instance_state == "stopped") {
      return (
        <button className="btn btn-secondary" style={{ width: "105px" }}>
          stopped
        </button>
      );
    } else if (emrResponse.pci_instance_state == "shutting-down") {
      return (
        <button className="btn btn-secondary" style={{ width: "105px" }}>
          shutting-down
        </button>
      );
    } else if (emrResponse.pci_instance_state == "terminated") {
      return (
        <button className="btn btn-secondary" style={{ width: "105px" }}>
          terminated
        </button>
      );
    } else {
      return (
        <button className="btn btn-secondary" style={{ width: "105px" }}>
          Terminated
        </button>
      );
    }
  };

  const isGlueStatus = () => {
    if (emrResponse.glueStatus == "STARTING") {
      return (
        <button className="btn btn-primary" style={{ width: "105px" }}>
          Starting
        </button>
      );
    } else if (emrResponse.glueStatus == "RUNNING") {
      return (
        <button className="btn btn-success" style={{ width: "105px" }}>
          Running
        </button>
      );
    } else if (emrResponse.glueStatus == "STOPPING") {
      return (
        <button className="btn btn-warning" style={{ width: "105px" }}>
          Stopping
        </button>
      );
    } else if (emrResponse.glueStatus == "STOPPED") {
      return (
        <button className="btn btn-secondary" style={{ width: "105px" }}>
          Stopped
        </button>
      );
    } else if (emrResponse.glueStatus == "SUCCEEDED") {
      return (
        <button className="btn btn-success" style={{ width: "105px" }}>
          Success
        </button>
      );
    } else if (emrResponse.glueStatus == "FAILED") {
      return (
        <button className="btn btn-danger" style={{ width: "105px" }}>
          Failed
        </button>
      );
    } else if (emrResponse.glueStatus == "TIMEOUT") {
      return (
        <button className="btn btn-danger" style={{ width: "105px" }}>
          Timeout
        </button>
      );
    } else if (emrResponse.glueStatus == "ERROR") {
      return (
        <button className="btn btn-danger" style={{ width: "105px" }}>
          Error
        </button>
      );
    } else if (emrResponse.glueStatus == "WAITING") {
      return (
        <button className="btn btn-light" style={{ width: "105px" }}>
          Waiting
        </button>
      );
    } else {
      return (
        <button className="btn btn-secondary" style={{ width: "105px" }}>
          Completed
        </button>
      );
    }
  };

  return (
    <div className="container mt-5">
      <h5>
        {/* payer - {selected} , url - {urlvalues}
        {lambdaResponse.statusCode} */}
        {/* <button className="btn btn-secondary" onClick={getLambdaResponse}>
          getStatus
        </button> */}
        {/* {isSuccess()} */}
      </h5>
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
        <div className="col-md-6 offset-md-1" style={{ marginLeft: "20px" }}>
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
            onChange={hancleInputChange}
          >
            <option style={{ fontWeight: "bold", fontStyle: "italic" }}>
              {urlvalues}
            </option>
          </select>
        </div>
        <div
          className="col-md-1 offset-md-1 mt-3"
          style={{ marginLeft: "20px" }}
        >
          <button
            type="button"
            className="btn btn-secondary mt-2"
            onClick={postMethos}
          >
            RUN
          </button>
        </div>
        <div className="col-md-1 mt-3">
          <button className="btn btn-secondary mt-2" onClick={getEMRStatus}>
            <i class="fa fa-refresh" aria-hidden="true"></i>
          </button>
        </div>
      </div>
      <div className="container">
        <table
          className="table container mt-3"
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
                SI NO
              </th>
              <th scope="col">Steps</th>
              <th scope="col">Description</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* <tr>
              <td style={{ textAlign: "center" }}>1</td>
              <td>Lambda Function(Crawler)</td>
              <td>Extracts the url and create EMR cluster</td>
              <td>
                {isSuccess()}
              </td>
            </tr> */}
            <tr>
              <td style={{ textAlign: "center" }}>1</td>
              <td>EC2(Crawler)</td>
              <td>Crawl the website and get the Index URL</td>
              <td>
                {/* <i class="fa fa-spinner" aria-hidden="true"></i> */}
                {isEC2DedicatedStatus()}
                {/* <i
                  style={{ marginLeft: "20px", color: "blue" }}
                  className="fa-solid fa-arrow-right-to-bracket"
                ></i> */}
              </td>
            </tr>
            {/* <tr>
              <td style={{ textAlign: "center" }}>2</td>
              <td>EC2(Slave Instance)</td>
              <td>GetFile Details and start EMR</td>
              <td> */}
            {/* <i class="fa fa-spinner" aria-hidden="true"></i> */}
            {/* {isEC2Status()} */}
            {/* <i
                  style={{ marginLeft: "20px", color: "blue" }}
                  className="fa-solid fa-arrow-right-to-bracket"
                ></i> */}
            {/* </td>
            </tr> */}
            <tr>
              <td style={{ textAlign: "center" }}>3</td>
              <td>EMR(MapReduce)</td>
              <td>Flatten the Complex Json file</td>
              <td>
                {/* <i class="fa fa-spinner" aria-hidden="true"></i> */}
                {isStatus()}
                {/* <i
                  style={{ marginLeft: "20px", color: "blue" }}
                  className="fa-solid fa-arrow-right-to-bracket"
                ></i> */}
              </td>
            </tr>
            {/* <tr>
              <td style={{ textAlign: "center" }}>4</td>
              <td>S3</td>
              <td>Store the flattened file data</td>
              <td>
                <button
                  type="button"
                  className="btn btn-success"
                  style={{ width: "105px" }}
                >
                  Success
                </button>
              </td>
            </tr> */}
            <tr>
              <td style={{ textAlign: "center" }}>4</td>
              <td>Glue Job</td>
              <td>Move S3 data to the Redshift</td>
              <td>
                {/* <i className="fa fa-spinner" aria-hidden="true"></i> */}
                {isGlueStatus()}
                {/* <i
                  style={{ marginLeft: "20px", color: "blue" }}
                  className="fa-solid fa-arrow-right-to-bracket"
                ></i> */}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
