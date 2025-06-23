import React, { useEffect, useState } from "react";
import { fetchDataManager, fetchRegistration } from "../../service/userManagementService";



let RegistrationForm = () => {
  const [message, setMessage] = useState('');
  const [managers, setManagers] = useState([]);

  // useEffect(() => {
  //   const fetchManagers = async () => {
  //     try {
  //       const data = await fetchDataManager(); 
  //       setManagers(data);
  //     } catch (error) {
  //       console.error('Gagal fetch manager:', error);
  //     }
  //   };
  
  //   fetchManagers();
  // }, []);

  const submit = async (e) => {
    e.preventDefault();
    setMessage('');
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    // const manager = form.manager.value;
    
    try {
      const response = await fetchRegistration({name, email});
      console.log('Registration :', response);
      if (response && response.status === 'OK' && response.message === 'Name or Email of Employee has been register') {
        setMessage(response.message);
      } else if (response && response.status === 'OK' && response.message === 'Succes to Register') {
        setMessage(response.message);
      }
   } catch (error) {
      console.error('Register request error:', error);
    }
  };

  return (
    <div className="registration-container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow registration-card">
        <h2 className="text-center mb-4">Employee Registration</h2>
        <form onSubmit={submit}>
          <div className="mb-3">
            <label className="form-label">Name:</label>
            <input type="text" name="name" className="form-control" required />
          </div>
          <div className="mb-3">
            <label className="form-label">Email:</label>
            <input type="text" name="email" className="form-control" required />
          </div>

          {/* 
          <div className="mb-3">
            <label className="form-label">Choose Manager:</label>
            <select name="manager" className="form-select" required>
              <option value="">-- Select Manager --</option>
              {managers.map((manager) => (
                <option key={manager.id} value={manager.id}>
                  {manager.username} - {manager.roleName}
                </option>
              ))}
            </select>
          </div>
          */}

          <button type="submit" className="btn btn-success w-100">Register</button>
        </form>
        {message && <div className="alert alert-info mt-3 text-center">{message}</div>}
      </div>
    </div>
  );
};

export default RegistrationForm;