import React, { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchLoaningList, fetchPostApprove } from "../../service/loaningApprover2AndReturner";
import DataTable from 'datatables.net-react';
import DT from 'datatables.net-bs5';
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

DataTable.use(DT);

const TableLoaningApprover2AndReturner = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [filter, setFilter] = useState("all");

  const {
    data: loaningData,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["loaningList"],
    queryFn: fetchLoaningList,
  });

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

  const handleAction = async (id, status) => {
    try {
      const payload = { id, loanStatusProcess: status, approver: 1 };
      console.log("Sending payload:", payload);
      await fetchPostApprove(payload);
      alert(`Loaning has been ${status === 3 ? "approved" : "rejected"} successfully.`);
      queryClient.invalidateQueries(["loaningList"]);
    } catch (err) {
      console.error("Action failed:", err);
      alert(
        `Failed to update loaning status.\nReason: ${err?.response?.data?.message || err.message || "Unknown error"
        }`
      );
    }
  };

  if (isLoading) return <h1>Loading...</h1>;
  if (error) return <h1>Server is not responding.</h1>;

  return (
    <div className="table-loaning-approver mt-3">
      <h1>Tabel Loaning</h1>
      <div className="mb-3">
        <Button size="sm" className="me-2" onClick={() => setFilter("all")}>All</Button>
        <Button size="sm" className="me-2" onClick={() => setFilter("active")}>Active</Button>
        <Button size="sm" onClick={() => setFilter("inactive")}>Inactive</Button>
      </div>
      <DataTable
        className="display table table-bordered"
        options={{
          responsive: true,
          select: true,
          destroy: true
        }}
      >
        <thead>
          <tr>
            <th className="col-no">No</th>
            <th className="col-asset">Requested Asset</th>
            <th className="col-date">Loan Date</th>
            <th className="col-employee">Employee Name</th>
            <th className="col-status">Status</th>
            <th className="col-note">Note</th>
            <th className="col-action">Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredLoanings.map((item, index) => (
            <tr key={item.id}>
              <td>{index + 1}</td>
              <td>{item.assetName ?? "-"}</td>
              <td>
                {new Intl.DateTimeFormat("id-ID", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                }).format(new Date(item.loanDate))}
              </td>
              <td>{item.employeeName}</td>
              <td>{item.loaningStatusProcess}</td>
              <td>{item.note ?? "-"}</td>
              <td>
                {item.loaningStatusProcess === "Returned" ? null : (
                  item.loaningStatusProcess === "Approved by Procurement" ? (
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => navigate('/assetcondition', {
                        state: {
                          loaningId: item.id,
                          assetName: item.assetName
                        }
                      })}
                    >
                      Return
                    </button>
                  ) : item.loaningStatusProcess === "Approved by Manager" ? (
                    <>
                      <button
                        className="btn btn-primary me-2"
                        onClick={() => handleAction(item.id, 3)}
                      >
                        Approve
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleAction(item.id, 5)}
                      >
                        Reject
                      </button>
                    </>
                  ) : null
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </DataTable>
    </div>
  );
};

export default TableLoaningApprover2AndReturner;
