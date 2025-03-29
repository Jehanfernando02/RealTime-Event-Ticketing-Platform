import React, { useEffect, useState, useRef } from 'react';
import { getLogs, clearLogs } from '../services/api';

const LogDisplay = () => {
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(false);
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
            
            // Handle different response formats
            if (Array.isArray(logData)) {
                setLogs(logData);
            } else if (typeof logData === 'string') {
                setLogs([{ type: 'INFO', message: logData }]);
            } else if (logData && typeof logData === 'object') {
                if (Array.isArray(logData.data)) {
                    setLogs(logData.data);
                } else {
                    setLogs([{ type: 'INFO', message: JSON.stringify(logData) }]);
                }
            } else {
                setLogs([]);
            }
        } catch (error) {
            console.error('Error fetching logs:', error);
            setError(`Failed to fetch logs: ${error.message || 'Unknown error'}`);
        } finally {
            setLoading(false);
        }
    };

    const handleClearLogs = async () => {
        try {
            await clearLogs();
            setLogs([]); // Clear logs immediately in UI
            await fetchLogs(); // Then refresh from server
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

    // Function to get log style based on type
    const getLogStyle = (type) => {
        switch (type) {
            case 'VENDOR':
                return { 
                    color: '#28a745', // Green
                    fontWeight: 'bold'
                };
            case 'CUSTOMER':
                return { 
                    color: '#007bff', // Blue
                    fontWeight: 'normal'
                };
            case 'CANCEL':
                return { 
                    color: '#dc3545', // Red
                    fontWeight: 'normal'
                };
            case 'ADMIN':
                return { 
                    color: '#6f42c1', // Purple
                    fontWeight: 'bold'
                };
            case 'ERROR':
                return { 
                    color: '#dc3545', // Red
                    fontWeight: 'bold'
                };
            case 'WARNING':
                return { 
                    color: '#ffc107', // Yellow
                    fontWeight: 'bold'
                };
            case 'SYSTEM':
                return { 
                    color: '#17a2b8', // Teal
                    fontWeight: 'normal'
                };
            default:
                return { 
                    color: '#6c757d', // Gray
                    fontWeight: 'normal'
                };
        }
    };

    return (
        <div className="log-display" style={{ 
            padding: '15px', 
            border: '1px solid #ccc', 
            borderRadius: '5px',
            margin: '15px 0',
            backgroundColor: '#f8f8f8' 
        }}>
            <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                marginBottom: '15px' 
            }}>
                <h2 style={{ margin: 0 }}>System Logs</h2>
                <div>
                    <button 
                        onClick={fetchLogs} 
                        disabled={loading}
                        style={{ 
                            marginRight: '10px',
                            padding: '8px 12px',
                            backgroundColor: '#007bff',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: loading ? 'not-allowed' : 'pointer'
                        }}
                    >
                        {loading ? 'Loading...' : 'Refresh Now'}
                    </button>
                    <button 
                        onClick={toggleAutoRefresh}
                        style={{ 
                            marginRight: '10px',
                            padding: '8px 12px',
                            backgroundColor: autoRefresh ? '#28a745' : '#6c757d',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer'
                        }}
                    >
                        {autoRefresh ? 'Auto-Refresh On' : 'Auto-Refresh Off'}
                    </button>
                    <button 
                        onClick={handleClearLogs}
                        style={{ 
                            padding: '8px 12px',
                            backgroundColor: '#dc3545',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: loading ? 'not-allowed' : 'pointer'
                        }}
                        disabled={loading}
                    >
                        Clear Logs
                    </button>
                </div>
            </div>
            
            {error && (
                <div style={{ 
                    color: '#721c24', 
                    backgroundColor: '#f8d7da', 
                    padding: '10px 15px', 
                    marginBottom: '15px', 
                    borderRadius: '4px',
                    border: '1px solid #f5c6cb'
                }}>
                    {error}
                </div>
            )}
            
            <div style={{ 
                marginBottom: '10px',
                display: 'flex',
                flexWrap: 'wrap',
                gap: '10px'
            }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <span style={{ 
                        display: 'inline-block', 
                        width: '12px', 
                        height: '12px', 
                        backgroundColor: '#28a745', 
                        marginRight: '5px',
                        borderRadius: '2px'
                    }}></span>
                    <span>Vendor</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <span style={{ 
                        display: 'inline-block', 
                        width: '12px', 
                        height: '12px', 
                        backgroundColor: '#007bff', 
                        marginRight: '5px',
                        borderRadius: '2px'
                    }}></span>
                    <span>Customer</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <span style={{ 
                        display: 'inline-block', 
                        width: '12px', 
                        height: '12px', 
                        backgroundColor: '#dc3545', 
                        marginRight: '5px',
                        borderRadius: '2px'
                    }}></span>
                    <span>Cancellation</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <span style={{ 
                        display: 'inline-block', 
                        width: '12px', 
                        height: '12px', 
                        backgroundColor: '#6f42c1', 
                        marginRight: '5px',
                        borderRadius: '2px'
                    }}></span>
                    <span>Admin</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <span style={{ 
                        display: 'inline-block', 
                        width: '12px', 
                        height: '12px', 
                        backgroundColor: '#17a2b8', 
                        marginRight: '5px',
                        borderRadius: '2px'
                    }}></span>
                    <span>System</span>
                </div>
            </div>
            
            <div 
                ref={logListRef}
                style={{ 
                    height: '400px',
                    overflowY: 'auto',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    padding: '10px',
                    backgroundColor: '#fff',
                    fontFamily: 'monospace',
                    fontSize: '14px'
                }}
            >
                {logs.length > 0 ? (
                    logs.map((log, index) => {
                        // Handle both string logs and object logs
                        const logType = log.type || 'INFO';
                        const logMessage = log.message || log;
                        const logStyle = getLogStyle(logType);
                        
                        return (
                            <div 
                                key={index} 
                                style={{ 
                                    padding: '5px 0',
                                    borderBottom: index < logs.length - 1 ? '1px solid #f0f0f0' : 'none',
                                    wordBreak: 'break-word',
                                    ...logStyle
                                }}
                            >
                                {logMessage}
                            </div>
                        );
                    })
                ) : (
                    <div style={{ 
                        padding: '20px', 
                        textAlign: 'center', 
                        color: '#6c757d'
                    }}>
                        {loading ? 'Loading logs...' : 'No logs available yet. Start the system to generate logs.'}
                    </div>
                )}
            </div>
            
            <div style={{ 
                marginTop: '10px', 
                fontSize: '12px', 
                color: '#6c757d',
                display: 'flex',
                justifyContent: 'space-between'
            }}>
                <span>Total logs: {logs.length}</span>
                <span>{autoRefresh ? 'Auto-refreshing every 3 seconds' : 'Auto-refresh disabled'}</span>
            </div>
        </div>
    );
};

export default LogDisplay;