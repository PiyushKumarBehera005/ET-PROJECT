/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";
import axios from "axios";

export default function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [editingId, setEditingId] = useState(null);

  const fetchUsers = async () => {
    const res = await axios.get("http://localhost:5000/api/users");
    setUsers(res.data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const addUser = async () => {
    if (!name || !email || !password) return;

    await axios.post("http://localhost:5000/api/users", {
      name,
      email,
      password,
    });

    setName("");
    setEmail("");
    setPassword("");
    fetchUsers();
  };

  const updateUser = async () => {
    if (!name || !email) return;

    const updateData = { name, email };
    if (password) updateData.password = password;

    await axios.put(
      `http://localhost:5000/api/users/${editingId}`,
      updateData
    );

    setName("");
    setEmail("");
    setPassword("");
    setEditingId(null);

    fetchUsers();
  };

  const deleteUser = async (id) => {
    await axios.delete(`http://localhost:5000/api/users/${id}`);
    fetchUsers();
  };

  return (
    <div className="page">
      <h2>Manage Users</h2>

      <input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={editingId ? updateUser : addUser}>
        {editingId ? "Update User" : "Add User"}
      </button>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {users.map((u) => (
              <tr key={u._id}>
                <td>{u.name}</td>
                <td>{u.email}</td>

                <td>
                  <span
                    className="action-btn"
                    onClick={() => {
                      setName(u.name);
                      setEmail(u.email);
                      setPassword("");
                      setEditingId(u._id);
                    }}
                  >
                    ✏️
                  </span>

                  <span
                    className="action-btn"
                    onClick={() => deleteUser(u._id)}
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