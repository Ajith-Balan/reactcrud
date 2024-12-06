import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

const Edit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [data, setData] = useState({});
  const [photo, setPhoto] = useState("");

  const handleChange = (e) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const update = async () => {
    try {
      const res = await axios.patch(`http://localhost:3000/api/updatestaff/${id}`, { ...data, photo });
      if (res.status === 200) {
        navigate('/');
      }
    } catch (error) {
      console.error('Error updating staff:', error);
    }
  };

  const deleteStaff = async () => {
    try {
      const res = await axios.delete(`http://localhost:3000/api/deletestaff/${id}`);
      if (res.status === 200) {
        alert('Successfully deleted');
        navigate('/');
      }
    } catch (error) {
      console.error('Error deleting staff:', error);
    }
  };

  const getUser = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/api/getonestaff/${id}`);
      setData(res.data);
    } catch (error) {
      console.error('Error fetching staff:', error);
    }
  };

  const convert = async (e) => {
    const pic = await convertToBase64(e.target.files[0]);
    setPhoto(pic);
  };

  function convertToBase64(file) {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  }

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="d-flex flex-column min-vh-100">
      {/* Navigation */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary fixed-top">
        <div className="container">
          <Link className="navbar-brand" to="/">HOME</Link>
        </div>
      </nav>

      {/* Main content */}
      <div className="container py-5 mt-5">
        <div className="text-center mb-4">
          <div className="rounded-circle border border-primary overflow-hidden" style={{ width: '150px', height: '150px' }}>
            <img
              src={data.photo || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTxGjVtHp-iKdeRIUkAuP4jJsV1CRFTN3eyg&s"}
              alt="Profile"
              className="img-fluid"
            />
          </div>
          <input
            type="file"
            onChange={convert}
            className="form-control-file mt-3"
          />
        </div>

        <h2 className="text-center text-primary mb-4">{data.name}</h2>

        <div className="card shadow">
          <div className="card-body">
            <div className="form-group mb-3">
              <label htmlFor="name" className="form-label">Name:</label>
              <input
                name="name"
                type="text"
                id="name"
                onChange={handleChange}
                value={data.name || ''}
                className="form-control"
              />
            </div>

            <div className="form-group mb-3">
              <label htmlFor="empid" className="form-label">Employee ID:</label>
              <input
                name="empid"
                type="text"
                id="empid"
                onChange={handleChange}
                value={data.empid || ''}
                className="form-control"
              />
            </div>

            <div className="form-group mb-3">
              <label htmlFor="email" className="form-label">Email:</label>
              <input
                name="email"
                type="text"
                id="email"
                onChange={handleChange}
                value={data.email || ''}
                className="form-control"
              />
            </div>

            <div className="form-group mb-3">
              <label htmlFor="password" className="form-label">Password:</label>
              <input
                name="password"
                type="text"
                id="password"
                onChange={handleChange}
                value={data.password || ''}
                className="form-control"
              />
            </div>

            <div className="form-group mb-3">
              <label htmlFor="number" className="form-label">Phone Number:</label>
              <input
                name="number"
                type="text"
                id="number"
                onChange={handleChange}
                value={data.number || ''}
                className="form-control"
              />
            </div>

            <div className="d-flex justify-content-between">
              <button
                onClick={update}
                className="btn btn-primary"
              >
                Update
              </button>
              <button
                onClick={deleteStaff}
                className="btn btn-danger"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-primary text-white text-center py-3 mt-auto">
        <p>&copy; {new Date().getFullYear()} . All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Edit;
