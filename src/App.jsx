import React, { useState, useEffect } from 'react';
import ConfigurationForm from './components/ConfigurationForm';
import TicketStatus from './components/TicketStatus';
import ControlPanel from './components/ControlPanel';
import LogDisplay from './components/LogDisplay';
import Notification from './components/Notification';
import { useWebSocket } from './hooks/useWebSocket';
import { getTicketData } from './utils/api';

const App = () => {
    const [config, setConfig] = useState({ url: 'ws://localhost:8000/ws', maxTickets: 10 });
    const [logs, setLogs] = useState([]);
    const [ticketData, setTicketData] = useState({});
    const [error, setError] = useState(null);

    const { ticketStatus, start, stop, reset } = useWebSocket(config);

    // Fetch initial ticket data
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getTicketData();
                setTicketData(data);
            } catch (error) {
                setError('Failed to fetch ticket data');
            }
        };

        fetchData();
    }, []);

    // Handle updates to logs and errors
    useEffect(() => {
        if (ticketStatus && ticketStatus.error) {
            setError(ticketStatus.error);
        }
        if (ticketStatus && ticketStatus.log) {
            setLogs((prevLogs) => [...prevLogs, ticketStatus.log]);
        }
    }, [ticketStatus]);

    return (
        <div className="app-container">
            {error && <Notification message={error} type="error" />}
            <div className="main-content">
                <ConfigurationForm config={config} setConfig={setConfig} />
                <TicketStatus data={ticketData} />
                <ControlPanel start={start} stop={stop} reset={reset} />
                <LogDisplay logs={logs} />
            </div>
        </div>
    );
};

export default App;
