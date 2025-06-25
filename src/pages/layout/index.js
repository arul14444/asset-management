import { Outlet, Link } from "react-router-dom";

let roles = sessionStorage.getItem("roles");
let randomCode = sessionStorage.getItem("randomCode")

const Layout = () => {
  return (<div className="fix-header fix-sidebar card-no-border">
    <div className="preloader">
      <svg className="circular" viewBox="25 25 50 50">
        <circle className="path" cx="50" cy="50" r="20" fill="none" strokeWidth="2" strokeMiterlimit="10" />
      </svg>
    </div>

    <div id="main-wrapper">
      <header className="topbar">
        <nav className="navbar top-navbar navbar-expand-md navbar-light">
          <div className="navbar-header">
            <a className="navbar-brand" href="index.html">
              <b>
                <img src="https://res.cloudinary.com/dbevenzrb/image/upload/v1750752815/logo-icon_xci4re.png "alt="homepage" className="dark-logo" />
                <img src="https://res.cloudinary.com/dbevenzrb/image/upload/v1750752815/logo-light-icon_acxoce.png" alt="homepage" className="light-logo" />
              </b>
              <span>
                <img src="https://res.cloudinary.com/dbevenzrb/image/upload/v1750752815/logo-light-icon_acxoce.png" alt="homepage" className="dark-logo" />
                <img src="https://res.cloudinary.com/dbevenzrb/image/upload/v1750752815/logo-light-text_bxtjga.png" className="light-logo" alt="homepage" />
              </span>
            </a>
          </div>

          <div className="navbar-collapse">
            <ul className="navbar-nav mr-auto mt-md-0">
              <li className="nav-item">
                <a className="nav-link nav-toggler hidden-md-up text-muted waves-effect waves-dark">
                  <i className="ti-menu"></i>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link sidebartoggler hidden-sm-down text-muted waves-effect waves-dark">
                  <i className="icon-arrow-left-circle"></i>
                </a>
              </li>
            </ul>

            <ul className="navbar-nav my-lg-0">
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle text-muted waves-effect waves-dark" href="" data-toggle="dropdown">
                  <img src="https://res.cloudinary.com/dbevenzrb/image/upload/v1750752846/1_r4ke3j.jpg" alt="user" className="profile-pic" />
                </a>
                <div className="dropdown-menu dropdown-menu-right animated flipInY">
                  <ul className="dropdown-user">
                    <li>
                      <div className="dw-user-box">
                        <div className="u-img">
                          <img src="https://res.cloudinary.com/dbevenzrb/image/upload/v1750752846/1_r4ke3j.jpg" alt="user"/>
                        </div>
                        <div className="u-text">
                          <h4>Steave Jobs</h4>
                          <p className="text-muted">varun@gmail.com</p>
                          <a href="profile.html" className="btn btn-rounded btn-danger btn-sm">View Profile</a>
                        </div>
                      </div>
                    </li>
                    <li role="separator" className="divider"></li>
                    <li><a href="#"><i className="ti-user"></i> My Profile</a></li>
                    <li><a href="#"><i className="ti-wallet"></i> My Balance</a></li>
                    <li><a href="#"><i className="ti-email"></i> Inbox</a></li>
                    <li role="separator" className="divider"></li>
                    <li><a href="#"><i className="ti-settings"></i> Account Setting</a></li>
                    <li role="separator" className="divider"></li>
                    <li><a href="#"><i className="fa fa-power-off"></i> Logout</a></li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>
        </nav>
      </header>

      <aside className="left-sidebar">
        <div className="scroll-sidebar">
          <nav className="sidebar-nav">
            <ul id="sidebarnav">
              <li className="nav-small-cap fw-bold">{roles.toUpperCase()}</li>
              <li>
                <a href="/approver" aria-expanded="false">
                  <i className="mdi mdi-checkbox-marked-circle-outline"></i><span className="hide-menu">Loaning Approver</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </aside>

      <div className="page-wrapper">
        <div className="container-fluid">
          <div className="row page-titles">
            <Outlet/>
          </div>
        </div>

        <footer className="footer">
          © 2025 UAXEL
        </footer>
      </div>
    </div>
  </div>
  );
};

export default Layout;