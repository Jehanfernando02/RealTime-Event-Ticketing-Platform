import React from 'react';
import './App.css';
import ConfigurationForm from './components/ConfigurationForm';
import TicketDisplay from './components/TicketDisplay';
import ControlPanel from './components/ControlPanel';
import LogDisplay from './components/LogDisplay';

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
          <h3>🌟 How to Rock This Simulator</h3>
          <p>Unleash the power of real-time ticketing with these steps:</p>
          <ol>
            <li><strong>Set the Scene:</strong> Fill out the Configuration Form.</li>
            <li><strong>Launch It:</strong> Click "Set Configuration" to ignite the system.</li>
            <li><strong>Start the Party:</strong> Hit "Start System" and watch it glow.</li>
            <li><strong>Live Action:</strong> See logs and tickets dazzle in real-time!</li>
          </ol>
          <p>Get ready for a ticketing spectacle!</p>
        </aside>
      </div>
    </div>
  );
}

export default App;