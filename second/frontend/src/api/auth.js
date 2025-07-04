// src/api/auth.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000';

export const registerUser = async (userData) => {
    return await axios.post(`${API_BASE_URL}/auth/signup`, userData, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}