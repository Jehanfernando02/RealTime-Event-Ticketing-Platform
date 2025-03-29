import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://realtime-event-ticketing-platform-backend.onrender.com/api';

// Create an axios instance with default settings
const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});

// Add response interceptor for debugging
apiClient.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        console.error('API Error:', error.response || error);
        return Promise.reject(error);
    }
);

export const configureSystem = async (config) => {
    try {
        const response = await apiClient.post('/config', config);
        return response.data;
    } catch (error) {
        console.error('configureSystem error:', error);
        throw error;
    }
};

export const startSystem = async () => {
    try {
        const response = await apiClient.post('/start');
        return response.data;
    } catch (error) {
        console.error('startSystem error:', error);
        throw error;
    }
};

export const stopSystem = async () => {
    try {
        const response = await apiClient.post('/stop');
        return response.data;
    } catch (error) {
        console.error('stopSystem error:', error);
        throw error;
    }
};

export const resetSystem = async () => {
    try {
        const response = await apiClient.post('/reset');
        return response.data;
    } catch (error) {
        console.error('resetSystem error:', error);
        throw error;
    }
};

export const clearLogs = async () => {
    try {
        const response = await apiClient.post('/clear-logs');
        return response.data;
    } catch (error) {
        console.error('clearLogs error:', error);
        throw error;
    }
};

export const getStatus = async () => {
    try {
        const response = await apiClient.get('/status');
        return response.data;
    } catch (error) {
        console.error('getStatus error:', error);
        throw error;
    }
};

export const getLogs = async () => {
    try {
        const response = await apiClient.get('/logs');
        return response.data;
    } catch (error) {
        console.error('getLogs error:', error);
        throw error;
    }
};

export const addVendor = async (name, releaseRate) => {
    try {
        const response = await apiClient.post('/vendor', null, {
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
        const response = await apiClient.post('/customer', null, {
            params: { name, retrievalRate },
        });
        return response.data;
    } catch (error) {
        console.error('addCustomer error:', error);
        throw error;
    }
};