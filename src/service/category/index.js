import axios from "axios"
import { API_URL } from "../../url"

export const fetchAllCategory = async () => {
    const { data } = await axios.get(`${API_URL}/api/category`);
    return data;
}

export const fetchCategoryById = async (categoryId) => {
    const { data } = await axios.get(`${API_URL}/api/category/${categoryId}`);
    return data;
}

export const saveCategory = async (payload) => {
    const { data } = await axios.post(`${API_URL}/api/category`, payload);
    return data;
}