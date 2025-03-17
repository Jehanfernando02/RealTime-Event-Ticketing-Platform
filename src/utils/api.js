import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8000/api", // Make sure this matches your backend port
});

export const getTicketData = async () => {
    try {
        const response = await api.get("/status"); // Adjust endpoint as necessary
        return response.data;
    } catch (error) {
        console.error("API error:", error);
        throw error;
    }
};

export default api;
