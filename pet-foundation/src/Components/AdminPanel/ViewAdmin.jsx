import React, { useEffect, useState } from "react";
import axios from "axios";
import { MdModeEditOutline } from "react-icons/md";
import "./CSS/MainPage.css";
import UpdateAdmin from "./UpdateAdmin";
import { toast } from "react-toastify";

const Admin = () => {
  const [updateModal, setUpdateModal] = useState(false); // Modal visibility
  const [currentId, setCurrentId] = useState(null); // Selected admin ID
  const [admin, setAdmin] = useState(null); // Admin object for single admin details

  // Fetch admin data on mount
  useEffect(() => {
    fetchAdmin();
  }, []);

  const fetchAdmin = async () => {
    try {
      const token = sessionStorage.getItem("token"); // Retrieve token
      console.log("Admin Token received at frontend:", token);

      const res = await axios.get("http://127.0.0.1:8000/api/fetchAdmin", {
        headers: {
          Authorization: `Bearer ${token}`, // Add token to headers
        },
      });

      console.log("API Response:", res.data); // Inspect API response
      setAdmin(res.data); // Directly set admin details
      toast.success("Welcome To admin Profile");
    } catch (err) {
      toast.error("Unable to access profile. Token not found or invalid.");
      console.error("Error fetching admin data:", err);
    }
  };

  const handleEditClick = (id) => {
    setCurrentId(id);
    setUpdateModal(true); // Show modal
  };

  return (
    <>
      {/* Update Modal */}
      {updateModal && (
        <UpdateAdmin
          setUpdateModal={setUpdateModal}
          currentId={currentId}
          refreshAdmin={fetchAdmin}
        />
      )}

      {/* Admin Profile Table */}
      <section className="admin-page">
        <div className="page-top">
          <h2>Admin Profile</h2>
        </div>

        <div className="table-part">
          <h2>Admin Detail</h2>
          <div className="table-section">
            <table width="100%" className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Image</th>
                  <th>Hashed Password</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {/* Render admin details safely */}
                {admin ? (
                  <tr key={admin.id}>
                    <td >{admin.name}</td>
                    <td>{admin.email}</td>
                    <td>
                      <img
                        src={`http://127.0.0.1:8000/storage/${admin.image}`}
                        alt="Admin"
                        style={{ width: "50px", height: "50px" }}
                      />
                    </td>
                    <td className="Password">{admin.password}</td>
                    <td className="actions">
                      <p className="action">
                        <MdModeEditOutline
                          className="action-icon"
                          onClick={() => handleEditClick(admin.id)}
                        />
                      </p>
                    </td>
                  </tr>
                ) : (
                  <tr>
                    <td colSpan="5">No data available</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
};

export default Admin;
