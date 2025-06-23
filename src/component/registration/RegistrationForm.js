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
    <div>
      <h2>Registration</h2>
      <form onSubmit={submit}>
        <div>
          <label>Name :</label>
          <input type="text" name="name" required />
        </div>
        <div>
          <label>Email :</label>
          <input type="text" name="email" required />
        </div>
        {/* <div>
          <label>Pilih Manager</label>
          <select name="manager" required>
          <option value="">-- Pilih Manager --</option>
            {managers.map((manager) => (
            <option key={manager.id} value={manager.id}>
            {manager.username} - {manager.roleName}
          </option>
          ))}
          </select>
        </div> */}
        <button type="submit">Register</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};
export default RegistrationForm;