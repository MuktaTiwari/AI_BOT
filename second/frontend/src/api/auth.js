// src/api/auth.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000';

export const registerUser = async (userData) => {
    return await axios.post(`${API_BASE_URL}/auth/signup`, userData, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
};

export const loginUser = async (credentials) => {
    try {
        const response = await axios.post(
            `${API_BASE_URL}/auth/login`, 
            credentials, 
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );
        return response;
    } catch (error) {
        // Throw the error with the server's error message
        throw new Error(error.response?.data?.message || error.message);
    }
};


export const createAIbot = async (botData) => {
    try {
        const response = await axios.post(
            `${API_BASE_URL}/ai/create`,
            botData,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            }
        );
        
        if (!response.data) {
            throw new Error('Empty response from server');
        }
        
        return response.data;
    } catch (error) {
        const errorMsg = error.response?.data?.message || 
                        error.response?.data?.error || 
                        error.message;
        throw new Error(errorMsg);
    }
};

// Add this interceptor to automatically add the token to requests
axios.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});