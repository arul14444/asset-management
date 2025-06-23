import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoaningRequest from "./pages/loaningRequest/index";
import LoaningApprover from "./pages/loaningApprover/index";
import LoaningApprover2AndReturner from "./pages/loaningApprover2AndReturner/index";
import LoaningBorrower from "./pages/loaningBorrower";
import Asset from "./pages/asset";
import AssetCondition from "./pages/asset_condition";

import Login from "./pages/login";
import Layout from './pages/layout';
import Registration from './pages/registration';
import ChangePassword from './pages/changePassword';
import UpdateRole from './pages/updateRole';
import Dashboard from './pages/dashboard';


let router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />} > 
          <Route index element={<Login />} />
          <Route path="login" element={<Login />}/>
          <Route path="dashboard" element={<Dashboard />}/>
          <Route path="regis" element={<Registration />}/>
          <Route path="changePassword" element={<ChangePassword />}/>
          <Route path="updateRole" element={<UpdateRole />}/>
          <Route path="loaning" element={<LoaningRequest/> }></Route>
          <Route path="approver" element={<LoaningApprover />} />
          <Route path="approver2-and-returner" element={<LoaningApprover2AndReturner />} />
          <Route path="borrower" element={<LoaningBorrower />} />
          <Route path="asset" element={<Asset />} />
          <Route path="assetcondition" element={<AssetCondition />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
export default router;
