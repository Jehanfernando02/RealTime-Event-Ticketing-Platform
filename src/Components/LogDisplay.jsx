import React from 'react';

const LogDisplay = ({ logs }) => {
    return (
        <section className="log-display">
            <h2>Logs</h2>
            <ul>
                {logs.map((log, index) => (
                    <li key={index}>{log}</li>
                ))}
            </ul>
        </section>
    );
};

export default LogDisplay;
