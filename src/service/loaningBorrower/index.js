import { API_URL } from "../../env";
import axios from "axios";

export const fetchLoaningList = async (id) => {
  const { data } = await axios.get(`${API_URL}/api/loaning/borrower/${id}`);
  return data;
};