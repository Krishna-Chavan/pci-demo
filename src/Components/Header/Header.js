import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <nav
      className="navbar navbar-expand-lg"
      style={{ backgroundColor: "#e3f2fd" }}
    >
      <div className="container-fluid">
        <Link
          className="navbar-brand"
          to="/"
          style={{ fontWeight: "bold", fontStyle: "italic" }}
        >
          AWSCloud
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        {/* <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item">
              <Link class="nav-link active" aria-current="page" to="/home">
                Pipelines
              </Link>
            </li>
          </ul>
        </div> */}
        <Link
          className="navbar-brand d-flex"
          to="/"
          style={{ fontWeight: "bold" }}
        >
          PCI-Solutions
        </Link>
      </div>
    </nav>
  );
}
