import { Outlet, Link } from "react-router-dom";

let layout = () => {
    return(
        <>
          <nav>
            <ul>
              <li>
                <Link to="/">dashboard</Link>
              </li>
              <li>
                <Link to="/login">login</Link>
              </li>
              <li>
                <Link to="/regis">registration</Link>
              </li>
              <li>
                <Link to="/changePassword">Change Password</Link>
              </li>
              <li>
                <Link to="/updateRole">Change Role</Link>
              </li>
            </ul>
          </nav>
    
          <Outlet />
        </>
      )
}
export default layout;