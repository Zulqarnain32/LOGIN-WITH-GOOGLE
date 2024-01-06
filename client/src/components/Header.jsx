import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Header = () => {
  const [userData, setUserData] = useState();

  const getUserData = () => {
    axios
      .get("http://localhost:5000/login/success", { withCredentials: true })
      .then((result) => {
        console.log(result.data.message.displayName);
        console.log(result.data.message.email);
        console.log(result.data.message.googleId);
        setUserData(result.data.message);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <>
      <div className="navbar">
        <div className="logo-side">CodeWithMe</div>

        <div className="links-side">
          <Link className="nav-link" to="/">
            Home
          </Link>
          <Link className="nav-link" to="/dashboard">
            Dashboard
          </Link>
          <Link className="nav-link" to="/login">
            Login
          </Link>

          {userData ? (
            <>
              <Link className="nav-link">{userData.displayName}</Link>
            </>
          ) : (
            <span>Loading user data...</span>
          )}

          {userData ? (
            <>
              <Link className="nav-link">
                <img src={userData.image} alt="image" />
              </Link>
            </>
          ) : (
            <span>Loading user data...</span>
          )}
        </div>
      </div>
    </>
  );
};

export default Header;
