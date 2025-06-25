import axios from "axios";

const token = sessionStorage.getItem('auth');

export const fetchRegistration = async (credentials) => {
    const { data } = await axios.post(`http://localhost:9000/api/user-management/register`, credentials, {
        headers: {
            Authorization: `Basic ${token}`
        }
    });
    return data;
}

export const fetchDataManager = async () => {
    const { data } = await axios.get(`http://localhost:9000/api/user/getAllManager`);
    return data;
};

export const fetchLogin = async (credentials) => {
    const { data } = await axios.post(`http://localhost:9000/api/user-management/authentication/`, credentials);
    return data;
};

export const fetchChangePassword = async (credentials) => {
    const { data } = await axios.post(`http://localhost:9000/api/user-management/changePassword/`, credentials);
    return data;
};

export const fetchUpdateRole = async (credentials) => {
    const { data } = await axios.post(`http://localhost:9000/api/user-management/updateUserRole/`, credentials, {
        headers: {
            Authorization: `Basic ${token}`
        }
    });
    return data;
}
export const fetchGetRole = async () => {
    const { data } = await axios.get(`http://localhost:9000/api/role/getAllRoles/`);
    return data;
};

export const sendEmail = async () => {
    const { data } = await axios.get('http://localhost:9000/api/email/sendMail', {
        headers: {
            Authorization: `Basic ${token}`
        }
    });
    return data;
}