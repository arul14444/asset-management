import axios from "axios"
import { API_URL } from "../../url";

export const fetchAllAsset = async () => {
    const { data } = await axios.get(`${API_URL}/api/asset`);
    return data;
}

export const fetchAssetById = async (assetId) => {
    const { data } = await axios.get(`${API_URL}/api/asset/${assetId}`);
    return data;
}

export const fetchAssetByStatus = async (statusId) => {
    const { data } = await axios.get(`${API_URL}/api/asset/status/${statusId}`);
    return data;
};

export const saveAsset = async (payload) => {
  const { data } = await axios.post(`${API_URL}/api/asset`, payload);
  return data;
}