import { useEffect, useState } from "react";
import axios from "axios";

export default function Dashboard() {
  const [users, setUsers] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersRes, vehiclesRes, companiesRes] = await Promise.all([
          axios.get("http://localhost:5000/api/users"),
          axios.get("http://localhost:5000/api/vehicles"),
          axios.get("http://localhost:5000/api/companies"),
        ]);

        setUsers(usersRes.data);
        setVehicles(vehiclesRes.data);
        setCompanies(companiesRes.data);
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <h2>Loading...</h2>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>Admin Dashboard</h1>

      <div style={{
        display: "flex",
        gap: "20px",
        marginTop: "20px"
      }}>
        
        <div style={cardStyle}>
          <h3>Total Users</h3>
          <p>{users.length}</p>
        </div>

        <div style={cardStyle}>
          <h3>Total Vehicles</h3>
          <p>{vehicles.length}</p>
        </div>

        <div style={cardStyle}>
          <h3>Total Companies</h3>
          <p>{companies.length}</p>
        </div>

      </div>
    </div>
  );
}

// simple styling so it doesn’t look like 2005
const cardStyle = {
  padding: "20px",
  background: "#3f7e34",
  color: "white",
  borderRadius: "10px",
  minWidth: "150px",
  textAlign: "center",
};