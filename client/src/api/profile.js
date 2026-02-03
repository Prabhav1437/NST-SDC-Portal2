import api from './axios';

// Get current user profile
export const getProfile = async () => {
    const response = await api.get('auth/profile/');
    return response.data;
};

// Update user profile
export const updateProfile = async (data) => {
    const response = await api.patch('auth/profile/', data);
    return response.data;
};

// Get projects for a specific user
export const getUserProjects = async (userId) => {
    const response = await api.get(`users/${userId}/projects/`);
    return response.data;
};
