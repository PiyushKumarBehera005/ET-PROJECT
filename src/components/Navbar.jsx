import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="navbar">
      <div className="logo">
        <span>AG</span> AgriRent
      </div>

      <div className="nav-links">
        <Link to="/">Dashboard</Link>
        <Link to="/users">Users</Link>
        <Link to="/vehicles">Vehicles</Link>
        <Link to="/companies">Companies</Link>
      </div>

      <div style={{ color: "#2ecc71" }}>
        📞 1-800-AGRI-RENT
      </div>
    </div>
  );
}
