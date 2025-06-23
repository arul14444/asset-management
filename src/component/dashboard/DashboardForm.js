let DashboardForm = () => {
  return (
    <div className="dashboard-container container py-5">
      <div className="row mb-4">
        <div className="col text-center">
          <h1 className="dashboard-title">Dashboard Page</h1>
          <p className="dashboard-subtitle">Welcome to Asset Management System</p>
        </div>
      </div>
      <div className="row g-4">
        <div className="col-md-4">
          <div className="card dashboard-card shadow-sm">
            <div className="card-body text-center">
              <h5 className="card-title">Assets</h5>
              <p className="card-text">Manage and view all assets here.</p>
              <a href="/asset" className="btn btn-primary">Go to Assets</a>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card dashboard-card shadow-sm">
            <div className="card-body text-center">
              <h5 className="card-title">Loan Requests</h5>
              <p className="card-text">View and approve loan requests.</p>
              <a href="/approver" className="btn btn-success">Go to Loaning</a>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card dashboard-card shadow-sm">
            <div className="card-body text-center">
              <h5 className="card-title">Users</h5>
              <p className="card-text">Manage user roles and registrations.</p>
              <a href="/regis" className="btn btn-warning">Go to Users</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardForm;