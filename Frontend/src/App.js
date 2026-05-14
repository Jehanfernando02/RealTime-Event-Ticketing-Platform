import React, { useState } from 'react';
import './App.css';
import ConfigurationForm from './components/ConfigurationForm';
import TicketDisplay from './components/TicketDisplay';
import ControlPanel from './components/ControlPanel';
import LogDisplay from './components/LogDisplay';

function App() {
  const [systemStarted, setSystemStarted] = useState(false);

  return (
    <div className="App">
      {/* Animated Background */}
      <div className="animated-background">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
        <div className="blob blob-3"></div>
      </div>

      {/* Header */}
      <header className="app-header">
        <div className="header-content">
          <div className="logo-section">
            <div className="logo-icon">🎫</div>
            <div>
              <h1>TicketFlow</h1>
              <p className="tagline">Real-Time Event Ticketing Platform</p>
            </div>
          </div>
          <div className="header-badge">
            <span className="live-badge">● LIVE</span>
            <span className="version">v1.0</span>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="app-container">
        <div className="content-wrapper">
          {/* Left Panel - Configuration & Control */}
          <div className="left-panel">
            <div className="panel-header">
              <h2>System Control</h2>
              <div className="panel-indicator"></div>
            </div>
            
            <div className="control-section">
              <div className="section-label">Configure System</div>
              <ConfigurationForm onSystemStart={setSystemStarted} />
            </div>

            <div className="divider"></div>

            <div className="control-section">
              <div className="section-label">Operations</div>
              <ControlPanel onSystemStart={setSystemStarted} />
            </div>
          </div>

          {/* Right Panel - Status & Logs */}
          <div className="right-panel">
            <div className="metrics-row">
              <TicketDisplay systemStarted={systemStarted} />
            </div>

            <div className="divider-horizontal"></div>

            <div className="logs-section">
              <div className="logs-header">
                <h2>Live Activity Feed</h2>
                <span className="live-indicator">
                  <span className="pulse"></span>
                  Live Updates
                </span>
              </div>
              <LogDisplay systemStarted={systemStarted} />
            </div>
          </div>
        </div>

        {/* Help Section */}
        <aside className="info-panel">
          <div className="info-header">
            <span className="info-icon">📚</span>
            <h3>Getting Started</h3>
          </div>
          <div className="info-content">
            <div className="step">
              <div className="step-number">1</div>
              <div className="step-text">
                <strong>Configure</strong>
                <p>Set total tickets, release rate, and customer retrieval rate</p>
              </div>
            </div>
            <div className="step">
              <div className="step-number">2</div>
              <div className="step-text">
                <strong>Initialize</strong>
                <p>Click "Set Configuration" to save your settings</p>
              </div>
            </div>
            <div className="step">
              <div className="step-number">3</div>
              <div className="step-text">
                <strong>Launch</strong>
                <p>Start the system and watch real-time ticket transactions</p>
              </div>
            </div>
            <div className="step">
              <div className="step-number">4</div>
              <div className="step-text">
                <strong>Monitor</strong>
                <p>Track ticket pool, vendors, and customer activity</p>
              </div>
            </div>
          </div>
          <div className="info-features">
            <div className="feature">
              <span className="feature-icon">⚡</span>
              <span>WebSocket Real-Time</span>
            </div>
            <div className="feature">
              <span className="feature-icon">🔄</span>
              <span>Auto Reconnect</span>
            </div>
            <div className="feature">
              <span className="feature-icon">📊</span>
              <span>Live Metrics</span>
            </div>
            <div className="feature">
              <span className="feature-icon">🎯</span>
              <span>Thread Safe</span>
            </div>
          </div>
        </aside>
      </main>

      {/* Footer */}
      <footer className="app-footer">
        <p>⚙️ Multi-threaded Real-Time Ticketing Engine | WebSocket-based Live Updates</p>
      </footer>
    </div>
  );
}

export default App;