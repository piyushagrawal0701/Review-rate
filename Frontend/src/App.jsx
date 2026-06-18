import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import CompanyDetails from "./pages/CompanyDetails";
import Navbar from "./components/common/Navbar";
import { Toaster } from "react-hot-toast";
import Footer from "./components/common/Footer";

function App() {
  return (
    <>
      <Navbar />
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/company/:id" element={<CompanyDetails />} />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
