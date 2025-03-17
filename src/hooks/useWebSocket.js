import { useState, useEffect } from 'react';

export const useWebSocket = (config) => {
  const [ticketStatus, setTicketStatus] = useState(null);
  const [error, setError] = useState(null);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    if (config.url) {
      const ws = new WebSocket(config.url);
      setSocket(ws);

      ws.onopen = () => {
        console.log('WebSocket connection established');
        setError(null);
      };

      ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        setTicketStatus(data);  // Set ticketStatus with received data
      };

      ws.onerror = (error) => {
        console.error('WebSocket error:', error);
        setError('WebSocket connection error');
        setTicketStatus(null);
      };

      ws.onclose = () => {
        console.log('WebSocket connection closed');
        setError('Connection closed');
        setTicketStatus(null);
      };

      return () => {
        ws.close();
      };
    }
  }, [config]);

  const start = () => {
    if (socket) {
      socket.send(JSON.stringify({ action: 'start' }));
    }
  };

  const stop = () => {
    if (socket) {
      socket.send(JSON.stringify({ action: 'stop' }));
    }
  };

  const reset = () => {
    if (socket) {
      socket.send(JSON.stringify({ action: 'reset' }));
    }
  };

  return { ticketStatus, error, start, stop, reset };
};
