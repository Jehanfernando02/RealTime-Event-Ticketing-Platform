import React, { useEffect, useState } from 'react';
import { getLogs } from '../services/api'; 
import './Styling/LogDisplay.css'; 

const LogDisplay = () => {
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchLogs = async () => {
            setLoading(true);
            setError(null);
            try {
                const logData = await getLogs(); // Fetch logs from the backend
                setLogs(logData); // Assuming logData is an array of log messages
            } catch (error) {
                console.error('Error fetching logs:', error);
                setError('Failed to fetch logs. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchLogs(); // Initial fetch
        const intervalId = setInterval(fetchLogs, 3000); // Poll every 3 seconds

        return () => clearInterval(intervalId); // Cleanup on unmount
    }, []);

    return (
        <div className="log-display">
            <h2>Log Display</h2>
            {loading && <p className="loading">Loading logs...</p>}
            {error && <p className="error">{error}</p>}
            {logs.length > 0 ? (
                <div className="log-list">
                    {logs.map((log, index) => {
                        if (!log) return null; // Skip if log is undefined or null

                        const logParts = log.split(' '); // Split log into parts
                        const dateTime = `${logParts[0]} ${logParts[1]}`; // Extract date and time
                        const level = logParts[2]?.replace(':', ''); // Extract log level (remove colon), safely access level
                        const message = logParts.slice(3).join(' '); // Join the rest as message

                        // Check if level is defined before using it
                        const logLevelClass = level ? level.toLowerCase() : 'unknown'; // Default to 'unknown' if level is not defined

                        return (
                            <div key={index} className={`log-entry ${logLevelClass}`}>
                                <strong>{dateTime}</strong> <span className="log-level">{level}:</span> {message}
                            </div>
                        );
                    })}
                </div>
            ) : (
                !loading && <p>No logs available yet.</p>
            )}
        </div>
    );
};

export default LogDisplay;





