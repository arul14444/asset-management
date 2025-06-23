import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useQuery } from "@tanstack/react-query";
import { fetchAllPart } from "../../service/part";
import { saveAllAssetCondition } from "../../service/asset_condition";
import { useLocation, useNavigate } from "react-router-dom";

const AssetCondition = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const loaningId = location.state?.loaningId;
    const assetName = location.state?.assetName;

    const [parts, setParts] = useState([]);

    const { data: value, error, isLoading } = useQuery ({
        queryKey: ["parts"],
        queryFn: async () => {
                    const res = await fetchAllPart();
                    return res.data;
        }
    });

    useEffect(() => {
        if (value) {
            setParts(value);
        }
    }, [value]);

    const [rows, setRows] = useState([
        { parts: '', rate: '', proof: '', notes: '' }
    ]);

    const handleAddRow = () => {
        setRows([...rows, { parts: '', rate: '', proof: '', notes: '' }]);
    };

    const handleChange = (index, field, value) => {
        const updatedRows = [...rows];
        updatedRows[index][field] = value;
        setRows(updatedRows);
    };

    const handleDeleteRow = (index) => {
        const updatedRows = [...rows];
        updatedRows.splice(index, 1);
        setRows(updatedRows);
    };

    const handleSubmit = async () => {
        try {
            const payload = {
                employee: 3,
                components: rows.map((row) => ({
                    parts: parseInt(row.parts),
                    rate: parseInt(row.rate),
                    proof_of_damage: row.proof,
                    notes: row.notes
                }))
            };

            await saveAllAssetCondition(loaningId, payload);
            alert('Asset Has Been Returned');
            navigate('/approver2-and-returner')
        } catch (err) {
            alert('An error occurred, please check the data again and resubmit');
        }
    }

    if (isLoading) return <h1 className="text-center mt-4">Loading...</h1>;
    if (error) return <h1 className="text-center mt-4 text-danger">Failed to fetch Asset</h1>;

    return (
        <div className="container mt-5">
            <h1 className="mb-4">Asset Condition</h1>

            <table className="w-auto mb-3">
                <tbody>
                    <tr>
                        <td style={{ border: 'none', paddingRight: '5px' }}><strong>Loaning ID</strong></td>
                        <td style={{ border: 'none', paddingRight: '5px' }}>:</td>
                        <td style={{ border: 'none' }}>{loaningId}</td>
                    </tr>
                    <tr>
                        <td style={{ border: 'none', paddingRight: '5px' }}><strong>Asset Name</strong></td>
                        <td style={{ border: 'none', paddingRight: '5px' }}>:</td>
                        <td style={{ border: 'none' }}>{assetName}</td>
                    </tr>
                </tbody>
            </table>

            <table className="table table-bordered">
                <thead className="table-light">
                    <tr>
                        <th>No</th>
                        <th>Part</th>
                        <th>Rate</th>
                        <th>Proof of Damage</th>
                        <th>Notes</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>
                                <select className="form-select" value={row.parts} onChange={(e) => handleChange(index, 'parts', e.target.value)}>
                                    <option value="">-- Choose Part --</option>
                                    {parts.map((part) => (
                                        <option key={part.id} value={part.id}>{part.name}</option>
                                    ))}
                                </select>
                            </td>
                            <td><input type="number" className="form-control" value={row.rate} min="0" max="100" onChange={(e) => handleChange(index, 'rate', e.target.value)}/></td>
                            <td><input type="text" className="form-control" value={row.proof} onChange={(e) => handleChange(index, 'proof', e.target.value)}/></td>
                            <td><input type="text" className="form-control" value={row.notes} onChange={(e) => handleChange(index, 'notes', e.target.value)}/></td>
                            <td className="text-center"><button className="btn btn-danger btn-sm" onClick={() => handleDeleteRow(index)}>Delete</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="mb-3">
                <button className="btn btn-primary me-2" onClick={handleAddRow}>Add Row</button>
                <button className="btn btn-success" onClick={handleSubmit}>Submit</button>
            </div>
        </div>
    );
}

export default AssetCondition;