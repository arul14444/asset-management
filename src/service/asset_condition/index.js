import axios from "axios";
import { API_URL } from "../../url";

export const fetchAllAssetCondition = async () => {
    const { data } = await axios.get(`${API_URL}/api/assetcondition`);
    return data;
}

export const fetchAssetConditionById = async (assetConditionId) => {
    const { data } = await axios.get(`${API_URL}/api/assetcondition/${assetConditionId}`);
    return data;
}

export const saveAllAssetCondition = async (loaningId, payload) => {
    const { data } = await axios.post(`${API_URL}/api/assetcondition/${loaningId}`, payload);
    return data;
}