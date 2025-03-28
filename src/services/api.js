import axios from 'axios';

// Use environment variable or fallback to Render URL
const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://realtime-event-ticketing-platform-backend.onrender.com/api';

// Configure the ticketing system with provided settings
export const configureSystem = async (config) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/config`, config);
    return response.data;
  } catch (error) {
    console.error('configureSystem error:', error);
    throw error;
  }
};

// Start the ticketing system
export const startSystem = async () => {
  try {
    const response = await axios.post(`${API_BASE_URL}/start`);
    return response.data;
  } catch (error) {
    console.error('startSystem error:', error);
    throw error;
  }
};

// Stop the ticketing system
export const stopSystem = async () => {
  try {
    const response = await axios.post(`${API_BASE_URL}/stop`);
    return response.data;
  } catch (error) {
    console.error('stopSystem error:', error);
    throw error;
  }
};

// Reset the ticketing system
export const resetSystem = async () => {
  try {
    const response = await axios.post(`${API_BASE_URL}/reset`);
    return response.data;
  } catch (error) {
    console.error('resetSystem error:', error);
    throw error;
  }
};

// Clear logs in the system
export const clearLogs = async () => {
  try {
    const response = await axios.post(`${API_BASE_URL}/clear-logs`);
    return response.data;
  } catch (error) {
    console.error('clearLogs error:', error);
    throw error;
  }
};

// Get current status of tickets available
export const getStatus = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/status`);
    return response.data;
  } catch (error) {
    console.error('getStatus error:', error);
    throw error;
  }
};

// Retrieve logs from the backend
export const getLogs = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/logs`);
    return response.data;
  } catch (error) {
    console.error('getLogs error:', error);
    throw error;
  }
};

// Add a vendor with specified name and release rate
export const addVendor = async (name, releaseRate) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/vendor`, null, {
      params: { name, releaseRate },
    });
    return response.data;
  } catch (error) {
    console.error('addVendor error:', error);
    throw new Error('Failed to add vendor: ' + error.message);
  }
};

// Add a customer with specified name and retrieval rate
export const addCustomer = async (name, retrievalRate) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/customer`, null, {
      params: { name, retrievalRate },
    });
    return response.data;
  } catch (error) {
    console.error('addCustomer error:', error);
    throw new Error('Failed to add customer: ' + error.message);
  }
};