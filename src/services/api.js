import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://realtime-event-ticketing-platform-backend.onrender.com/api';

export const configureSystem = async (config) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/config`, config);
        return response.data;
    } catch (error) {
        console.error('configureSystem error:', error);
        throw error;
    }
};

export const startSystem = async () => {
    try {
        const response = await axios.post(`${API_BASE_URL}/start`);
        return response.data;
    } catch (error) {
        console.error('startSystem error:', error);
        throw error;
    }
};

export const stopSystem = async () => {
    try {
        const response = await axios.post(`${API_BASE_URL}/stop`);
        return response.data;
    } catch (error) {
        console.error('stopSystem error:', error);
        throw error;
    }
};

export const resetSystem = async () => {
    try {
        const response = await axios.post(`${API_BASE_URL}/reset`);
        return response.data;
    } catch (error) {
        console.error('resetSystem error:', error);
        throw error;
    }
};

export const clearLogs = async () => {
    try {
        const response = await axios.post(`${API_BASE_URL}/clear-logs`);
        return response.data;
    } catch (error) {
        console.error('clearLogs error:', error);
        throw error;
    }
};

export const getStatus = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/status`);
        return response.data;
    } catch (error) {
        console.error('getStatus error:', error);
        throw error;
    }
};

export const getLogs = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/logs`);
        console.log('API Logs Response:', response);
        
        // Ensure we're returning the data property
        if (response && response.data) {
            return response.data;
        } else {
            console.error('Unexpected response format:', response);
            return [];
        }
    } catch (error) {
        console.error('getLogs error:', error);
        // Add more detailed error logging
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.error('Error response data:', error.response.data);
            console.error('Error response status:', error.response.status);
        } else if (error.request) {
            // The request was made but no response was received
            console.error('Error request:', error.request);
        }
        throw error;
    }
};

export const addVendor = async (name, releaseRate) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/vendor`, null, {
            params: { name, releaseRate },
        });
        return response.data;
    } catch (error) {
        console.error('addVendor error:', error);
        throw error;
    }
};

export const addCustomer = async (name, retrievalRate) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/customer`, null, {
            params: { name, retrievalRate },
        });
        return response.data;
    } catch (error) {
        console.error('addCustomer error:', error);
        throw error;
    }
};