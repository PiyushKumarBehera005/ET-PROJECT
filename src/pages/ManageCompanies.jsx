/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";
import axios from "axios";

export default function ManageCompanies() {
  const [companies, setCompanies] = useState([]);

  // ✅ ONLY USE THESE (remove confusion)
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [editingId, setEditingId] = useState(null);

  // ================= FETCH =================
  const fetchCompanies = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/companies");
      setCompanies(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  // ================= ADD =================
  const addCompany = async () => {
    if (!companyName || !email || !password) {
      alert("Fill all fields");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/companies", {
        companyName,
        email,
        password,
      });

      setCompanyName("");
      setEmail("");
      setPassword("");

      fetchCompanies();
    } catch (err) {
  console.log(err.response?.data);

  alert(err.response?.data?.message || "Error adding company");
}
  };

  // ================= EDIT =================
  const editCompany = (c) => {
    setCompanyName(c.companyName);
    setEmail(c.email);
    setPassword(""); // don't preload password
    setEditingId(c._id);
  };

  // ================= UPDATE =================
  const updateCompany = async () => {
    try {
      await axios.put(
        `http://localhost:5000/api/companies/${editingId}`,
        {
          companyName,
          email,
          ...(password && { password }) // only send if entered
        }
      );

      setEditingId(null);
      setCompanyName("");
      setEmail("");
      setPassword("");

      fetchCompanies();
    } catch (err) {
      console.log(err);
    }
  };

  // ================= DELETE =================
  const deleteCompany = async (id) => {
    await axios.delete(`http://localhost:5000/api/companies/${id}`);
    fetchCompanies();
  };

  return (
    <div className="page">
      <h2>Manage Companies</h2>

      {/* ===== INPUTS ===== */}
      <input
        placeholder="Company Name"
        value={companyName}
        onChange={(e) => setCompanyName(e.target.value)}
      />

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={editingId ? updateCompany : addCompany}>
        {editingId ? "Update Company" : "Add Company"}
      </button>

      {/* ===== TABLE ===== */}
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Company Name</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {companies.map((c) => (
              <tr key={c._id}>
                <td>{c.companyName}</td>
                <td>{c.email}</td>

                <td>
                  <span
                    className="action-btn"
                    onClick={() => editCompany(c)}
                  >
                    ✏️
                  </span>

                  <span
                    className="action-btn"
                    onClick={() => deleteCompany(c._id)}
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