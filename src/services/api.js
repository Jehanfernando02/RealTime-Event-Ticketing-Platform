import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://realtime-event-ticketing-platform-backend.onrender.com/api';

export const configureSystem = async (config) => {
    const response = await axios.post(`${API_BASE_URL}/config`, config);
    return response.data;  
};

export const startSystem = async () => {
    const response = await axios.post(`${API_BASE_URL}/start`);
    return response.data;  
};

export const stopSystem = async () => {
    const response = await axios.post(`${API_BASE_URL}/stop`);
    return response.data;  
};

export const resetSystem = async () => {
    const response = await axios.post(`${API_BASE_URL}/reset`);
    return response.data;  
};

export const clearLogs = async () => {  
    const response = await axios.post(`${API_BASE_URL}/clear-logs`);
    return response.data;  
};

export const getStatus = async () => {
    const response = await axios.get(`${API_BASE_URL}/status`);
    return response.data;  
};

export const getLogs = async () => {
    const response = await axios.get(`${API_BASE_URL}/logs`);
    return response.data;  
};

export const addVendor = async (name, releaseRate) => {
    const response = await fetch(`${API_BASE_URL}/vendor?name=${name}&releaseRate=${releaseRate}`, { method: 'POST' });
    if (!response.ok) {
        throw new Error('Failed to add vendor');
    }
};

export const addCustomer = async (name, retrievalRate) => {
    const response = await fetch(`${API_BASE_URL}/customer?name=${name}&retrievalRate=${retrievalRate}`, { method: 'POST' });
    if (!response.ok) {
        throw new Error('Failed to add customer');
    }
};