import React from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const displayName = localStorage.getItem("displayName");
  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };
  return (
    <div className="header">
      <p>Welcome, {displayName}</p>
      <button className="styleButton" onClick={handleLogout}>
        Log Out
      </button>
    </div>
  );
};

export default Header;
