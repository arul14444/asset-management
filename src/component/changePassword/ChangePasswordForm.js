import React, {useEffect,useState} from "react";
import {fetchChangePassword} from "../../service/userManagementService";

let ChangePasswordForm = () => {
  const [message, setMessage] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const username = form.username.value;
    const oldPassword = form.oldPassword.value;
    const newPassword = form.newPassword.value;

    try {
      const response = await fetchChangePassword({
        username,
        password: oldPassword,
        newPassword,
      });

      if (
        response?.status === "OK" &&
        response.message === "User Not Found"
      ) {
        setMessage(response.message);
      } else if (
        response?.status === "OK" &&
        response.message === "Password Change"
      ) {
        setMessage("Password changed successfully");
      } else {
        setMessage(response?.message || "Unknown response");
      }
    } catch (error) {
      setMessage("Error server for change password");
    }
  };

  return (
    <div className="change-password-container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow change-password-card">
        <h2 className="text-center mb-4">Change Password</h2>
        <form onSubmit={submit}>
          <div className="mb-3">
            <label className="form-label">Username:</label>
            <input
              type="text"
              name="username"
              className="form-control"
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Old Password:</label>
            <input
              type="password"
              name="oldPassword"
              className="form-control"
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">New Password:</label>
            <input
              type="password"
              name="newPassword"
              className="form-control"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Submit
          </button>
        </form>
        {message && (
          <div className="alert alert-info mt-3 text-center">{message}</div>
        )}
      </div>
    </div>
  );
};

export default ChangePasswordForm;