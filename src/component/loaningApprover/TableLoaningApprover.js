import React, { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchLoaningList, fetchPostApprove } from "../../service/loaningApprover";
import DataTable from 'datatables.net-react';
import { Button } from "react-bootstrap";
import DT from 'datatables.net-bs5';

DataTable.use(DT);

const TableLoaningApprover = () => {
    const queryClient = useQueryClient();
    const [filter, setFilter] = useState("all");

    const {
        data: loaningData,
        error,
        isLoading,
    } = useQuery({
        queryKey: ["loaningList"],
        queryFn: fetchLoaningList,
    });

    const handleAction = async (id, status) => {
        try {
            const payload = { id, loanStatusProcess: status };
            await fetchPostApprove(payload);
            alert(`Loaning has been ${status === 3 ? "approved" : status === 5 ? "rejected" : "returned"} successfully.`);
            queryClient.invalidateQueries(["loaningList"]);
        } catch (err) {
            alert(`Failed to update loaning status.\nReason: ${err?.response?.data?.message || err.message}`);
        }
    };

    const getFilteredLoanings = () => {
        if (!loaningData?.data) return [];
        switch (filter) {
            case "active":
                return loaningData.data.filter(item => item.loaningStatusProcess === "Requested");
            case "inactive":
                return loaningData.data.filter(item =>
                    item.loaningStatusProcess === "Rejected" || item.loaningStatusProcess === "Returned"
                );
            default:
                return loaningData.data;
        }
    };

    const filteredLoanings = getFilteredLoanings();

    if (isLoading) return <h1>Loading...</h1>;
    if (error) return <h1>Server is not responding.</h1>;

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
                    key={filter} // ⬅️ penting untuk memaksa render ulang dan hindari error removeChild
                    className="display table table-bordered"
                    options={{ responsive: true, select: true, destroy: true }}
                >
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Requested Asset</th>
                            <th>Loan Date</th>
                            <th>Employee Name</th>
                            <th>Status</th>
                            <th>Note</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredLoanings.map((item, index) => (
                            <tr key={item.id}>
                                <td>{index + 1}</td>
                                <td>{item.assetName ?? "-"}</td>
                                <td>{new Intl.DateTimeFormat("id-ID", {
                                    day: "2-digit", month: "long", year: "numeric"
                                }).format(new Date(item.loanDate))}</td>
                                <td>{item.employeeName}</td>
                                <td>{item.loaningStatusProcess}</td>
                                <td>{item.note ?? "-"}</td>
                                <td>
                                    {item.loaningStatusProcess === "Requested" ? (
                                       <>
                                            <button className="btn btn-primary me-2" onClick={() => handleAction(item.id, 3)}>Approve</button>
                                            <button className="btn btn-danger" onClick={() => handleAction(item.id, 5)}>Reject</button>
                                        </>
                                    ): null}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </DataTable>
            </div>
        </div>
    );
};

export default TableLoaningApprover;
