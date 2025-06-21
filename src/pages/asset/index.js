import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useQuery } from '@tanstack/react-query';
import { fetchAllAsset, fetchAssetByStatus, saveAsset } from '../../service/asset/index';
import Button from 'react-bootstrap/Button';

import DataTable from 'datatables.net-react';
import DT from 'datatables.net-bs5';
import { useNavigate } from 'react-router-dom';
import { Modal } from 'react-bootstrap';
import { fetchAllCategory } from '../../service/category';
import axios from 'axios';
DataTable.use(DT);

const Asset = () => {
    const navigate = useNavigate();
    const [asset, setAsset] = useState([]);
    const [statusFilter, setStatusFilter] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        photo: '',
        categoryId: '',
    });
    const [categories, setCategories] = useState([]);

    const { data: value, error, isLoading, refetch } = useQuery({
        queryKey: ['asset', statusFilter],
        queryFn: async () => {
            const res = statusFilter === 0
                ? await fetchAllAsset()
                : await fetchAssetByStatus(statusFilter);
            return res.data;
        }
    });

    useEffect(() => {
        if (value) {
            setAsset(value);
        }
    }, [value]);

    // Return Button
    useEffect(() => {
        const handleClick = (e) => {
            if (e.target.classList.contains('return-btn')) {
                const loaningId = e.target.getAttribute('data-id');
                const assetName = e.target.getAttribute('data-assetName');
                navigate('/assetcondition', {
                    state: { 
                        loaningId: parseInt(loaningId),
                        assetName: assetName
                    }
                });
            }
        };
        document.addEventListener('click', handleClick);
        return () => document.removeEventListener('click', handleClick);
    }, []);

    // Add Asset Modals
    const addAssetModals = () => setShowModal(true);
    const closeModal = () => setShowModal(false);

    useEffect(() => {
        const getCategories = async () => {
            try {
                const response = await fetchAllCategory();
                setCategories(response.data || []);
            } catch (err) {
                console.error("Failed to fetch categories", err)
            }
        };
        getCategories();
    }, []);

    const handleSave = async () => {
        try {
            const payload = {
                name : formData.name,
                description : formData.description,
                path_photo_asset : formData.photo,
                category: parseInt(formData.categoryId),
                assetStatus: 1
            };

            await saveAsset(payload);
            alert('Asset Has Been Added');
            refetch();

            setFormData({
                name: '',
                description: '',
                photo: '',
                categoryId: ''
            });

            closeModal();
        } catch (err) {
            console.log('An error occurred, please check the data again and resubmit')
        }    
    };

    if (isLoading) return <h1 className="text-center mt-4">Loading...</h1>;
    if (error) return <h1 className="text-center mt-4 text-danger">Failed to fetch Asset</h1>;

    // Transform data for DataTable
    const tableData = asset.map((item, index) => [
        index + 1,
        item.name,
        item.description,
        item.category?.category || '-',
        item.path_photo_asset,
        `<div class="text-center">
            ${
            statusFilter === 2
                ? `<button class="btn btn-sm btn-danger return-btn" data-id="${item.id}">Return</button>`
                : `<button class="btn btn-sm btn-danger return-btn disabled">Return</button>`
            }
        </div>`
    ]);

    return (
        <div className="container mt-5">
            <h1 className="mb-4">Asset List</h1>

            <div className="d-flex justify-content-between align-items-center mb-3">
                <div>
                    <Button
                        variant={statusFilter === 0 ? "primary" : "outline-primary"}
                        size="sm"
                        className="me-2"
                        onClick={() => setStatusFilter(0)}
                    >
                        All
                    </Button>
                    <Button
                        variant={statusFilter === 2 ? "primary" : "outline-primary"}
                        size="sm"
                        className="me-2"
                        onClick={() => setStatusFilter(2)}
                    >
                        Borrowed
                    </Button>
                    <Button
                        variant={statusFilter === 1 ? "primary" : "outline-primary"}
                        size="sm"
                        onClick={() => setStatusFilter(1)}
                    >
                        Available
                    </Button>
                </div>
                <div>
                    <Button
                        variant="primary"
                        size="sm"
                        onClick={() => addAssetModals()}
                    >
                        + Add Asset
                    </Button>
                </div>
            </div>

            <div>
                <DataTable
                    data={tableData}
                    className="display table table-bordered"
                    options={{
                        responsive: true,
                        select: true,
                        destroy: true
                    }}
                >
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Asset</th>
                            <th>Description</th>
                            <th>Category</th>
                            <th>Photo</th>
                            <th className='text-center'>Action</th>
                        </tr>
                    </thead>
                </DataTable>
            </div>

            {/* Modals */}
            <Modal show={showModal} onHide={closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Add New Asset</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div className="mb-3">
                            <label className="form-label">Name</label>
                            <input type="text" className="form-control" value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Description</label>
                            <textarea className="form-control" value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Photo Link</label>
                            <input type="text" className="form-control" value={formData.photo}
                                onChange={(e) => setFormData({ ...formData, photo: e.target.value })} />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Category</label>
                            <select className="form-select" value={formData.categoryId}
                                onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}>
                                <option value="">Select Category</option>
                                {categories.map(cat => (
                                    <option key={cat.id} value={cat.id}>{cat.category}</option>
                                ))}
                            </select>
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeModal}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={() => handleSave()}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default Asset;
