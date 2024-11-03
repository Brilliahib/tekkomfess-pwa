import React from "react";
import "./App.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import BottomNavigation from "./components/atoms/navbar/BottomNavigation";
import MenfessPage from "./pages/MenfessPage";
import AccountPage from "./pages/AccountPage";
import LoginPage from "./pages/LoginPage";
import ProtectedRoute from "./components/molecules/guard/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="App mx-auto overflow-hidden overflow-y-auto mb-[55px] max-w-[430px]">
      <Router>
        <AuthProvider>
          <BottomNavigation />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/menfess" element={<MenfessPage />} />
            <Route path="/login" element={<LoginPage />} />
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
