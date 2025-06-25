import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useQuery } from '@tanstack/react-query';
import { fetchAllAsset, fetchAssetByStatus, saveAsset } from '../../service/asset';
import { fetchAllCategory } from '../../service/category';
import { Button, Spinner, Alert } from 'react-bootstrap';
import DataTable from 'datatables.net-react';
import DT from 'datatables.net-bs5';
import AssetModal from '../../component/asset/AssetModal';
import { useNavigate } from 'react-router-dom';

DataTable.use(DT);

const Asset = () => {
  const navigate = useNavigate();
  const [asset, setAsset] = useState([]);
  const [statusFilter, setStatusFilter] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [formData, setFormData] = useState({ id: null, name: '', description: '', photo: '', categoryId: '' });
  const [categories, setCategories] = useState([]);

  const { data: value, error, isLoading, refetch } = useQuery({
    queryKey: ['asset', statusFilter],
    queryFn: async () => {
      const res = statusFilter === 0 ? await fetchAllAsset() : await fetchAssetByStatus(statusFilter);
      return res.data;
    }
  });

  useEffect(() => {
    if (value) setAsset(value);
  }, [value]);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const res = await fetchAllCategory();
        setCategories(res.data || []);
      } catch (err) {
        console.error("Failed to fetch categories", err);
      }
    };
    loadCategories();
  }, []);

  const openAddModal = () => {
    setFormData({ id: null, name: '', description: '', photo: '', categoryId: '' });
    setIsEdit(false);
    setShowModal(true);
  };

  useEffect(() => {
    const handleClick = (e) => {
      const assetId = e.target.getAttribute('data-id');
      const assetName = e.target.getAttribute('data-assetname');
      const category = e.target.getAttribute('data-category');
      const assetToEdit = asset.find(a => a.id === parseInt(assetId));
      if (e.target.classList.contains('edit-btn')) {
        if (assetToEdit) {
          setFormData({
            id: assetToEdit.id,
            name: assetToEdit.name,
            description: assetToEdit.description,
            photo: assetToEdit.path_photo_asset,
            categoryId: assetToEdit.category?.id || ''
          });
          setIsEdit(true);
          setShowModal(true);
        } 
      } else if (e.target.classList.contains('detail-btn')) {
        navigate('/assetconditionhistory', { state: { assetId: parseInt(assetId), assetName: assetName, category: category} });
      }
    };
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [asset]);

  const handleSave = async () => {
    try {
      const payload = {
        id: formData.id,
        name: formData.name,
        description: formData.description,
        path_photo_asset: formData.photo,
        category: parseInt(formData.categoryId),
        assetStatus: 1
      };
      await saveAsset(payload);
      alert('Asset has been updated');
      refetch();
      setShowModal(false);
    } catch (err) {
      console.error('An error occurred during saving:', err);
    }
  };

  const tableData = asset.map((item, index) => [
    index + 1,
    item.name,
    item.description,
    item.category?.category || '-',
    item.path_photo_asset,
    `<div class="text-center">
      <button class="btn btn-sm btn-primary edit-btn" data-id="${item.id}">Edit</button>
      <button class="btn btn-sm btn-success detail-btn" 
        data-id="${item.id}" 
        data-assetname="${item.name}" 
        data-category="${item.category?.category || ''}">
        History
      </button>
    </div>`
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
    <div className="container mt-5">
      <h1 className="mb-4">Asset List</h1>

      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <Button variant={statusFilter === 0 ? 'primary' : 'outline-primary'} size="sm" className="me-2" onClick={() => setStatusFilter(0)}>All</Button>
          <Button variant={statusFilter === 2 ? 'primary' : 'outline-primary'} size="sm" className="me-2" onClick={() => setStatusFilter(2)}>Borrowed</Button>
          <Button variant={statusFilter === 1 ? 'primary' : 'outline-primary'} size="sm" onClick={() => setStatusFilter(1)}>Available</Button>
        </div>
        <Button variant="primary" size="sm" onClick={openAddModal}>+ Add Asset</Button>
      </div>

      <DataTable
        data={tableData}
        className="display table table-bordered"
        options={{ responsive: true, select: true, destroy: true }}
      >
        <thead>
          <tr>
            <th>No</th>
            <th>Asset</th>
            <th>Description</th>
            <th>Category</th>
            <th>Photo</th>
            <th className="text-center">Action</th>
          </tr>
        </thead>
      </DataTable>

      <AssetModal
        show={showModal}
        isEdit={isEdit}
        formData={formData}
        categories={categories}
        onHide={() => setShowModal(false)}
        onChange={setFormData}
        onSave={handleSave}
      />
    </div>
  );
};

export default Asset;