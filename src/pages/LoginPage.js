import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { Link, Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TriangleAlert } from "lucide-react";

const LoginPage = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { user } = useAuth();

  if (user) {
    return <Navigate to="/account" />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post(
        "https://api-tekkomfess.vercel.app/api/auth/login",
        { email, password }
      );

      const data = response.data;

      if (data.statusCode === 200) {
        login(data.token);
        toast.success("Login successful!", {
          autoClose: 5000,
        });
      } else {
        setError(data.message);
        toast.error(data.message || "Login failed!", {
          autoClose: 5000,
        });
      }
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message || "Login failed");
        toast.error(error.response.data.message || "Login failed!", {
          autoClose: 5000,
        });
      } else {
        setError("Network error");
        toast.error("Login failed!", {
          autoClose: 5000,
        });
      }
    }
  };

  return (
    <div className="flex items-center justify-center h-[80vh] px-5">
      <div className="space-y-4">
        <div className="space-y-2">
          <h1 className="text-2xl font-bold">Login</h1>
          <p className="text-[#737373]">Please login with your account</p>
        </div>
        {error && (
          <div className="border border-red-600 bg-red-300/20 px-4 py-4 flex items-center gap-2 rounded-md">
            <TriangleAlert className="h-5 w-5 text-red-600" />
            <div className="space-y-2">
              <p className="text-red-600 text-left text-sm">{error}</p>
            </div>
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#0288d1]"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#0288d1]"
          />
          <button
            type="submit"
            className="w-full p-2 bg-[#0288d1] text-white rounded-md hover:bg-[#0288d1]/80 transition font-semibold"
          >
            Login
          </button>
          <p className="text-[#737373] text-center">
            Dont have account?{" "}
            <Link to="/register" className="text-[#0288d1] hover:underline">
              Register now
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
