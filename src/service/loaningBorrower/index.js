import { API_URL } from "../../env";
import axios from "axios";

const token = sessionStorage.getItem('auth');

export const fetchLoaningList = async (id) => {
  const { data } = await axios.get(`${API_URL}/api/loaning/borrower/${id}`,{
        headers: {
            Authorization: `Basic ${token}`
        }
    })
    return data;
};