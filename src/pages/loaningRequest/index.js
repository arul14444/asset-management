import React from "react";
import FormLoaning from "../../component/loaningRequest/FormLoaning";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useSelector, useDispatch } from "react-redux";
let LoaningRequest= () => {
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
        <div className="container">
            <FormLoaning />
        </div>
    );
};

export default LoaningRequest;