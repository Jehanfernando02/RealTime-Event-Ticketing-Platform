import React, { useEffect, useState, useRef } from 'react';
import { getLogs } from '../services/api';

const LogDisplay = () => {
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const logListRef = useRef(null);

    const fetchLogs = async () => {
        setLoading(true);
        setError(null);
        try {
            const logData = await getLogs();
            console.log('Fetched Logs:', logData); // Debug log
            setLogs(Array.isArray(logData) ? logData : []);
        } catch (error) {
            console.error('Error fetching logs:', error);
            setError(`Failed to fetch logs: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLogs(); // Initial fetch
        const intervalId = setInterval(fetchLogs, 3000); // Poll every 3 seconds
        return () => clearInterval(intervalId); // Cleanup
    }, []);

    useEffect(() => {
        if (logListRef.current) {
            logListRef.current.scrollTop = logListRef.current.scrollHeight; // Auto-scroll
        }
    }, [logs]);

    return (
        <div style={{ padding: '10px', border: '1px solid #ccc', margin: '10px' }}>
            <h2>Log Display</h2>
            {loading && <p>Loading logs...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {logs.length > 0 ? (
                <div
                    ref={logListRef}
                    style={{ maxHeight: '300px', overflowY: 'auto', border: '1px solid #ddd', padding: '10px' }}
                >
                    {logs.map((log, index) => (
                        <div key={index} style={{ marginBottom: '5px', wordWrap: 'break-word' }}>
                            {log}
                        </div>
                    ))}
                </div>
            ) : (
                !loading && <p>No logs available yet. Start the system to generate logs.</p>
            )}
        </div>
    );
};

export default LogDisplay;