import React, { useEffect, useState, useRef } from 'react';
import { clearLogs } from '../services/api';
import webSocketService from '../services/websocket';
import './Styling/LogDisplay.css';

const LogDisplay = ({ systemStarted }) => {
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [wsConnected, setWsConnected] = useState(false);
    const [autoRefresh, setAutoRefresh] = useState(true);
    const logListRef = useRef(null);

    // Set up WebSocket listeners on component mount
    useEffect(() => {
        // Connect to WebSocket
        webSocketService.connect(
    () => {
        setWsConnected(true);
        setTimeout(() => {
            webSocketService.requestLogs();
        }, 500);
    },
    (error) => setWsConnected(false)
);

        // Listen for log updates via WebSocket
        const logsListener = (data) => {
            if (data.logs && Array.isArray(data.logs)) {
                setLogs(data.logs);
                setError(null);
            }
        };

        // Register listener
        webSocketService.addListener('logs', logsListener);

        // Cleanup on unmount
        return () => {
            webSocketService.removeListener('logs', logsListener);
        };
    }, []);

    // Auto-scroll to bottom when logs update
    useEffect(() => {
        if (logListRef.current) {
            logListRef.current.scrollTop = logListRef.current.scrollHeight;
        }
    }, [logs]);

    const handleClearLogs = async () => {
        try {
            await clearLogs();
            setLogs([]);
        } catch (error) {
            setError(`Failed to clear logs: ${error.message}`);
        }
    };

    // Function to determine log type from log message
    const getLogType = (log) => {
        if (!log || typeof log !== 'string') return 'info';
        
        if (log.includes('[Vendor-') || (log.includes('added') && log.includes('tickets'))) return 'vendor';
        if (log.includes('[Customer-') || log.includes('purchased') || log.includes('retrieved')) return 'customer';
        if (log.includes('canceled') || log.includes('cancelled')) return 'cancel';
        if (log.includes('Admin') || log.includes('returned')) return 'admin';
        if (log.includes('started') || log.includes('Simulation') || log.includes('initialized')) return 'system';
        if (log.includes('WARNING')) return 'warning';
        if (log.includes('SEVERE') || log.includes('ERROR') || log.includes('Failed')) return 'error';
        
        return 'info';
    };

    return (
        <div className="log-display">
            <div className="log-controls">
  <div className="control-buttons">
    <button className="log-btn" onClick={handleClearLogs}>
      <i className="ti ti-trash" style={{fontSize:'13px', verticalAlign:'-1px', marginRight:'4px'}}></i>
      Clear
    </button>
  </div>
  <label className="toggle-switch">
    <input
      type="checkbox"
      className="toggle-input"
      checked={autoRefresh}
      onChange={() => setAutoRefresh(!autoRefresh)}
    />
    <span>Auto-scroll</span>
  </label>
  <div className={`ws-badge ${wsConnected ? 'ws-live' : 'ws-off'}`} style={{fontSize:'0.7rem'}}>
    <span className="ws-dot"></span>
    {wsConnected ? 'Live' : 'Offline'}
  </div>
</div>

            {error && <div className="error-message">{error}</div>}

            <div className="log-list" ref={logListRef}>
                {logs.length === 0 ? (
                    <div className="log-empty">
  <i className="ti ti-inbox" style={{fontSize:'2rem', color:'#334155', display:'block', marginBottom:'0.5rem'}}></i>
  <p>No activity yet — start the system to see live transactions.</p>
</div>
                ) : (
                    logs.map((log, index) => (
                        <div key={index} className={`log-item ${getLogType(log)}`}>
                            {log}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default LogDisplay;
