import React, { useState } from "react";
import axios from "axios";
import { Navigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TriangleAlert } from "lucide-react";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [fullname, setFullname] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);

  if (isRegistered) {
    return <Navigate to="/login" />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post(
        "https://api-tekkomfess.vercel.app/api/auth/register",
        { email, fullname, password }
      );

      const data = response.data;

      if (data.statusCode === 201) {
        setIsRegistered(true);
        toast.success("Registration successful! Please login.", {
          autoClose: 5000,
        });
      } else {
        setError(data.message);
        toast.error(data.message || "Registration failed!", {
          autoClose: 5000,
        });
      }
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message || "Registration failed");
        toast.error(error.response.data.message || "Registration failed!", {
          autoClose: 5000,
        });
      } else {
        setError("Network error");
        toast.error("Registration failed!", {
          autoClose: 5000,
        });
      }
    }
  };

  return (
    <div className="flex items-center justify-center h-[80vh] px-5">
      <div className="space-y-4">
        <div className="space-y-2">
          <h1 className="text-2xl font-bold">Register</h1>
          <p className="text-[#737373]">Create your account</p>
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
            type="text"
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
            placeholder="Full Name"
            required
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#0288d1]"
          />
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
            Register
          </button>
          <p className="text-[#737373] text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-[#0288d1] hover:underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
