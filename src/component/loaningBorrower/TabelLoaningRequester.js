import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchLoaningList } from "../../service/loaningBorrower";
import DataTable from "datatables.net-react";
import DT from "datatables.net-bs5";
import { Button } from "react-bootstrap";

DataTable.use(DT);

const TableLoaningRequester = () => {
    const [filter, setFilter] = useState("all");

    const {
        data: loaningData,
        error,
        isLoading,
    } = useQuery({
        queryKey: ["loaningList"],
        queryFn: () => fetchLoaningList(1),
    });

    const getFilteredLoanings = () => {
        if (!loaningData?.data) return [];

        switch (filter) {
            case "active":
                return loaningData.data.filter(item => 
                    item.loaningStatusProcess === "Requested" || 
                    item.loaningStatusProcess ==="Approved by Manager" ||
                    item.loaningStatusProcess === "Approved by Procurement");
            case "inactive":
                return loaningData.data.filter(item =>
                    item.loaningStatusProcess === "Rejected" ||
                    item.loaningStatusProcess === "Returned"
                );
            default:
                return loaningData.data;
        }
    };

    const filteredLoanings = getFilteredLoanings();

    if (isLoading) return <h1>Loading...</h1>;
    if (error) return <h1>Server error.</h1>;

    return (
        <div className="container mt-3">
            <h1>Tabel Loaning</h1>

            <div className="mb-3">
                <Button size="sm" className="me-2" onClick={() => setFilter("all")}>All</Button>
                <Button size="sm" className="me-2" onClick={() => setFilter("active")}>Active</Button>
                <Button size="sm" onClick={() => setFilter("inactive")}>Inactive</Button>
            </div>

            <div className="table-loaning-approver mt-3">
                <DataTable
                    key={filter} // penting untuk re-render aman
                    className="display table table-bordered"
                    options={{
                        responsive: true,
                        select: true,
                        destroy: true,
                    }}
                >
                    <thead>
                        <tr>
                            <th className="col-no">No</th>
                            <th className="col-date">Loan Date</th>
                            <th className="col-asset">Requested Asset</th>
                            <th className="col-note">Note</th>
                            <th className="col-status">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredLoanings.map((item, index) => (
                            <tr key={item.id}>
                                <td>{index + 1}</td>
                                <td>
                                    {new Intl.DateTimeFormat("id-ID", {
                                        day: "2-digit",
                                        month: "long",
                                        year: "numeric",
                                    }).format(new Date(item.loanDate))}
                                </td>
                                <td>{item.assetName ?? "-"}</td>
                                <td>{item.note ?? "-"}</td>
                                <td>{item.loaningStatusProcess}</td>
                            </tr>
                        ))}
                    </tbody>
                </DataTable>
            </div>
        </div>
    );
};

export default TableLoaningRequester;
