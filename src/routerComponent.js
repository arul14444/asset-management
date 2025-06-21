import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoaningRequest from "./pages/loaningRequest/index";
import LoaningApprover from "./pages/loaningApprover/index";
import LoaningApprover2AndReturner from "./pages/loaningApprover2AndReturner/index";
import LoaningBorrower from "./pages/loaningBorrower";
import Asset from "./pages/asset";
import AssetCondition from "./pages/asset_condition";

let router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoaningRequest />} />
        <Route path="/approver" element={<LoaningApprover />} />
        <Route path="/approver2-and-returner" element={<LoaningApprover2AndReturner />} />
        <Route path="/borrower" element={<LoaningBorrower />} />
        <Route path="/asset" element={<Asset />} />
        <Route path="/assetcondition" element={<AssetCondition />} />
      </Routes>
    </BrowserRouter>
  );
};
export default router;
