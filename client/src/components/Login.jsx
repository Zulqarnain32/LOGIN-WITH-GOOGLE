import React from "react";

const Login = () => {
  
  const openWithGoogle = () => {
    window.open("http://localhost:5000/auth/google/callback","_self")
  }

  return (
    <>
      <div className="login-container">
        <div className="login-box">
          <h1 className="login-heading">Login</h1>
          <form>
            <h3>Email</h3>
            <input
              type="text"
              placeholder="Enter Email"
              className="login-input"
            />
            <h3>Password</h3>
            <input
              type="password"
              placeholder="Enter Password"
              className="login-input"
            />
            <button className="login-btn">
              Login
            </button>
          </form>
          <div className="google-login" onClick={openWithGoogle}>
            Sign in With Google
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;

