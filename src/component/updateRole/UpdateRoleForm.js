import React, { useEffect, useState } from "react";
import { fetchGetRole,fetchUpdateRole} from "../../service/userManagementService";


let UpdateRoleForm = () =>{
const [message, setMessage] = useState('');
const [roles, setRole] = useState([]);

  useEffect(() => {
    const fetchGetDataRole = async () => {
      try {
        const data = await fetchGetRole(); 
        setRole(data);
        console.log(data)
        console.log("ini data roleeeee "+data)
      } catch (error) {
        console.error('Gagal fetch Role:', error);
      }
    };
  
    fetchGetDataRole();
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    setMessage('');
    const form = e.target;
    const username = form.username.value;
    const role = form.role.value;
    
    try {
      const response = await fetchUpdateRole({username, role});
      console.log('Update Role :', response);
      if (response && response.status === 'OK' && response.message === 'User Not Found') {
        setMessage(response.message);
      } else if (response && response.status === 'OK' && response.message === 'Update Role Succes') {
        setMessage(response.message);
      }
   } catch (error) {
      console.error('update request error:', error);
      
    }
  };



return(
    <div>
      <h2>Update Role</h2>
      <form onSubmit={submit}>
        <div>
          <label>Name : </label>
          <input type="text" name="username" required />
        </div>
        <div>
          <label>New Role</label>
          <select name="role" required>
          <option value="">-- Pilih Role --</option>
            {roles.map((role) => (
            <option key={role.id} value={role.id}>
            {role.name}
          </option>
          ))}
          </select>
        </div>
        <button type="submit">Update</button>
      </form>
      {message && <p>{message}</p>}
    </div>
)
}

export default UpdateRoleForm;