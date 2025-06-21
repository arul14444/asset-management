
import { fetchLoaningList, fetchPostApprove } from "../../service/loaningApprover2AndReturner";
import React from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import DataTable from 'datatables.net-react';
import DT from 'datatables.net-bs5';
import { useNavigate } from "react-router-dom";

DataTable.use(DT);

const TableLoaningApprover2AndReturner = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

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
      const payload = { id, loanStatusProcess: status, approver: 1 };
      console.log("Sending payload:", payload);
      await fetchPostApprove(payload);
      alert(`Loaning has been ${status === 2 ? "approved" : "rejected"} successfully.`);
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
          {loaningData?.data?.map((item, index) => (
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
                {item.loaningStatusProcess === "Approved by Procurement" ? (
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
                    ) : (
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
