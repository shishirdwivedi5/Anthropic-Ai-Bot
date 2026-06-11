import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Register.css";
import axios from "axios";
import { toast } from "react-toastify";
export default function Register() {
  const [formData, setFormData] = useState({
    firstName: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    // console.log("line19 ", e);
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    setFormData("")

    try {
      // Validate input
      if (!formData.firstName || !formData.email || !formData.password) {
        setError("Please fill in all fields");
        setLoading(false);
        return;
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        setError("Please enter a valid email");
        setLoading(false);
        return;
      }

      // Password validation
      if (formData.password.length < 6) {
        setError("Password must be at least 6 characters");
        setLoading(false);
        return;
      }

      // API call to backend
      await axios
        .post(
          "http://localhost:3000/auth/register",
          {
            firstName: formData.firstName,
            email: formData.email,
            password: formData.password,
          },
          { withCredentials: true },
        )
        .then((res) => {
          console.log("line 63 ", res.data);
          toast.success("Registration Successful");
          navigate("/login");
        })
        .catch((err) => {
          console.log("line 65 ", err);
          toast.error("Registration Failed");
        });
        
    } catch (err) {
      setError("An error occurred. Please try again.");
      console.error("Registration error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <div className="register-wrapper">
        <div className="register-card">
          {/* Header */}
          <div className="register-header">
            <h1>Create Account</h1>
            <p>Join us today</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="register-form">
            {/* Error Message */}
            {error && <div className="error-message">{error}</div>}

            {/* First Name Field */}
            <div className="form-group">
              <label htmlFor="firstName">First Name</label>
              <input
                id="firstName"
                type="text"
                name="firstName"
                placeholder="Enter your first name"
                value={formData.firstName}
                onChange={handleChange}
                className="form-input"
                disabled={loading}
              />
            </div>

            {/* Email Field */}
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                id="email"
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
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
                name="password"
                placeholder="Create a password"
                value={formData.password}
                onChange={handleChange}
                className="form-input"
                disabled={loading}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="register-button"
              disabled={loading}
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          {/* Divider */}
          {/* <div className="divider">
            <span>Already have an account?</span>
          </div> */}

          {/* Login Link */}
          <Link to="/login" className="login-link">
            Sign in here
          </Link>
        </div>

        {/* Decorative Elements */}
        <div className="decoration-circle decoration-circle-1"></div>
        <div className="decoration-circle decoration-circle-2"></div>
      </div>
    </div>
  );
}
