import api from './axios';

export const loginUser = async (username, password) => {
    const response = await api.post('auth/login/', { username, password });
    return response.data;
};

export const logoutUser = async () => {
    const response = await api.post('auth/logout/');
    return response.data;
};

export const changePassword = async (data) => {
    const response = await api.post('auth/password/change/', data);
    return response.data;
};
