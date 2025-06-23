import axios from "axios"
import { API_URL } from "../../url"

const token = sessionStorage.getItem('auth');

export const fetchAllCategory = async () => {
    const { data } = await axios.get(`${API_URL}/api/category`, {
        headers: {
            Authorization: `Basic ${token}`
        }
    });
    return data;
}

export const fetchCategoryById = async (categoryId) => {
    const { data } = await axios.get(`${API_URL}/api/category/${categoryId}`, {
        headers: {
            Authorization: `Basic ${token}`
        }
    });
    return data;
}

export const saveCategory = async (payload) => {
    const { data } = await axios.post(`${API_URL}/api/category`, payload, {
        headers: {
            Authorization: `Basic ${token}`
        }
    });
    return data;
}