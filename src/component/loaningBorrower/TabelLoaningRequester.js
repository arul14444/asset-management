import React from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchLoaningList } from "../../service/loaningBorrower";
import DataTable from 'datatables.net-react';
import DT from 'datatables.net-bs5';
 
DataTable.use(DT);


const TableLoaningRequester = () => {
    
    const {
        data: loaningData,
        error,
        isLoading,
    } = useQuery({
        queryKey: ["loaningList"],
        queryFn:()=>fetchLoaningList(1),
    });

    if (isLoading) return <h1>Loading...</h1>;
    if (error) console.log(error);

    return (
        <div className="table-loaning-approver mt-3">
            <h1>Tabel Loaning</h1>
            <DataTable className="display table table-bordered"
                    options={{
                        responsive: true,
                        select: true,
                        destroy: true
                    }}>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Loan Date</th>
                        <th>Requested Asset</th>
                        <th>Note</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {loaningData?.data?.map((item, index) => (
                        <tr key={item.id}>
                            <td>{index + 1}</td>
                            <td>
                                {new Intl.DateTimeFormat("id-ID", {
                                    day: "2-digit",
                                    month: "long",
                                    year: "numeric",
                                })
                                    .format(new Date(item.loanDate))
                                    .toString()}
                            </td>
                            <td>{item.assetName ?? "-"}</td>
                            <td>{item.note ?? "-"}</td>
                            <td>{item.loaningStatusProcess}</td>
                        </tr>
                    ))}
                </tbody>
            </DataTable>
        </div>
    );
};

export default TableLoaningRequester;
