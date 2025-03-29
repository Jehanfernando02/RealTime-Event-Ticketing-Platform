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
            console.log('Fetched logs:', logData);
            
            // Ensure logData is an array
            if (Array.isArray(logData)) {
                setLogs(logData);
            } else {
                console.error('Unexpected log data format:', logData);
                setLogs([]);
            }
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

    // Function to determine log type from log message
    const getLogTypeFromMessage = (log) => {
        if (!log || typeof log !== 'string') return 'info';
        
        if (log.includes('VENDOR:')) return 'vendor';
        if (log.includes('CUSTOMER:')) return 'customer';
        if (log.includes('CANCEL:')) return 'cancel';
        if (log.includes('ADMIN:')) return 'admin';
        if (log.includes('SYSTEM:')) return 'system';
        if (log.includes('WARNING:')) return 'warning';
        if (log.includes('SEVERE:') || log.includes('ERROR:')) return 'error';
        
        return 'info';
    };

    return (
        <div className="log-display">
            <div className="log-header">
                <h2>System Logs</h2>
                <div className="log-controls">
                    <button 
                        className="log-button refresh-button" 
                        onClick={fetchLogs} 
                        disabled={loading}
                    >
                        {loading ? 'Loading...' : 'Refresh Now'}
                    </button>
                    <button 
                        className={`log-button auto-refresh-button ${!autoRefresh ? 'off' : ''}`}
                        onClick={toggleAutoRefresh}
                    >
                        {autoRefresh ? 'Auto-Refresh On' : 'Auto-Refresh Off'}
                    </button>
                    <button 
                        className="log-button clear-button"
                        onClick={handleClearLogs}
                        disabled={loading}
                    >
                        Clear Logs
                    </button>
                </div>
            </div>
            
            {error && <div className="log-error">{error}</div>}
            
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
            
            <div ref={logListRef} className="log-container">
                {logs && logs.length > 0 ? (
                    logs.map((log, index) => {
                        if (!log) return null;
                        
                        // Determine log type for styling
                        const logType = getLogTypeFromMessage(log);
                        
                        return (
                            <div key={index} className={`log-entry ${logType}`}>
                                {log}
                            </div>
                        );
                    })
                ) : (
                    <div className="log-empty">
                        {loading ? 'Loading logs...' : 'No logs available yet. Start the system to generate logs.'}
                    </div>
                )}
            </div>
            
            <div className="log-stats">
                <span>Total logs: {logs ? logs.length : 0}</span>
                <span>{autoRefresh ? 'Auto-refreshing every 3 seconds' : 'Auto-refresh disabled'}</span>
            </div>
        </div>
    );
};

export default LogDisplay;