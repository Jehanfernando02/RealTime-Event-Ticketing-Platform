import React from 'react';
import './App.css';
import ConfigurationForm from './components/ConfigurationForm';
import TicketDisplay from './components/TicketDisplay';
import ControlPanel from './components/ControlPanel';
import LogDisplay from './components/LogDisplay';

function App() {
    return (
        <div className="App">
            <h1>Real-Time Ticketing System</h1>
            <div className="container">
                <ConfigurationForm />
                <ControlPanel />
                <TicketDisplay />
                <LogDisplay />
            </div>
        </div>
    );
}

export default App;
