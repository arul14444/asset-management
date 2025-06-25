import axios from "axios";
import { API_URL } from "../../env";

const token = sessionStorage.getItem('auth');

export const fetchAsset = async () => {
  const { data } = await axios.get(`${API_URL}/api/asset/status/1`,{
        headers: {
            Authorization: `Basic ${token}`
        }
    })
    return data;
};

export const fetchPostLoaning = async (loaningData) => {
  const { data } = await axios.post(`${API_URL}/api/loaning`, loaningData,{
        headers: {
            Authorization: `Basic ${token}`
        }
    })
    return data;
};



