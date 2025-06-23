import axios from "axios"
import { API_URL } from "../../url";

const token = sessionStorage.getItem('auth');

export const fetchAllAsset = async () => {
    const { data } = await axios.get(`${API_URL}/api/asset`, {
        headers: {
            Authorization: `Basic ${token}`
        }
    })
    return data;
}

export const fetchAssetById = async (assetId) => {
    const { data } = await axios.get(`${API_URL}/api/asset/${assetId}`, {
        headers: {
            Authorization: `Basic ${token}`
        }
    });
    return data;
}

export const fetchAssetByStatus = async (statusId) => {
    const { data } = await axios.get(`${API_URL}/api/asset/status/${statusId}`, {
        headers: {
            Authorization: `Basic ${token}`
        }
    });
    return data;
};

export const saveAsset = async (payload) => {
  const { data } = await axios.post(`${API_URL}/api/asset`, payload, {
        headers: {
            Authorization: `Basic ${token}`
        }
    });
  return data;
}