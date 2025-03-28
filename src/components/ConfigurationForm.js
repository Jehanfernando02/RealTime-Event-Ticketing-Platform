import React, { useState, useEffect } from 'react';
import { configureSystem } from '../services/api';
import './Styling/ConfigurationForm.css';

const ConfigurationForm = () => {
  const [totalTickets, setTotalTickets] = useState('');
  const [ticketReleaseRate, setTicketReleaseRate] = useState('');
  const [customerRetrievalRate, setCustomerRetrievalRate] = useState('');
  const [maxTicketCapacity, setMaxTicketCapacity] = useState('');
  const [errors, setErrors] = useState({});
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const isValid = validateInputs();
    setIsButtonDisabled(!isValid);
  }, [totalTickets, ticketReleaseRate, customerRetrievalRate, maxTicketCapacity]);

  const validateInputs = () => {
    const newErrors = {};
    const totalTicketsNum = Number(totalTickets);
    const ticketReleaseRateNum = Number(ticketReleaseRate);
    const customerRetrievalRateNum = Number(customerRetrievalRate);
    const maxTicketCapacityNum = Number(maxTicketCapacity);

    if (!totalTickets || totalTicketsNum <= 0) newErrors.totalTickets = "Must be > 0";
    if (!ticketReleaseRate || ticketReleaseRateNum <= 0) newErrors.ticketReleaseRate = "Must be > 0";
    if (!customerRetrievalRate || customerRetrievalRateNum <= 0) newErrors.customerRetrievalRate = "Must be > 0";
    if (!maxTicketCapacity || maxTicketCapacityNum <= 0) newErrors.maxTicketCapacity = "Must be > 0";
    if (maxTicketCapacityNum < totalTicketsNum && totalTickets && maxTicketCapacity) {
      newErrors.maxTicketCapacity = "Must be ≥ total tickets";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateInputs()) return;

    setLoading(true);
    try {
      const config = {
        totalTickets: Number(totalTickets),
        ticketReleaseRate: Number(ticketReleaseRate),
        customerRetrievalRate: Number(customerRetrievalRate),
        maxTicketCapacity: Number(maxTicketCapacity)
      };
      console.log('Submitting config:', config); // Debug payload
      const response = await configureSystem(config);
      console.log('API Response:', response); // Debug response
      alert('Configuration set successfully!');
    } catch (error) {
      console.error('Configuration error:', error);
      alert('Failed to set configuration: ' + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="configuration-form">
      <h2>Configuration Zone</h2>
      <p>Set the stage for your ticketing adventure:</p>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Total Tickets</label>
          <input
            type="number"
            placeholder="e.g., 100"
            value={totalTickets}
            onChange={(e) => setTotalTickets(e.target.value)}
            required
          />
          {errors.totalTickets && <small className="error-text">{errors.totalTickets}</small>}
        </div>
        <div className="form-group">
          <label>Release Rate (tickets/sec)</label>
          <input
            type="number"
            placeholder="e.g., 5"
            value={ticketReleaseRate}
            onChange={(e) => setTicketReleaseRate(e.target.value)}
            required
          />
          {errors.ticketReleaseRate && <small className="error-text">{errors.ticketReleaseRate}</small>}
        </div>
        <div className="form-group">
          <label>Retrieval Rate</label>
          <input
            type="number"
            placeholder="e.g., 3"
            value={customerRetrievalRate}
            onChange={(e) => setCustomerRetrievalRate(e.target.value)}
            required
          />
          {errors.customerRetrievalRate && <small className="error-text">{errors.customerRetrievalRate}</small>}
        </div>
        <div className="form-group">
          <label>Max Capacity</label>
          <input
            type="number"
            placeholder="e.g., 200"
            value={maxTicketCapacity}
            onChange={(e) => setMaxTicketCapacity(e.target.value)}
            required
          />
          {errors.maxTicketCapacity && <small className="error-text">{errors.maxTicketCapacity}</small>}
        </div>
        <button type="submit" className="submit-button" disabled={isButtonDisabled || loading}>
          {loading ? 'Setting...' : 'Set Configuration'}
        </button>
      </form>
    </div>
  );
};

export default ConfigurationForm;