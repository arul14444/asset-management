import React from 'react';
import './index.css';
import reportWebVitals from './reportWebVitals';
<<<<<<< Updated upstream
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import  RouterComponent  from './routerComponent';
import AllProvider from './provider';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AllProvider>
      <RouterComponent/>
    </AllProvider>
  </React.StrictMode>
=======
import Layout from './pages/layout';
import Login from './pages/login';
import Registration from './pages/registration';
import ChangePassword from './pages/changePassword';
import Dashboard from './pages/dashboard';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UpdateRole from './pages/updateRole';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';


const queryClient = new QueryClient();
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <QueryClientProvider client={queryClient}>
  <BrowserRouter>
        <Routes>
            <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="login" element={<Login />}/>
            <Route path="regis" element={<Registration />}/>
            <Route path="changePassword" element={<ChangePassword />}/>
            <Route path="updateRole" element={<UpdateRole />}/>
            </Route>
        </Routes>
  </BrowserRouter>
  </QueryClientProvider>
  // <Login />
>>>>>>> Stashed changes
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();