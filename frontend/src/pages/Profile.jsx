
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/usercontext.jsx";
import axios from "axios";
import "./Profile.css";

export default function Profile() {
  async function logout() {
    try {
      await axios
        .get("https://anthropic-ai-bot.onrender.com/auth/logout", {
          withCredentials: true,
        })
        .then((res) => {
          console.log("logout api response ", res);
          navigate("/login");
        });
    } catch (err) {
      console.log("logout api error ", err);
    }
  }

  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  return (
    <div className="profile-container">
      <div className="profile-wrapper">
        <div className="profile-card">
          {/* Header */}
          <div className="profile-header">
            <h1>User Profile</h1>
          </div>

          {/* Profile Content */}
          <div className="profile-content">
            <div className="profile-avatar">👤</div>
            <h2 className="profile-name">{user.firstName}</h2>

            <div className="profile-info">
              <div className="info-item">
                <label>Email</label>
                <p>{user.email}</p>
              </div>
              <div className="info-item">
                <label>_id</label>
                <p>{user._id}</p>
              </div>
            </div>

            <div className="profile-actions">
              {/* <button className="btn btn-secondary">Edit Profile</button> */}
              <button
                className="btn btn-danger"
                onClick={() => {
                  logout();
                }}
              >
                Logout
              </button>
              <button className="btn btn-back" onClick={() => navigate("/")}>
                Back to Chat
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
