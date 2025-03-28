import React from 'react';
import './App.css';
import ConfigurationForm from './components/ConfigurationForm';
import TicketDisplay from './components/TicketDisplay';
import ControlPanel from './components/ControlPanel';
import LogDisplay from './components/LogDisplay'; // Correct import path

function App() {
  return (
    <div className="App">
      <header className="app-header">
        <h1>Real-Time Ticketing Simulator</h1>
      </header>
      <div className="app-container">
        <div className="main-content">
          <ConfigurationForm />
          <ControlPanel />
          <div className="status-logs">
            <TicketDisplay />
            <LogDisplay />
          </div>
        </div>
        <aside className="side-box">
          <h3>✨ How to Shine with This Simulator</h3>
          <p>Master real-time ticketing in style:</p>
          <ol>
            <li><strong>Configure It:</strong> Fill out the Configuration Form.</li>
            <li><strong>Activate:</strong> Hit "Set Configuration" to spark it up.</li>
            <li><strong>Launch:</strong> Click "Start System" and let it roll.</li>
            <li><strong>Enjoy:</strong> Watch logs and tickets light up live!</li>
          </ol>
          <p>Unleash the ticketing magic!</p>
        </aside>
      </div>
    </div>
  );
}

export default App;