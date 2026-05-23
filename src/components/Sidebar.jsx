import React from "react";

export default function Sidebar({ setPage }) {
  return (
    <div className="sidebar">
      <h2>AgriAdmin</h2>
      <ul>
        <li onClick={() => setPage("dashboard")}>Dashboard</li>
        <li onClick={() => setPage("users")}>Manage Users</li>
        <li onClick={() => setPage("vehicles")}>Manage Vehicles</li>
        <li onClick={() => setPage("companies")}>Manage Companies</li>
      </ul>
    </div>
  );
}