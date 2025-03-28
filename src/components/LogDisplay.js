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
        const logData = await getLogs();
        console.log('Fetched logs:', logData); // Debug: Check what the API returns
        if (Array.isArray(logData) && logData.length > 0) {
          setLogs(logData);
        } else {
          console.log('No logs returned or invalid format:', logData);
          setLogs([]); // Ensure logs is an empty array if no data
        }
      } catch (error) {
        console.error('Error fetching logs:', error); // Debug: Log full error
        setError(`Failed to fetch logs: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchLogs();
    const intervalId = setInterval(fetchLogs, 3000); // Poll every 3 seconds

    return () => clearInterval(intervalId); // Cleanup interval on unmount
  }, []);

  return (
    <div className="log-display">
      <h2>Log Galaxy</h2>
      {loading ? (
        <p className="loading">Loading logs...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : logs.length > 0 ? (
        <div className="log-list">
          {logs.map((log, index) => {
            if (!log) return null;

            const logParts = log.split(' ');
            const dateTime = `${logParts[0]} ${logParts[1]}`;
            const level = logParts[2]?.replace(':', '') || 'UNKNOWN';
            const message = logParts.slice(3).join(' ');

            const logLevelClass = level.toLowerCase();

            return (
              <div key={index} className={`log-entry ${logLevelClass}`}>
                <span className="log-time">{dateTime}</span>
                <span className="log-level">{level}:</span>
                <span className="log-message">{message}</span>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="no-logs">No logs available yet. Start the system to generate logs.</p>
      )}
    </div>
  );
};

export default LogDisplay;