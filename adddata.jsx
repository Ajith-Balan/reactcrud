import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

function AddStaff() {
  const navigate = useNavigate();
  const [photo, setPhoto] = useState("");
  const [staff, setStaff] = useState({
    name: "",
    blood: "",
    email: "",
    password: "",
    empid: "",
    salary: "",
    experience: "",
    number: "",
    otp: "",
    photo: "",
  });

  const handleChange = (e) => {
    setStaff((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const convert = async (e) => {
    setPhoto(await convertToBase64(e.target.files[0]));
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

  const addTask = async (e) => {
    e.preventDefault();

    const res = await axios.post("http://localhost:3000/api/addstaff", {
      staff,
      photo,
    });
    console.log(res);

    if (res.status === 201) {
      alert("Staff created successfully");
      navigate("/adminhome"); // Redirect to admin home after successful addition
    }
  };

  return (
    <div className="min-vh-100 d-flex flex-column">
      <nav className="navbar navbar-dark bg-primary">
        <div className="container">
          <Link to="/" className="navbar-brand">
            HOME
          </Link>
        </div>
      </nav>

      <div className="flex-grow-1 d-flex align-items-center justify-content-center">
        <div className="card w-100 max-w-lg p-4 shadow-lg">
          <h2 className="card-title text-center mb-4">Add Staff</h2>
          <form onSubmit={addTask}>
            <div className="mb-3">
              <label htmlFor="photo" className="form-label">
                Photo
              </label>
              <input
                type="file"
                id="photo"
                name="photo"
                onChange={convert}
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                onChange={handleChange}
                value={staff.name}
                className="form-control"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="number" className="form-label">
                Number
              </label>
              <input
                type="number"
                id="number"
                name="number"
                onChange={handleChange}
                value={staff.number}
                className="form-control"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="blood" className="form-label">
                Blood
              </label>
              <input
                type="text"
                id="blood"
                name="blood"
                onChange={handleChange}
                value={staff.blood}
                className="form-control"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="empid" className="form-label">
                Employee ID
              </label>
              <input
                type="text"
                id="empid"
                name="empid"
                onChange={handleChange}
                value={staff.empid}
                className="form-control"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                onChange={handleChange}
                value={staff.email}
                className="form-control"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                onChange={handleChange}
                value={staff.password}
                className="form-control"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="salary" className="form-label">
                Salary
              </label>
              <input
                type="text"
                id="salary"
                name="salary"
                onChange={handleChange}
                value={staff.salary}
                className="form-control"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="experience" className="form-label">
                Experience
              </label>
              <input
                type="text"
                id="experience"
                name="experience"
                onChange={handleChange}
                value={staff.experience}
                className="form-control"
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">
              Add Staff
            </button>
          </form>
        </div>
      </div>

      <footer className="bg-primary text-white text-center py-3">
        <div className="container">
          <p className="mb-0">© 2024. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default AddStaff;
