import React from 'react';
import TableLoaningRequester from '../../component/loaningBorrower/TabelLoaningRequester';
import BorrowerNavbar from '../../component/navbar/BorrowerNavbar';

let LoaningBorrower = () => {

  return (
    <>
    <BorrowerNavbar></BorrowerNavbar>
    <div className="container">
      <TableLoaningRequester />
    </div>
    </>
  );
}

export default LoaningBorrower;