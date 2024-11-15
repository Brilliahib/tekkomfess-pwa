import React from "react";
import "./App.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import BottomNavigation from "./components/atoms/navbar/BottomNavigation";

import AccountPage from "./pages/AccountPage";
import LoginPage from "./pages/LoginPage";
import ProtectedRoute from "./components/molecules/guard/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DetailPage from "./pages/DetailMenfessPage";
import CreateMenfessPage from "./pages/CreateMenfessPage";
import RegisterPage from "./pages/RegisterPage";
import UserPage from "./pages/UserPage";
import DetailUserPage from "./pages/DetailUserPage";

function App() {
  return (
    <div className="App mx-auto overflow-hidden overflow-y-auto mb-[55px] max-w-[430px]">
      <Router>
        <AuthProvider>
          <BottomNavigation />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/menfess/create"
              element={<ProtectedRoute element={<CreateMenfessPage />} />}
            />
            <Route path="/menfess/:id" element={<DetailPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/users" element={<UserPage />} />
            <Route path="/users/:id" element={<DetailUserPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route
              path="/account"
              element={<ProtectedRoute element={<AccountPage />} />}
            />
          </Routes>
          <ToastContainer />
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
