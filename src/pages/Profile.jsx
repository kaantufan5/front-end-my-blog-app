import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import emptyProfile from "../assets/Default-Profile.png"
import { BlogContext } from '../contexts/BlogContext'



const Profile = () => {
  const { getUserState, postUser } = useContext(BlogContext);
  const getKey = localStorage.getItem('currentUserToken')
  const [profileUsername, setProfileUsername] = useState()
  const [profileFirstName, setProfileFirstName] = useState()
  const [profileLastName, setProfileLastName] = useState()

  const editProfile = () => {
    postUser(profileUsername, profileFirstName, profileLastName);
  };

  const navigate = useNavigate();

  return (
    <div>
      {getKey ? (
        <div className="container mt-4">
        <div className="row d-flex justify-content-center">
          <div className="col-md-7">
              <div
                className="card p-3 py-4"
                style={{ backgroundColor: "#e6e3db" }}
              >
                <div className="text-center">
                    <img
                    src={emptyProfile}
                    width="150"
                    alt="profilePNG"
                    className="rounded-circle"
                    />
                </div>
                <div className="text-center mt-3">
                  <h2 className="mt-2 mb-0">
                    {getUserState.username
                      ? getUserState.username
                      : "Kullanıcı Adı Bulunamadı!"}
                  </h2>
                  <hr />
  
                  <div className="px-4 mt-3">
                    <h5 className="text-align-left">Email</h5>
                    <p>{getUserState.email ? getUserState.email : "Bulunamadı"}</p>
                  </div>
  
                  <div className="px-4 mt-3">
                    <h5 className="text-align-left">First Name</h5>
                    <p>{getUserState.first_name ? getUserState.first_name : "Bulunamadı"}</p>
                  </div>
  
                  <div className="px-4 mt-3">
                    <h5 className="text-align-left">Last Name</h5>
                    <p>{getUserState.last_name ? getUserState.last_name : "Bulunamadı"}</p>
                  </div>
  
  
  
                  <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div className="modal-dialog" role="document">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title text-dark h3" id="exampleModalLabel">Edit Profile</h5>
          <button type="button" className="close bg-danger edit-close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true" className="font">&times;</span>
          </button>
        </div>
        <div className="modal-body">
          <form>
            <div className="form-group">
              <label htmlFor="recipient-name" className="col-form-label text-dark">Username:</label>
              <input type="text" onChange={(e) => setProfileUsername(e.target.value)} name="username"className="form-control"id="recipient-name"/>
            </div>
            <div className="form-group">
              <label htmlFor="recipient-name" className="col-form-label text-dark">First Name:</label>
              <input type="text" onChange={(e) => setProfileFirstName(e.target.value)} name="firstname"className="form-control"id="recipient-name"/>
            </div>
            <div className="form-group">
              <label htmlFor="recipient-name" className="col-form-label text-dark">Last Name:</label>
              <input type="text" onChange={(e) => setProfileLastName(e.target.value)} name="lastname"className="form-control"id="recipient-name"/>
            </div>
          </form>
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
          <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={editProfile}>Edit Profile</button>
        </div>
      </div>
    </div>
  </div>
                  <div className="buttons-profile">
                    <Link to="/">
                      <button
                        className="btn btn-primary home-btn"
                      >
                        Home
                      </button>
                    </Link>      
                  </div>
  
                  <button
                  className="btn btn-warning reset-btn-blog"
                  type="button" 
                  data-toggle="modal" 
                  data-target="#exampleModal"
                  >
                  Edit Profile
                  </button> 
                </div>
              </div>
          </div>
        </div>
      </div>
      ) : (
        <div>
    <div className="card p-3 py-4" style={{ backgroundColor: "#e6e3db" }}>
          <h2 className="text-center">Profile not found</h2>
          <hr />
          <div className="text-center">
              <button
                className="btn btn-primary px-4 ms-1"
                onClick={() => navigate("/login")}
                style={{ backgroundColor: "#0b022d" }}
              >
                Login
              </button>

            <hr />

              <button
                className="btn btn-primary px-4 ms-1"
                onClick={() => navigate("/register")}
                style={{ backgroundColor: "#0b022d" }}
              >
                Register
              </button>
          </div>
        </div>
  </div>
      )
    }
    </div>
  );
};

export default Profile;
