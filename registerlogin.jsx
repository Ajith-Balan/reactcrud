import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function AdminLogin() {
  const navigate = useNavigate();

  const [admin, setUser] = useState({
    name: '',
    email: '',
    number: '',
    username: '',
    password: '',
    cpassword: '',
  });

  const [loginUser, setLoginUser] = useState({
    email: '',
    password: '',
  });

  const signUp = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3000/api/adminregister', admin);
      if (res.status === 201) {
        alert('Sign up successful');
      }
    } catch (error) {
      alert('Sign up failed. Please try again.');
    }
  };

  const signIn = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3000/api/adminlogin', loginUser);
      if (res.status === 200) {
        navigate('/adminhome');
      }
    } catch (error) {
      alert('Sign in failed. Please check your credentials and try again.');
    }
  };

  const handleChange = (e) => {
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleChange2 = (e) => {
    setLoginUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const [isAdminSignIn, setIsAdminSignIn] = useState(true);

  return (
    <div className="d-flex flex-column min-vh-100 bg-light">
      {/* Navigation */}
      <nav className="navbar navbar-dark bg-primary fixed-top">
        <div className="container">
          <Link to="/" className="navbar-brand">
            HOME
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container d-flex flex-column align-items-center justify-content-center py-5" style={{ marginTop: '4rem' }}>
        <h1 className="text-center mb-4">Sign In / Sign Up</h1>

        {/* Toggle Buttons */}
        <div className="btn-group mb-4">
          <button
            className={`btn ${isAdminSignIn ? 'btn-success' : 'btn-outline-secondary'}`}
            onClick={() => setIsAdminSignIn(true)}
          >
            Admin Sign In
          </button>
          <button
            className={`btn ${!isAdminSignIn ? 'btn-primary' : 'btn-outline-secondary'}`}
            onClick={() => setIsAdminSignIn(false)}
          >
            Admin Sign Up
          </button>
        </div>

        {/* Forms */}
        {isAdminSignIn ? (
          <div className="card shadow p-4 w-100" style={{ maxWidth: '400px' }}>
            <h2 className="text-center mb-3">Admin Sign In</h2>
            <form onSubmit={signIn}>
              <div className="mb-3">
                <input
                  type="email"
                  name="email"
                  onChange={handleChange2}
                  className="form-control"
                  placeholder="Admin Email"
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  type="password"
                  name="password"
                  onChange={handleChange2}
                  className="form-control"
                  placeholder="Password"
                  required
                />
              </div>
              <button type="submit" className="btn btn-success w-100">
                Sign In
              </button>
              <a href="#" className="d-block text-center text-success mt-3">
                Forgot your password?
              </a>
            </form>
          </div>
        ) : (
          <div className="card shadow p-4 w-100" style={{ maxWidth: '400px' }}>
            <h2 className="text-center mb-3">Admin Sign Up</h2>
            <form onSubmit={signUp}>
              <div className="mb-3">
                <input
                  type="text"
                  name="name"
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Name"
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  type="number"
                  name="number"
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Phone Number"
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  name="username"
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Username"
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  type="email"
                  name="email"
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Admin Email"
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  type="password"
                  name="password"
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Password"
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  type="password"
                  name="cpassword"
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Confirm Password"
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary w-100">
                Sign Up
              </button>
            </form>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-primary text-white text-center py-3">
        <p>&copy; {new Date().getFullYear()} All rights reserved.</p>
      </footer>
    </div>
  );
}

export default AdminLogin;
