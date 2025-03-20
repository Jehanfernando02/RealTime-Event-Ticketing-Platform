import React, { useState } from 'react';
import { startSystem, stopSystem, resetSystem, clearLogs } from '../services/api'; // Ensure clearLogs is imported
import './Styling/ControlPanel.css'; 

const ControlPanel = () => {
  const [loading, setLoading] = useState(false); // State to indicate loading status during API calls

  const handleStart = async () => {
      setLoading(true); // Set loading state to true while starting the system
      try {
          await startSystem(); // Call API to start the system
          alert('System started!'); // Notify user of successful start
      } catch (error) {
          alert('Error starting system: ' + error.message); // Handle any errors during start operation
      } finally {
          setLoading(false); // Reset loading state regardless of success or failure
      }
  };

  const handleStop = async () => {
      setLoading(true); // Set loading state to true while stopping the system
      try {
          await stopSystem(); // Call API to stop the system
          alert('System stopped!'); // Notify user of successful stop
      } catch (error) {
          alert('Error stopping system: ' + error.message); // Handle any errors during stop operation
      } finally {
          setLoading(false); // Reset loading state regardless of success or failure
      }
  };

  const handleReset = async () => {
      setLoading(true); // Set loading state to true while resetting the system
      try {
          await resetSystem(); // Call API to reset the system
          await clearLogs(); // Clear logs after resetting the system for a fresh start
          alert('System reset and logs cleared!'); // Notify user of successful reset and log clearing
      } catch (error) {
          alert('Error resetting system: ' + error.message); // Handle any errors during reset operation
      } finally {
          setLoading(false); // Reset loading state regardless of success or failure
      }
  };

  return (
      <div className="control-panel">
          <h2>Control Panel</h2>
          <div className="button-group">
              {/* Buttons for starting, stopping, and resetting the system */}
              <button onClick={handleStart} className="control-button start-button" disabled={loading}>
                  {loading ? 'Starting...' : 'Start System'}
              </button>
              <button onClick={handleStop} className="control-button stop-button" disabled={loading}>
                  {loading ? 'Stopping...' : 'Stop System'}
              </button>
              <button onClick={handleReset} className="control-button reset-button" disabled={loading}>
                  {loading ? 'Resetting...' : 'Reset System'}
              </button>
          </div>
      </div>
  );
};

export default ControlPanel;
