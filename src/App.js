// import React, { useState } from 'react';
// import ConfigurationForm from './Components/ConfigurationForm';
// import TicketStatus from './Components/TicketStatus';
// import ControlPanel from './Components/ControlPanel';
// import LogDisplay from './Components/LogDisplay';
// import { connectToWebSocket } from './services/websocketService';
// import { fetchTickets, startSystem, stopSystem, resetSystem } from './services/apiService';
// import { Container } from '@mui/material';

// const App = () => {
//     const [tickets, setTickets] = useState([]);
//     const [logs, setLogs] = useState([]);

//     connectToWebSocket((message) => {
//         const { type, data } = JSON.parse(message.body);
//         if (type === 'ticketUpdate') setTickets(data);
//         if (type === 'log') setLogs((prevLogs) => [...prevLogs, data]);
//     });

//     const handleStart = async () => await startSystem();
//     const handleStop = async () => await stopSystem();
//     const handleReset = async () => await resetSystem();

//     return (
//         <Container maxWidth="md" sx={{ marginTop: 5 }}>
//             <ConfigurationForm onSubmit={fetchTickets} />
//             <TicketStatus tickets={tickets} />
//             <ControlPanel onStart={handleStart} onStop={handleStop} onReset={handleReset} />
//             <LogDisplay logs={logs} />
//         </Container>
//     );
// };

// export default App;
