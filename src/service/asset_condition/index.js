import axios from "axios";
import { API_URL } from "../../url";

const token = sessionStorage.getItem('auth');

export const fetchAllAssetCondition = async () => {
    const { data } = await axios.get(`${API_URL}/api/assetcondition`, {
        headers: {
            Authorization: `Basic ${token}`
        }
    });
    return data;
}

export const fetchAssetConditionById = async (assetConditionId) => {
    const { data } = await axios.get(`${API_URL}/api/assetcondition/${assetConditionId}`, {
        headers: {
            Authorization: `Basic ${token}`
        }
    });
    return data;
}

export const saveAllAssetCondition = async (loaningId, payload) => {
    const { data } = await axios.post(`${API_URL}/api/assetcondition/${loaningId}`, payload, {
        headers: {
            Authorization: `Basic ${token}`
        }
    });
    return data;
}