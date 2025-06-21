import React, { useState } from "react";
import { Form } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { fetchAsset, fetchPostLoaning } from "../../service/loanigRequest";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const FormLoaning = () => {
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState({
    name: 'jono',
    email: 'jono@mail.com',
    employee: '2',
    asset: '',
    note: ''
  });

  const {
    data: assetData,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["asset"],
    queryFn: fetchAsset,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetchPostLoaning(formData);
      console.log("Submit response:", formData);
      alert("Loaning submitted successfully!");
      console.log("Response:", response.data);

      queryClient.invalidateQueries(["asset"]);

      // Reset asset dan note, bukan name/email
      setFormData(prev => ({
        ...prev,
        asset: "",
        note: "",
      }));
    } catch (err) {
      console.error("Submit error:", err);
      alert("Failed to submit loaning.");
    }
  };

  const assetsRaw = assetData?.data;
  const assets = Array.isArray(assetsRaw)
    ? assetsRaw.filter(item => item != null)
    : assetsRaw ? [assetsRaw] : [];

  if (isLoading) return <h1>Loading...</h1>;
  if (error) return <h1>Server not responding</h1>;

  return (
    <div className="form-loaning m-5">
      <h1>Loaning Request</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={formData.name}
            disabled
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={formData.email}
            disabled
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formAsset">
          <Form.Label>Asset</Form.Label>
          <Form.Select
            name="asset"
            value={formData.asset}
            onChange={handleChange}
            required
          >
            <option value="">Please select the asset to be borrowed</option>
            {assets?.length > 0 &&
              assets
                .filter(asset => asset && asset.id)
                .map(asset => (
                  <option key={asset.id} value={asset.id}>
                    {asset.name}
                  </option>
                ))}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formNote">
          <Form.Label>Note</Form.Label>
          <Form.Control
            type="text"
            name="note"
            value={formData.note}
            onChange={handleChange}
            placeholder="Please provide the reason for the loan"
            required
          />
        </Form.Group>

        <div className="d-flex justify-content-end">
          <button type="submit" className="btn btn-primary">Submit</button>
        </div>
      </Form>
    </div>
  );
};

export default FormLoaning;
