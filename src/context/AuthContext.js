import { jwtDecode } from "jwt-decode";
import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate jika menggunakan React Router
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Inisialisasi useNavigate

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      const decoded = jwtDecode(savedToken);
      const isExpired = Date.now() >= decoded.exp * 1000;

      if (isExpired) {
        console.log("Token expired, logging out...");
        logout(); // Hapus token dan arahkan ke halaman login
        navigate("/login"); // Arahkan pengguna ke halaman login
      } else {
        setUser(decoded);
        setToken(savedToken);
      }
    }
    setLoading(false);
  }, [navigate]);

  const login = async (newToken) => {
    try {
      const decoded = jwtDecode(newToken);
      setToken(newToken);
      setUser(decoded);
      localStorage.setItem("token", newToken);
    } catch (error) {
      console.error("Error decoding token:", error);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};