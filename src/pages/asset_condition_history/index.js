import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import DataTable from 'datatables.net-react';
import DT from 'datatables.net-bs5';
import { useLocation } from 'react-router-dom';
import { fetchAssetConditionByAssetId } from '../../service/asset_condition_history';
import { useQuery } from '@tanstack/react-query';
import { Alert, Spinner } from 'react-bootstrap';

DataTable.use(DT);

const AssetConditionHistory = () => {
    const location = useLocation();
    const assetId = location.state?.assetId;
    const assetName = location.state?.assetName;
    const category = location.state?.category;

    const [assetcondition, setAssetCondition] = useState([]);

    const { data: value, error, isLoading } = useQuery({
        queryKey: ['asset'],
        queryFn: async () => {
        const res = await fetchAssetConditionByAssetId(assetId);
        return res.data;
        }
    });

    useEffect(() => {
        if (value) setAssetCondition(value);
    }, [value]);

    const tableData = assetcondition.map((item, index) => [
        index + 1,
        item.parts.name || '-',                     
        item.proof_of_damage || '-',            
        item.rate || '-',
        item.notes || '-',
        item.employee.name || '-',
        item.checking_date.substring(0, 10) || '-' 
    ]);

    if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '50vh' }}>
        <div className="text-center">
          <Spinner animation="border" role="status" variant="primary" />
          <div className="mt-2">Fetching data, please wait...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-5">
        <Alert variant="danger" className="text-center">
          <h4 className="mb-2">⚠️ Failed to Fetch Asset</h4>
          <p>Something went wrong while fetching the asset data.</p>
        </Alert>
      </div>
    );
  }

    return (
        <div className='container mt-5'>
            <h1 className="mb-4">Asset Condition History</h1>

            <table className="w-auto mb-3">
                <tbody>
                    <tr>
                        <td style={{ border: 'none', paddingRight: '5px' }}><strong>Asset ID</strong></td>
                        <td style={{ border: 'none', paddingRight: '5px' }}>:</td>
                        <td style={{ border: 'none' }}>{assetId}</td>
                    </tr>
                    <tr>
                        <td style={{ border: 'none', paddingRight: '5px' }}><strong>Asset Name</strong></td>
                        <td style={{ border: 'none', paddingRight: '5px' }}>:</td>
                        <td style={{ border: 'none' }}>{assetName}</td>
                    </tr>
                    <tr>
                        <td style={{ border: 'none', paddingRight: '5px' }}><strong>Category</strong></td>
                        <td style={{ border: 'none', paddingRight: '5px' }}>:</td>
                        <td style={{ border: 'none' }}>{category}</td>
                    </tr>
                </tbody>
            </table>

            <DataTable
            data={tableData}
            className="display table table-bordered"
            options={{ responsive: true, select: true, destroy: true }}
        >
            <thead>
            <tr>
                <th>No</th>
                <th>Part</th>
                <th>Proof Of Damage</th>
                <th>Rate</th>
                <th>Notes</th>
                <th>Checker</th>
                <th>Checking Date</th>
            </tr>
            </thead>
        </DataTable>
      </div>
    )
}

export default AssetConditionHistory;