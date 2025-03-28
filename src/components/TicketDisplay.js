import React, { useEffect, useState } from 'react';
import { getStatus } from '../services/api';
import './Styling/TicketDisplay.css';

const TicketDisplay = () => {
  const [currentTickets, setCurrentTickets] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const status = await getStatus();
        setCurrentTickets(status.currentTicketsAvailable);
        setError(null);
      } catch (err) {
        console.error('Error fetching ticket status:', err);
        setError('Failed to fetch ticket status');
      }
    };

    fetchTickets();
    const intervalId = setInterval(fetchTickets, 5000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="ticket-display">
      <h2>Ticket Pool Status</h2>
      {error && <p className="error-message">{error}</p>}
      <p className="ticket-count">Current Tickets Available: <span>{currentTickets}</span></p>
    </div>
  );
};

export default TicketDisplay;