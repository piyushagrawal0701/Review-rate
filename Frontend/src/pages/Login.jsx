import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { loginUser } from "../services/authService";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

const Login = () => {
  const navigate = useNavigate();

  const { login } = useAuth();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const data = await loginUser(formData);
      toast.success("Login Successfully");

      login(data);

      navigate("/");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-70px)] bg-[#f5f5f5] flex items-center justify-center px-4">

      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">

        <h1 className="text-4xl font-bold text-center mb-8">
          Login
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            onChange={handleChange}
            className="w-full h-12 border border-gray-300 rounded-lg px-4 outline-none focus:border-purple-500"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            className="w-full h-12 border border-gray-300 rounded-lg px-4 outline-none focus:border-purple-500"
          />

          <button
            disabled={loading}
            className="w-full h-12 rounded-lg text-white font-medium bg-gradient-to-r from-fuchsia-600 to-blue-700"
          >
            {loading ? "Please Wait..." : "Login"}
          </button>
        </form>

        <p className="text-center mt-6 text-gray-600">
          Don't have an account?

          <Link
            to="/register"
            className="text-purple-600 ml-2 font-medium"
          >
            Register
          </Link>
        </p>

      </div>

    </div>
  );
};

export default Login;