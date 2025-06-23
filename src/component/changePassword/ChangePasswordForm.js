import React, {useEffect,useState} from "react";
import {fetchChangePassword} from "../../service/userManagementService";

let ChangePasswordForm = () => {
    const [message, setMessage] = useState('');
    
    const submit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const username = form.username.value;
        const oldPassword = form.oldPassword.value;
        const newPassword = form.newPassword.value;
        
        try{
            const response = await fetchChangePassword({username, password:oldPassword, newPassword});
            console.log('Login response:', response);
            if(response && response.status === 'OK' && response.message === 'User Not Found'){
                setMessage(response.message);
            }else if(response && response.status === 'OK' && response.message === 'Password Change'){
                setMessage(response.message);
            }else{
                console.log(response.message);
            }
            }catch(error){
                setMessage('Error Server for change password')
            }

        };


    return (
        <div>
          <h2>Change Password</h2>
          <form onSubmit={submit}>
            <div>
              <label>Username:</label>
              <input type="text" name="username" required />
            </div>
            <div>
              <label>Old Password:</label>
              <input type="oldPassword" name="oldPassword" required />
            </div>
            <div>
              <label>New Password:</label>
              <input type="password" name="newPassword" required />
            </div>
            <button type="submit">Submit</button>
          </form>
          {message && <p>{message}</p>}
        </div>
      );
    };
    export default ChangePasswordForm;