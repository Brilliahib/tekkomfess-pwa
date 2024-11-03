import React from "react";
import "./App.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import BottomNavigation from "./components/atoms/navbar/BottomNavigation";
import MenfessPage from "./pages/MenfessPage";
import AccountPage from "./pages/AccountPage";

function App() {
  return (
    <div className="App mx-auto overflow-hidden overflow-y-auto mb-[55px] max-w-[430px]">
      <Router>
        <BottomNavigation />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/menfess" element={<MenfessPage />} />
          <Route path="/account" element={<AccountPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
