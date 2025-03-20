import React, { useState, useEffect } from 'react';
import { configureSystem } from '../services/api';
import './Styling/ConfigurationForm.css'; 

const ConfigurationForm = () => {
  const [totalTickets, setTotalTickets] = useState('');
  const [ticketReleaseRate, setTicketReleaseRate] = useState('');
  const [customerRetrievalRate, setCustomerRetrievalRate] = useState('');
  const [maxTicketCapacity, setMaxTicketCapacity] = useState('');
  const [errors, setErrors] = useState({});
  const [isButtonDisabled, setIsButtonDisabled] = useState(true); // State to track button status

  useEffect(() => {
    // Check if the button should be enabled or disabled
    const isValid = validateInputs(); // Validate inputs and determine if they meet criteria
    setIsButtonDisabled(!isValid); // Disable button if inputs are invalid
  }, [totalTickets, ticketReleaseRate, customerRetrievalRate, maxTicketCapacity]);

  const validateInputs = () => {
    const newErrors = {};
    
    // Convert inputs to numbers for comparison
    const totalTicketsNum = Number(totalTickets);
    const ticketReleaseRateNum = Number(ticketReleaseRate);
    const customerRetrievalRateNum = Number(customerRetrievalRate);
    const maxTicketCapacityNum = Number(maxTicketCapacity);

    // Validate total tickets
    if (totalTicketsNum <= 0) newErrors.totalTickets = "Total tickets must be greater than 0.";
    
    // Validate ticket release rate
    if (ticketReleaseRateNum <= 0) newErrors.ticketReleaseRate = "Release rate must be greater than 0.";
    
    // Validate customer retrieval rate
    if (customerRetrievalRateNum <= 0) newErrors.customerRetrievalRate = "Retrieval rate must be greater than 0.";
    
    // Validate max ticket capacity
    if (maxTicketCapacityNum <= 0) newErrors.maxTicketCapacity = "Max capacity must be greater than 0.";
    
    // Ensure max ticket capacity is greater than or equal to total tickets
    if (maxTicketCapacityNum < totalTicketsNum) {
      newErrors.maxTicketCapacity = "Maximum ticket capacity must be greater than or equal to total tickets.";
    }

    setErrors(newErrors); // Update state with any validation errors
    return Object.keys(newErrors).length === 0; // Returns true if no errors
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    if (!validateInputs()) return; // Validate inputs before proceeding

    try {
      // Prepare configuration object with validated numbers
      const config = { 
        totalTickets: Number(totalTickets), 
        ticketReleaseRate: Number(ticketReleaseRate), 
        customerRetrievalRate: Number(customerRetrievalRate), 
        maxTicketCapacity: Number(maxTicketCapacity) 
      };
      await configureSystem(config); // Send configuration to the backend API
      alert('Configuration received!'); // Notify user of success
    } catch (error) {
      alert('Error in configuration: ' + error.message); // Handle any errors during configuration submission
    }
  };

  return (
    <div className="configuration-form">
      <h2>Configuration Form</h2>
      <p>Please enter the following inputs to get started:</p>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Total Number of Tickets:</label>
          <input 
            type="number" 
            placeholder="Enter total tickets" 
            value={totalTickets} 
            onChange={(e) => setTotalTickets(e.target.value)} 
            required 
          />
          {errors.totalTickets && <small className="error-text">{errors.totalTickets}</small>}
        </div>
        <div className="form-group">
          <label>Ticket Release Rate (tickets per second):</label>
          <input 
            type="number" 
            placeholder="Enter release rate" 
            value={ticketReleaseRate} 
            onChange={(e) => setTicketReleaseRate(e.target.value)} 
            required 
          />
          {errors.ticketReleaseRate && <small className="error-text">{errors.ticketReleaseRate}</small>}
        </div>
        <div className="form-group">
          <label>Customer Retrieval Rate:</label>
          <input 
            type="number" 
            placeholder="Enter retrieval rate" 
            value={customerRetrievalRate} 
            onChange={(e) => setCustomerRetrievalRate(e.target.value)} 
            required 
          />
          {errors.customerRetrievalRate && <small className="error-text">{errors.customerRetrievalRate}</small>}
        </div>
        <div className="form-group">
          <label>Maximum Ticket Capacity:</label>
          <input 
            type="number" 
            placeholder="Enter max capacity" 
            value={maxTicketCapacity} 
            onChange={(e) => setMaxTicketCapacity(e.target.value)} 
            required 
          />
          {errors.maxTicketCapacity && <small className="error-text">{errors.maxTicketCapacity}</small>}
        </div>
        {/* Button is disabled until all input validations pass */}
        <button type="submit" className="submit-button" disabled={isButtonDisabled}>Set Configuration</button>
      </form>
    </div>
  );
};

export default ConfigurationForm;
