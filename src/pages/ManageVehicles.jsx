/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";
import axios from "axios";

export default function ManageVehicles() {
  const [vehicles, setVehicles] = useState([]);
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [price, setPrice] = useState("");
  const [editingId, setEditingId] = useState(null);

  const fetchVehicles = async () => {
    const res = await axios.get("http://localhost:5000/api/vehicles");
    setVehicles(res.data);
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  const addVehicle = async () => {
    await axios.post("http://localhost:5000/api/vehicles", {
      name,
      company,
      price,
    });
    setName("");
    setCompany("");
    setPrice("");
    fetchVehicles();
  };

  const editVehicle = (v) => {
    setName(v.name);
    setCompany(v.company);
    setPrice(v.price);
    setEditingId(v._id);
  };

  const updateVehicle = async () => {
    await axios.put(`http://localhost:5000/api/vehicles/${editingId}`, {
      name,
      company,
      price,
    });
    setEditingId(null);
    setName("");
    setCompany("");
    setPrice("");
    fetchVehicles();
  };

  const deleteVehicle = async (id) => {
    await axios.delete(`http://localhost:5000/api/vehicles/${id}`);
    fetchVehicles();
  };

  return (
    <div className="page"> {/* ✅ ADDED */}
      <h2>Manage Vehicles</h2>

      {/* ✅ ADDED FORM WRAPPER */}
      <div className="form-row">
        <input
          placeholder="Vehicle Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          placeholder="Company"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />

        <input
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <button onClick={editingId ? updateVehicle : addVehicle}>
          {editingId ? "Update Vehicle" : "Add Vehicle"}
        </button>
      </div>

      {/* ✅ ADDED TABLE CONTAINER */}
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Company</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {vehicles.map((v) => (
              <tr key={v._id}>
                <td>{v.name}</td>
                <td>{v.company}</td>
                <td>{v.price}</td>
                <td>
  <span
    className="action-btn"
    onClick={() => editVehicle(v)}
  >
    ✏️
  </span>

  <span
    className="action-btn"
    onClick={() => deleteVehicle(v._id)}
  >
    🗑️
  </span>
</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}