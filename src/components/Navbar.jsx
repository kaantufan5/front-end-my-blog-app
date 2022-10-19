import React from "react";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import ktlogo from "../assets/cw.jpeg";

import { AuthContext } from "../contexts/AuthContext";
import { BlogContext } from "../contexts/BlogContext";

const Navbar = () => {
  const navigate = useNavigate();
  const {logOut} = useContext(AuthContext);
  const {getUserState} = useContext(BlogContext);
  const getKey = localStorage.getItem('currentUserToken')


  return (
    <div>
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <Link to="/" className="ana-baslik navbar-brand text-white pt-3">
            <img className="ktlogo" src={ktlogo} alt="kaantufanLogo" height={"80px"} />
          </Link>
          <div className="d-flex text-white align-items-center">
            {getKey ? (
              <div className="blog-new-logout-btn">
                <h5 className="mb-0 text-capitalize blog-username">
                  <Link to="/profile" className="text-white">
                    {getUserState.username}
                  </Link>
                </h5>
                <button
                  className="ms-2 btn btn-success"
                  onClick={() => navigate("/newblog")}
                >
                  New Blog
                </button>
                <button
                  className="ms-2 btn btn-danger"
                  onClick={() => logOut(navigate)}
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="blog-login-reg">
                <button
                  className="ms-2 btn btn-outline-light"
                  onClick={() => navigate("/login")}
                >
                  Login
                </button>
                <button
                  className="ms-2 btn btn-outline-light"
                  onClick={() => navigate("/register")}
                >
                  Register
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
