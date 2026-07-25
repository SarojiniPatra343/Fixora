import React from "react";
import "./ProviderHome.css";
import { useNavigate } from "react-router-dom";

function ProviderHome() {
  const navigate = useNavigate();

  return (
    <div className="provider-home">
      {/* Header */}
      <div className="provider-header">
        <h1>Provider Dashboard</h1>
        <p>Manage your services and sub-services easily</p>
      </div>

      {/* Cards Section */}
      <div className="card-container">

        <div className="card" onClick={() => navigate("/provider/all-subservice")}>
          <h2>All Sub Services</h2>
          <p>View, edit and manage all sub-services</p>
        </div>

        <div className="card" onClick={() => navigate("/provider/create-subservice")}>
          <h2>Create Sub Service</h2>
          <p>Add new service offerings</p>
        </div>

        <div className="card" onClick={() => navigate("/provider/profile")}>
          <h2>Profile</h2>
          <p>Update provider details</p>
        </div>

        <div className="card" onClick={() => navigate("/provider/settings")}>
          <h2>Settings</h2>
          <p>Manage account settings</p>
        </div>

      </div>
    </div>
  );
}

export default ProviderHome;