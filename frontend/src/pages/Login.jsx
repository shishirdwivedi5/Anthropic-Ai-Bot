import { useState , useContext } from "react";
import { UserContext } from "../context/usercontext.jsx";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";
import axios from "axios";
import { toast } from "react-toastify";



export default function Login() {

  const { setUser } = useContext(UserContext);
 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    setEmail("");
    setPassword("");

    try {
      // Validate input
      if (!email || !password) {
        setError("Please fill in all fields");
        setLoading(false);
        return;
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        setError("Please enter a valid email");
        setLoading(false);
        return;
      }

      // API call to backend
      await axios
        .post(
          "https://anthropic-ai-bot.onrender.com/auth/login",
          {
            email: email,
            password: password,
          },
          {
            withCredentials: true,
          },
        )
        .then((res) => {

          if (!res.data.user) {
            setError("Invalid email or password");
            setLoading(false);
            return;
          }
          toast.success(res.data.message);
           setUser(res.data.user);
          navigate("/");
        })
        .catch((err) => {
          console.log("login Api error ", err);
          toast.error("Login Failed");
        });
    } catch (err) {
      setError("An error occurred. Please try again.");
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-wrapper">
        <div className="login-card">
          {/* Header */}
          <div className="login-header">
            <h1>Welcome Back</h1>
            <p>Sign in to your account</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="login-form">
            {/* Error Message */}
            {error && <div className="error-message">{error}</div>}

            {/* Email Field */}
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-input"
                disabled={loading}
              />
            </div>

            {/* Password Field */}
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-input"
                disabled={loading}
              />
            </div>

            {/* Forgot Password Link */}
            {/* <Link to="#" className="forgot-password">
              Forgot password?
            </Link> */}

            {/* Submit Button */}
            <button type="submit" className="login-button" disabled={loading}>
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          {/* Divider */}
          {/* <div className="divider">
            <span>Don't have an account?</span>
          </div> */}

          {/* Register Link */}
          <Link to="/register" className="register-link">
            Create new account
          </Link>
        </div>

        {/* Decorative Elements */}
        <div className="decoration-circle decoration-circle-1"></div>
        <div className="decoration-circle decoration-circle-2"></div>
      </div>
    </div>
  );
}
