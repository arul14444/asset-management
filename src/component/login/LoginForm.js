import React, { useEffect, useState } from "react";
import { fetchLogin } from "../../service/userManagementService";
import { useNavigate } from "react-router-dom"; 
import { useMutation } from "@tanstack/react-query";
import { Link } from "react-router-dom";

let LoginForm = () => {
  // const [message, setMessage] = useState('');
  // const navigate = useNavigate();

  // const submit = async (e) => {
  //   e.preventDefault();
  //   setMessage('');
  //   const form = e.target;
  //   const username = form.username.value;
  //   const password = form.password.value;
    
  //   try {
  //     const response = await fetchLogin({username, password});
  //     console.log('Login response:', response);
  //     if (response && response.status === 'OK' && response.message === 'Login Failed User Not Found') {
  //       setMessage(response.message);
  //       console.log(response.message);
  //     } else if (response && response.status === 'OK' && response.message === 'Login Success') {
  //       setMessage(response.message);
  //       console.log(response.message);
  //       navigate('/'); // Redirect ke dashboard
  //     }else{
  //       console.log(response.message);
  //     }
  //  } catch (error) {
  //     console.error('Login request error:', error);
  //     setMessage('Login request error');
  //   }
  // }

  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const [password, setPassword] = useState('');

  const {
    mutate: login,
    data: response,
    error,
    isPending,
  } = useMutation({
    mutationFn: fetchLogin,
  });

  const submit = (e) => {
    e.preventDefault();
    setMessage('');
    const form = e.target;
    const username = form.username.value;
    const password = form.password.value;
    login({ username, password });
    setPassword(password);
  };

  useEffect(() => {
    if(response){
      
      if (response.status === 'OK' && response.message === 'Login Success') {
        console.log(response.data.name);
        console.log(password);
        sessionStorage.setItem('auth', btoa(response.data.name+':'+password));
        sessionStorage.setItem('randomCode', response.data.randomCode);
        setMessage(response.message);
        navigate("/dashboard");
      } else{
        setMessage(response.message);
        console.log(response.message);
      }
    }
  }, [response, navigate]);

  useEffect(() => {
    if (error) {
      console.log(error);
      setMessage("Login request error");
    }
  }, [error]);

  return (
    <div className="login-container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow login-card">
        <h2 className="text-center mb-4">Login</h2>
        <form onSubmit={submit}>
          <div className="mb-3">
            <label className="form-label">Username:</label>
            <input type="text" name="username" className="form-control" required />
          </div>
          <div className="mb-3">
            <label className="form-label">Password:</label>
            <input type="password" name="password" className="form-control" required />
          </div>
          <button type="submit" className="btn btn-primary w-100">Login</button>
        </form>
        <div className="text-center mt-3">
          <small>
            <Link to="/changePassword" className="text-decoration-none">
              Forgot password? Change it here
            </Link>
          </small>
        </div>
        {message && <div className="alert alert-info mt-3 text-center">{message}</div>}
      </div>
    </div>
  );
};

export default LoginForm;