// router.js
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

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
import Unauthorized from "./pages/error/401";
import Notfound from "./pages/error/404";
import AssetConditionHistory from "./pages/asset_condition_history";

// Buat instance QueryClient
const queryClient = new QueryClient();

let router = () => {
  let isAuthenticated = () => {
    return sessionStorage.getItem('auth') !== null;
  }

  let PrivateRoute = ({ children }) => {
    return isAuthenticated() ? children : <Navigate to="/error-401" />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />} >
            <Route path="login" element={<Login />} />
            <Route path="dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
            <Route path="regis" element={<Registration />} />
            <Route path="changePassword" element={<ChangePassword />} />
            <Route path="updateRole" element={<UpdateRole />} />
            <Route path="loaning" element={<LoaningRequest />} />
            <Route path="approver" element={<LoaningApprover />} />
            <Route path="approver2-and-returner" element={<LoaningApprover2AndReturner />} />
            <Route path="borrower" element={<LoaningBorrower />} />
            <Route path="asset" element={<Asset />} />
            <Route path="assetcondition" element={<AssetCondition />} />
            <Route path="assetconditionhistory" element={<AssetConditionHistory />} />
          </Route>
          <Route path="error-401" element={<Unauthorized />} />
          <Route index element={<Login />} />
          <Route path="*" element={<Notfound />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default router;
