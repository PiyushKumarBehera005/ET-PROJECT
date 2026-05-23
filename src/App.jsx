import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import ManageUsers from "./pages/ManageUsers";
import ManageVehicles from "./pages/ManageVehicles";
import ManageCompanies from "./pages/ManageCompanies";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/users" element={<ManageUsers />} />
        <Route path="/vehicles" element={<ManageVehicles />} />
        <Route path="/companies" element={<ManageCompanies />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;