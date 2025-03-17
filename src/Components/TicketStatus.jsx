import React, { useEffect, useState } from 'react';
import { Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

const TicketStatus = ({ data }) => {
  const [status, setStatus] = useState([]);

  useEffect(() => {
    const socket = new SockJS('http://localhost:8000/ws');
    const stompClient = Stomp.over(socket);

    stompClient.connect({}, () => {
      stompClient.subscribe('/topic/ticketStatus', (message) => {
        setStatus((prevStatus) => [...prevStatus, message.body]);
      });
    });

    return () => {
      stompClient.disconnect();
    };
  }, []);

  return (
    <div>
      <h2>Ticket Status</h2>
      <ul>
        {status.map((statusMessage, index) => (
          <li key={index}>{statusMessage}</li>
        ))}
      </ul>
    </div>
  );
};

export default TicketStatus;
