import React, { useEffect, useState, useRef } from 'react';
import webSocketService from '../services/websocket';
import './Styling/TicketDisplay.css';

const TicketDisplay = ({ onStatsUpdate }) => {
  const [currentTickets, setCurrentTickets] = useState(0);
  const [totalSold, setTotalSold] = useState(0);
  const [capacity, setCapacity] = useState(360);
  const [error, setError] = useState(null);
  const [wsConnected, setWsConnected] = useState(webSocketService.getConnectionStatus());
  const prevTickets = useRef(0);
  const [trend, setTrend] = useState(0);

  useEffect(() => {
    if (!webSocketService.getConnectionStatus()) {
      webSocketService.connect(
        () => setWsConnected(true),
        () => setWsConnected(false)
      );
    } else {
      setWsConnected(true);
    }

    const statusListener = (data) => {
      if (data.currentTicketsAvailable !== undefined) {
        const next = data.currentTicketsAvailable;
        setTrend(next - prevTickets.current);
        prevTickets.current = next;
        setCurrentTickets(next);
        if (data.totalTickets) setCapacity(data.totalTickets);
        if (data.totalSold) setTotalSold(data.totalSold);
        setError(null);
      }
    };

    const connectionListener = (data) => {
      const connected = data.status === 'connected';
      setWsConnected(connected);
      setError(connected ? null : 'WebSocket connection lost');
    };

    webSocketService.addListener('status', statusListener);
    webSocketService.addListener('connection', connectionListener);
    webSocketService.requestStatus();

    return () => {
      webSocketService.removeListener('status', statusListener);
      webSocketService.removeListener('connection', connectionListener);
    };
  }, []);

  const fillPct = capacity > 0 ? Math.round((currentTickets / capacity) * 100) : 0;

  return (
    <div className="ticket-display">
      <div className="td-header">
        <div className="td-title">
          <span className="td-icon">🎟</span>
          Ticket Pool
        </div>
        <div className={`ws-badge ${wsConnected ? 'ws-live' : 'ws-off'}`}>
          <span className="ws-dot"></span>
          {wsConnected ? 'WebSocket Live' : 'Offline'}
        </div>
      </div>

      {error && <div className="td-error">{error}</div>}

      <div className="td-main-num">
        <span className="td-count">{currentTickets.toLocaleString()}</span>
        {trend !== 0 && (
          <span className={`td-trend ${trend > 0 ? 'up' : 'down'}`}>
            {trend > 0 ? '▲' : '▼'} {Math.abs(trend)}
          </span>
        )}
      </div>
      <div className="td-sublabel">tickets available</div>

      <div className="td-bar-wrap">
        <div className="td-bar-fill" style={{ width: `${fillPct}%` }}></div>
      </div>
      <div className="td-bar-labels">
        <span>0</span>
        <span className="td-pct">{fillPct}% of capacity</span>
        <span>{capacity.toLocaleString()}</span>
      </div>

      <div className="td-stats">
        <div className="td-stat">
          <div className="td-stat-val green">{totalSold.toLocaleString()}</div>
          <div className="td-stat-lbl">Total Sold</div>
        </div>
        <div className="td-stat-divider"></div>
        <div className="td-stat">
          <div className="td-stat-val indigo">{capacity.toLocaleString()}</div>
          <div className="td-stat-lbl">Capacity</div>
        </div>
        <div className="td-stat-divider"></div>
        <div className="td-stat">
          <div className="td-stat-val amber">{fillPct}%</div>
          <div className="td-stat-lbl">Fill Rate</div>
        </div>
      </div>
    </div>
  );
};

export default TicketDisplay;