import api from '../api/client';

export const login = async (email, password) => {
    try {
        const { data } = await api.post('/auth/login', { email, password });
        localStorage.setItem('token', data['access_token']);
        return data;
    } catch (error) {
        throw error;
    }
};

export const register = async (name, email, password) => {
    try {
        const { data } = await api.post('/auth/register', { name, email, password });
        return data;
    } catch (error) {
        throw error;
    }
};

export const logout = () => {
    localStorage.removeItem('token');
};
