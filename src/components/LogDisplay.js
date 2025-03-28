import React, { useEffect, useState } from 'react';
import { getLogs } from '../services/api';
import './Styling/LogDisplay.css';

const LogDisplay = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchLogs = async () => {
    setLoading(true);
    setError(null);
    try {
      const logData = await getLogs();
      console.log('Raw log data from getLogs:', logData); // For debugging
      console.log('Is logData an array?', Array.isArray(logData));
      console.log('Log data length:', logData ? logData.length : 'undefined');
      
      // Ensure logData is an array, fallback to empty array if not
      setLogs(Array.isArray(logData) ? logData : []);
    } catch (error) {
      console.error('Error fetching logs:', error);
      setError('Failed to fetch logs. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
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
            if (!log || typeof log !== 'string') return null; // Skip invalid logs
            const logParts = log.split(' ');
            const dateTime = logParts.length > 1 ? `${logParts[0]} ${logParts[1]}` : 'Unknown Time';
            const level = logParts[2]?.replace(':', '') || 'UNKNOWN';
            const message = logParts.length > 3 ? logParts.slice(3).join(' ') : log;
            const logLevelClass = level.toLowerCase();
            return (
              <div key={index} className={`log-entry ${logLevelClass}`}>
                <strong>{dateTime}</strong> <span className="log-level">{level}:</span> {message}
              </div>
            );
          })}
        </div>
      ) : (
        !loading && <p>No logs available yet. Start the system to generate logs.</p>
      )}
    </div>
  );
};

export default LogDisplay;