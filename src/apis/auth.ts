import axios from 'axios';

const API_URL = 'https://ia-04-be-production.up.railway.app/auth';

export const register = (email: string, password: string) => {
    return axios.post(
        `${API_URL}/register`,
        { email, password },
        { withCredentials: true }  // Đảm bảo gửi cookie hoặc token cùng yêu cầu nếu cần
    );
};

export const login = (email: string, password: string) => {
    return axios.post(
        `${API_URL}/login`,
        { email, password },
        { withCredentials: true }  // Đảm bảo gửi cookie hoặc token cùng yêu cầu nếu cần
    );
};

export const getProfile = (token: string) => {
    return axios.get(
        `${API_URL}/profile`,
        {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true  // Đảm bảo gửi cookie hoặc token cùng yêu cầu nếu cần
        }
    );
};
