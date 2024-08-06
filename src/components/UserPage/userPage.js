import React from "react";
import { useNavigate } from "react-router-dom";
import "./userPage.css";

const UserPage = () => {
  const Navigate = useNavigate();
  return (
    <div className="userPageContainer">
      <h1>Register Your Pokemon</h1>
      <button
        onClick={() => Navigate("/Registration")}
        className="usePageButton"
      >
        Add Pokemon
      </button>
    </div>
  );
};

export default UserPage;
