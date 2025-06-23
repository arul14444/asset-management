import { Outlet, Link } from "react-router-dom";
import { useEffect, useState } from "react";

let Layout = () => {
  // const [isLoggedIn, setIsLoggedIn] = useState(false);

  // useEffect(() => {
  //   setIsLoggedIn(localStorage.getItem('isLoggedIn') === 'true');
  // }, []);

  return(
    <>
      <nav>
        <ul className="nav d-flex flex-row justify-content-center">
          <li className="nav-item">
            <Link to="/dashboard" className="nav-link">dashboard</Link>
          </li>
          <li className="nav-item">
            <Link to="/login" className="nav-link">login</Link>
          </li>
          <li className="nav-item">
            <Link to="/regis" className="nav-link">registration</Link>
          </li>
          <li className="nav-item">
            <Link to="/updateRole" className="nav-link">Change Role</Link>
          </li>
          <li className="nav-item">
            <Link to="/changePassword" className="nav-link">Change Password</Link>
          </li>
        </ul>
      </nav>
      <Outlet />
    </>
  )
}
export default Layout;