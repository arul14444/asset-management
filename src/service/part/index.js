import axios from "axios";
import { API_URL } from "../../url";

export const fetchAllPart = async () => {
    const { data } = await axios.get(`${API_URL}/api/parts`);
    return data;
}

export const fetchPartById = async (partId) => {
    const { data } = await axios.get(`${API_URL}/api/parts/${partId}`);
    return data;
}