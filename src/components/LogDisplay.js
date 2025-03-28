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
        setLogs(logData);
      } catch (error) {
        console.error('Error fetching logs:', error);
        setError('Failed to fetch logs. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchLogs();
    const intervalId = setInterval(fetchLogs, 3000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="log-display">
      <h2>Log Display</h2>
      {loading && <p className="loading">Loading logs...</p>}
      {error && <p className="error">{error}</p>}
      {logs.length > 0 ? (
        <div className="log-list">
          {logs.map((log, index) => {
            if (!log) return null;

            const logParts = log.split(' ');
            const dateTime = `${logParts[0]} ${logParts[1]}`;
            const level = logParts[2]?.replace(':', '');
            const message = logParts.slice(3).join(' ');

            const logLevelClass = level ? level.toLowerCase() : 'unknown';

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