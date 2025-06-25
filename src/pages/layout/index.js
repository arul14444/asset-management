import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  let roles = sessionStorage.getItem("roles");
  let name = sessionStorage.getItem("name");
  let email = sessionStorage.getItem("email");
  return (<div className="fix-header fix-sidebar card-no-border">
    <div id="main-wrapper">
      <header className="topbar">
        <nav className="navbar top-navbar navbar-expand-md navbar-light">
          <div className="navbar-header">
            <a className="navbar-brand" href="#">
              <b>
                <img src="https://res.cloudinary.com/dbevenzrb/image/upload/v1750752815/logo-icon_xci4re.png " alt="homepage" className="dark-logo" />
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
                          <img src="https://res.cloudinary.com/dbevenzrb/image/upload/v1750752846/1_r4ke3j.jpg" alt="user" />
                        </div>
                        <div className="u-text">
                          <h4>{name.toUpperCase()}</h4>
                          <p className="text-muted">{email}</p>
                          <p href="#" className="text-center btn-rounded btn-danger btn-sm">{roles.toUpperCase()}</p>
                        </div>
                      </div>
                    </li>
                    <li role="separator" className="divider"></li>
                    <li><a href="/change-password"><i className="ti-settings"></i> Change Password</a></li>
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
              {
                roles === "manager" ? (
                  <>
                    <li>
                      <a href="/approver" aria-expanded="false">
                        <i className="mdi mdi-checkbox-marked-circle-outline"></i><span className="hide-menu">Loaning Approver</span>
                      </a>
                    </li>
                    <li>
                      <a href="/regis" aria-expanded="false">
                        <i className="mdi mdi-account-plus"></i><span className="hide-menu">Registration</span>
                      </a>
                    </li>
                  </>
                ) : (roles === "procurement" ? (
                  <>
                    <li>
                      <a href="/approver2-and-returner" aria-expanded="false">
                        <i className="mdi mdi-checkbox-marked-circle-outline"></i><span className="hide-menu">Loaning Approver</span>
                      </a>
                    </li>
                    <li>
                      <a href="/regis" aria-expanded="false">
                        <i className="mdi mdi-account-plus"></i><span className="hide-menu">Registration</span>
                      </a>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <a href="/borrower" aria-expanded="false">
                        <i className="mdi mdi-checkbox-marked-circle-outline"></i><span className="hide-menu">Loaning</span>
                      </a>
                    </li>
                    <li>
                      <a href="/loaning" aria-expanded="false">
                        <i className="mdi mdi-checkbox-marked-circle-outline"></i><span className="hide-menu">Loaning Request</span>
                      </a>
                    </li>
                  </>))
              }


            </ul>
          </nav>
        </div>
      </aside>

      <div className="page-wrapper">
        <div className="container-fluid">
          <div className="row page-titles">
            <Outlet />
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