import axios from 'axios';

// Use environment variable or fallback to Render URL
const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://realtime-event-ticketing-platform-backend.onrender.com/api';

// Function to configure the ticketing system with provided settings.
export const configureSystem = async (config) => {
    const response = await axios.post(`${API_BASE_URL}/config`, config);
    return response.data;  
};

// Function to start the ticketing system.
export const startSystem = async () => {
    const response = await axios.post(`${API_BASE_URL}/start`);
    return response.data;  
};

// Function to stop the ticketing system.
export const stopSystem = async () => {
    const response = await axios.post(`${API_BASE_URL}/stop`);
    return response.data;  
};

// Function to reset the ticketing system.
export const resetSystem = async () => {
    const response = await axios.post(`${API_BASE_URL}/reset`);
    return response.data;  
};

// Function to clear logs in the system.
export const clearLogs = async () => {  
    const response = await axios.post(`${API_BASE_URL}/clear-logs`);
    return response.data;  
};

// Function to get current status of tickets available.
export const getStatus = async () => {
    const response = await axios.get(`${API_BASE_URL}/status`);
    return response.data;  
};

// Function to retrieve logs from the backend.
export const getLogs = async () => {
    const response = await axios.get(`${API_BASE_URL}/logs`);
    return response.data;  
};

// Function to add a vendor with specified name and release rate.
export const addVendor = async (name, releaseRate) => {
    const response = await fetch(`${API_BASE_URL}/vendor?name=${name}&releaseRate=${releaseRate}`, { method: 'POST' });
    
    // Check for successful response and throw an error if not.
    if (!response.ok) {
        throw new Error('Failed to add vendor');
    }
};

// Function to add a customer with specified name and retrieval rate.
export const addCustomer = async (name, retrievalRate) => {
    const response = await fetch(`${API_BASE_URL}/customer?name=${name}&retrievalRate=${retrievalRate}`, { method: 'POST' });
    
    // Check for successful response and throw an error if not.
    if (!response.ok) {
        throw new Error('Failed to add customer');
    }
};