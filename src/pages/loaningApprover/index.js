import React from "react";
import { useSelector, useDispatch } from "react-redux";
import TableLoaningApprover from "../../component/loaningApprover/TableLoaningApprover";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./index.css";
import ApproverNavbar
    from "../../component/navbar/ApproverNavbar";
let LoaningApprover = () => {
    const layout = {
        navbar: [
            {
                id: 1,
                value: "#ABCDEFG",
                name: "background-color",
                category: "color-template-navbar",
            },
        ],
        footer: [],
    };

    return Body();
};

let Body = () => {
    return (
        <>
            <ApproverNavbar />
            <div className="container">
                <TableLoaningApprover />
            </div>
        </>
    );
};

export default LoaningApprover;