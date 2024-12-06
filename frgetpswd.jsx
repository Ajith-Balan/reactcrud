import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const StfFpPwd = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate(); // Correct usage of useNavigate hook

  // Function to handle email submission
  const handleEmailSubmit = async () => {
    try {
      const res = await axios.post("http://localhost:3000/api/stffpwd", { email });
      setMessage("OTP sent to your email");
    } catch (err) {
      setMessage("Failed to send OTP. Please try again.");
    }
  };

  // Function to handle OTP verification
  const handleOtpSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:3000/api/sotpverify", { email, otp });
      setMessage(res.data.msg);

      // Navigate to staff page on successful OTP verification
      if (res.status === 200) {
        navigate(`/staffpage/${email}`);
      }
    } catch (err) {
      setMessage(err.response?.data?.msg || "OTP verification failed. Please try again.");
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100 bg-light">
      <div className="card p-4 shadow w-100" style={{ maxWidth: "400px" }}>
        <h2 className="text-center mb-4">Password Reset</h2>

        {/* Email Input Section */}
        <div className="mb-4">
          <label htmlFor="email" className="form-label">Enter your email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-control"
            placeholder="Enter your email"
            required
          />
          <button
            onClick={handleEmailSubmit}
            className="btn btn-primary w-100 mt-3"
          >
            Get OTP
          </button>
        </div>

        {/* OTP Input Section */}
        <form onSubmit={handleOtpSubmit}>
          <div className="mb-4">
            <label htmlFor="otp" className="form-label">OTP</label>
            <input
              type="text"
              id="otp"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="form-control"
              placeholder="Enter OTP"
              required
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary w-100"
          >
            Verify OTP
          </button>
        </form>

        {/* Message Section */}
        {message && (
          <div
            className={`alert mt-4 ${
              message.includes("success") ? "alert-success" : "alert-danger"
            }`}
            role="alert"
          >
            {message}
          </div>
        )}
      </div>
    </div>
  );
};

export default StfFpPwd;
