import React from 'react';
import TableLoaningApprover2AndReturner from '../../component/loaningApprover2AndReturner/TabelLoaningApprovalAndRetruner';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./index.css";
// import ApproverNavbar from '../../component/navbar/ApproverNavbar';

let LoaningApprover2AndReturner = () => {

  return (
    <>
    {/* <ApproverNavbar></ApproverNavbar> */}
    <div className="container">
      <TableLoaningApprover2AndReturner />
    </div>
    </>
  );
}

export default LoaningApprover2AndReturner;