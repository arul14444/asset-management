import axios from "axios";
import { API_URL } from "../../env";

export const fetchLoaningList = async () => {
  const { data } = await axios.get(`${API_URL}/api/loaning/approver-2`);
  return data;
};

export const fetchPostApprove = async (approverData) => {
  const { data } = await axios.post(`${API_URL}/api/loaning/approver`, approverData);
  return data;
};



