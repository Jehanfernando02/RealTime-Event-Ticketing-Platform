import React, { useEffect, useState } from 'react';
import { getStatus } from '../services/api'; 
import './Styling/TicketDisplay.css'; 

const TicketDisplay = () => {
  const [currentTickets, setCurrentTickets] = useState(0); // State for tracking current number of available tickets
  const [error, setError] = useState(null); // State for handling errors during status fetching

  useEffect(() => {
      const fetchTickets = async () => {
          try {
              const status = await getStatus(); // Fetch current ticket status from API
              setCurrentTickets(status.currentTicketsAvailable); // Update state with available tickets count from response
              setError(null); // Reset error state on successful fetch
          } catch (err) {
              console.error('Error fetching ticket status:', err);
              setError('Failed to fetch ticket status'); // Set error message if fetching fails
          }
      };

      fetchTickets(); // Initial fetch when component mounts

      const intervalId = setInterval(fetchTickets, 5000); // Poll every 5 seconds for updated ticket status

      return () => clearInterval(intervalId); // Cleanup interval on component unmount to avoid memory leaks
  }, []);

  return (
      <div className="ticket-display">
          <h2>Ticket Pool Status</h2>
          {error && <p className="error-message">{error}</p>} {/* Show error only if it exists */}
          <p className="ticket-count">Current Tickets Available: <span>{currentTickets}</span></p> {/* Display current tickets */}
      </div>
  );
};

export default TicketDisplay;
