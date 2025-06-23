import axios from "axios";
import { API_URL } from "../../url";

const token = sessionStorage.getItem('auth');

export const fetchAllPart = async () => {
    const { data } = await axios.get(`${API_URL}/api/parts`, {
        headers: {
            Authorization: `Basic ${token}`
        }
    });
    return data;
}

export const fetchPartById = async (partId) => {
    const { data } = await axios.get(`${API_URL}/api/parts/${partId}`, {
        headers: {
            Authorization: `Basic ${token}`
        }
    });
    return data;
}