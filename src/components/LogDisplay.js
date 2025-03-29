import React, { useEffect, useState, useRef } from 'react';
import { getLogs, clearLogs } from '../services/api';
import './Styling/LogDisplay.css';

const LogDisplay = () => {
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [autoRefresh, setAutoRefresh] = useState(true);
    const logListRef = useRef(null);
    const intervalRef = useRef(null);

    const fetchLogs = async () => {
        setLoading(true);
        setError(null);
        try {
            const logData = await getLogs();
            setLogs(logData);
        } catch (error) {
            console.error('Error fetching logs:', error);
            setError('Failed to fetch logs. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const handleClearLogs = async () => {
        try {
            await clearLogs();
            setLogs([]);
        } catch (error) {
            setError(`Failed to clear logs: ${error.message}`);
        }
    };

    const toggleAutoRefresh = () => {
        setAutoRefresh(!autoRefresh);
    };

    useEffect(() => {
        // Initial fetch
        fetchLogs();
        
        // Set up or clear interval based on autoRefresh setting
        if (autoRefresh) {
            intervalRef.current = setInterval(fetchLogs, 3000);
        } else if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
        
        // Cleanup function
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [autoRefresh]);

    useEffect(() => {
        // Auto-scroll to bottom when logs update
        if (logListRef.current) {
            logListRef.current.scrollTop = logListRef.current.scrollHeight;
        }
    }, [logs]);

    return (
        <div className="log-display">
            <div className="controls">
                <h2>System Logs</h2>
                <div>
                    <button 
                        className="button refresh-button" 
                        onClick={fetchLogs} 
                        disabled={loading}
                    >
                        {loading ? 'Loading...' : 'Refresh Now'}
                    </button>
                    <button 
                        className={`button auto-refresh-button ${!autoRefresh ? 'off' : ''}`}
                        onClick={toggleAutoRefresh}
                    >
                        {autoRefresh ? 'Auto-Refresh On' : 'Auto-Refresh Off'}
                    </button>
                    <button 
                        className="button clear-button"
                        onClick={handleClearLogs}
                        disabled={loading}
                    >
                        Clear Logs
                    </button>
                </div>
            </div>
            
            {error && <p className="error">{error}</p>}
            
            <div className="log-legend">
                <div className="log-legend-item">
                    <span className="log-legend-color" style={{ backgroundColor: '#28a745' }}></span>
                    <span>Vendor</span>
                </div>
                <div className="log-legend-item">
                    <span className="log-legend-color" style={{ backgroundColor: '#007bff' }}></span>
                    <span>Customer</span>
                </div>
                <div className="log-legend-item">
                    <span className="log-legend-color" style={{ backgroundColor: '#dc3545' }}></span>
                    <span>Cancellation</span>
                </div>
                <div className="log-legend-item">
                    <span className="log-legend-color" style={{ backgroundColor: '#6f42c1' }}></span>
                    <span>Admin</span>
                </div>
                <div className="log-legend-item">
                    <span className="log-legend-color" style={{ backgroundColor: '#17a2b8' }}></span>
                    <span>System</span>
                </div>
            </div>
            
            <div ref={logListRef} className="log-list">
                {logs.length > 0 ? (
                    logs.map((log, index) => {
                        if (!log) return null; // Skip if log is undefined or null

                        const logParts = log.split(' '); // Split log into parts
                        
                        // Extract date and time (first two parts)
                        const dateTime = `${logParts[0]} ${logParts[1]}`;
                        
                        // Extract log level (third part, remove colon)
                        let level = logParts[2]?.replace(':', '');
                        
                        // Determine log type for styling
                        let logType = 'info'; // Default
                        if (level === 'VENDOR') logType = 'vendor';
                        else if (level === 'CUSTOMER') logType = 'customer';
                        else if (level === 'CANCEL') logType = 'cancel';
                        else if (level === 'ADMIN') logType = 'admin';
                        else if (level === 'SYSTEM') logType = 'system';
                        else if (level === 'WARNING') logType = 'warning';
                        else if (level === 'SEVERE') logType = 'error';
                        
                        // Join the rest as message
                        const message = logParts.slice(3).join(' ');

                        return (
                            <div key={index} className={`log-entry ${logType}`}>
                                <strong>{dateTime}</strong> <span className="log-level">{level}:</span> {message}
                            </div>
                        );
                    })
                ) : (
                    !loading && <p>No logs available yet. Start the system to generate logs.</p>
                )}
                {loading && logs.length === 0 && <p className="loading">Loading logs...</p>}
            </div>
            
            <div className="log-stats">
                <span>Total logs: {logs.length}</span>
                <span>{autoRefresh ? 'Auto-refreshing every 3 seconds' : 'Auto-refresh disabled'}</span>
            </div>
        </div>
    );
};

export default LogDisplay;