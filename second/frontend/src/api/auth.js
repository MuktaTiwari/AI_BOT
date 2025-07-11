// src/api/auth.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080';

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


export const getAIbotList = async (userId) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/ai/bots`,
      {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        params: { userId }
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


 export const getAllAIBot =  async ()=>{

    try
    {
        const response = await axios.get(`${API_BASE_URL}/ai/getall`);
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

export const getTotalBots = async () => {
    try {
        const response = await axios.get(
            `${API_BASE_URL}/ai/total-bots`);
        
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

export const updateAIbot = async (id, botData) => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/ai/update/${id}`,
      botData,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      }
    );
    
    if (response.status !== 200) {
      throw new Error(response.data.message || 'Failed to update bot');
    }
    
    return response.data;
  } catch (error) {
    let errorMsg = 'Failed to update bot';
    if (error.response) {
      errorMsg = error.response.data.message || 
                error.response.data.error || 
                errorMsg;
    } else if (error.request) {
      errorMsg = 'No response from server';
    }
    throw new Error(errorMsg);
  }
}

export const deleteAIbot = async (id) => {
    try {
        const response = await axios.delete(
            `${API_BASE_URL}/ai/delete?id=${id}`,
            {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            }
        );
        
        if (response.status !== 200) {
            throw new Error(response.data.message || 'Failed to delete bot');
        }
        
        return response.data;
    } catch (error) {
        let errorMsg = 'Failed to delete bot';
        if (error.response) {
            errorMsg = error.response.data.message || 
                        error.response.data.error || 
                        errorMsg;
        } else if (error.request) {
            errorMsg = 'No response from server';
        }
        throw new Error(errorMsg);
    }
};

export const getAllUsers = async () => {
    try {
        const response = await axios.get(
            `${API_BASE_URL}/auth/user`,
            {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            }
        );
        
        console.log('API Response:', response.data); // Log the actual response
        
        if (!response.data) {
            throw new Error('Empty response from server');
        }
        
        // The response has { success: true, data: [...] } structure
        if (response.data.success && Array.isArray(response.data.data)) {
            return response.data.data.map(user => ({
                _id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                mobileNo: user.mobileNo,
                userType: user.userType
            }));
        }
        
        throw new Error('Unexpected response format from server');
    } catch (error) {
        console.error('Error in getAllUsers:', error);
        const errorMsg = error.response?.data?.message || 
                        error.response?.data?.error || 
                        error.message;
        throw new Error(errorMsg);
    }
}


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