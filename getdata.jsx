import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function ShowStaff() {
  const [staffList, setStaffList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchStaff();
  }, []);

  const fetchStaff = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/getstaff');
      setStaffList(response.data);
    } catch (error) {
      console.error('Error fetching staff:', error);
    }
  };

  const deleteStaff = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:3000/api/deletestaff/${id}`);
      if (res.status === 200) {
        alert('Successfully deleted');
        fetchStaff(); // Refresh the staff list after deletion
      }
    } catch (error) {
      console.error('Error deleting staff:', error);
      alert('Failed to delete staff');
    }
  };

  return (
    <div className="min-vh-100 d-flex flex-column">
      {/* Navigation */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary fixed-top">
        <div className="container">
          <Link className="navbar-brand" to="/">HOME</Link>
        </div>
      </nav>

      {/* Main content */}
      <div className="container mt-5 pt-5">
        <h2 className="mb-4">Staff List</h2>
        {/* 3 columns layout */}
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {staffList.map((staff) => (
            <div key={staff._id} className="col">
              <div className="card h-100 shadow">
                <div className="card-body d-flex flex-column">
                  <div className="d-flex align-items-center mb-3">
                    <img
                      src={
                        staff.photo ||
                        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTxGjVtHp-iKdeRIUkAuP4jJsV1CRFTN3eyg&s'
                      }
                      alt="Staff"
                      className="rounded-circle me-3"
                      style={{ width: '64px', height: '64px', objectFit: 'cover' }}
                    />
                    <div>
                      <h5 className="card-title mb-0">{staff.name}</h5>
                      <p className="text-muted mb-1">Emp ID: {staff.empid}</p>
                      <p className="text-muted mb-0">Phone: {staff.number}</p>
                    </div>
                  </div>
                  <div className="mt-auto d-flex justify-content-end gap-2">
                    <Link to={`/editstaff/${staff._id}`} className="btn btn-primary btn-sm">
                      Details
                    </Link>
                    <button
                      onClick={() => deleteStaff(staff._id)}
                      className="btn btn-danger btn-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-primary text-white text-center py-3 mt-auto">
        <p className="mb-0">&copy; {new Date().getFullYear()} CJ Attire. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default ShowStaff;
