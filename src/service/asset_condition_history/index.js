import axios from "axios";
import { API_URL } from "../../url";

const token = sessionStorage.getItem('auth');

export const fetchAssetConditionByAssetId = async (assetId) => {
    const { data } = await axios.get(`${API_URL}/api/assetcondition/asset/${assetId}`, {
        headers: {
            Authorization: `Basic ${token}`
        }
    });
    return data;
}