Real-Time Event Ticketing Platform - Frontend


📖 Introduction
The Real-Time Event Ticketing Platform Frontend is a user-friendly web application built with React. It allows users to configure ticketing parameters, start and stop the ticketing system, and view real-time updates on ticket availability and system logs. This frontend interacts with a Spring Boot backend to manage ticket sales dynamically.

⚙️ Setup Instructions
Prerequisites
Before you begin, ensure you have the following installed on your machine:

    Node.js: Version 14 or higher (recommended).
    npm: Comes with Node.js for managing packages.

1. How to Build and Run the Application

    Clone the Repository:
    git clone https://github.com/Jehanfernando02/Real-Time-Event-Ticketing-System
    cd Real-Time-Event-Ticketing-System/frontend

2. Install Dependencies:
Run the following command to install all necessary packages:
    npm install

3. Run the Application:
Start the React application with:
    npm start

4. Access the Application:
The frontend will be accessible at http://localhost:3000. Ensure that your backend is running on http://localhost:8080/api for API calls to function correctly.


🛠️ Usage Instructions
1. Configuring and Starting the System
Configuration:

    Navigate to the Configuration Form in the application.
    Enter the following parameters:
        Total Number of Tickets: Specify how many tickets are available for sale.
        Ticket Release Rate: Define how many tickets vendors can release per second.
        Customer Retrieval Rate: Set how quickly customers can retrieve tickets.
        Maximum Ticket Capacity: Indicate the maximum number of tickets that can be held in the system.

Once you have entered these values, click on "Set Configuration" to save them.

2. Managing the System:

    Use the Control Panel to manage system operations:
        Start System: Begin processing tickets based on your configuration.
        Stop System: Halt all operations.
        Reset System: Clear all current operations and logs.

Explanation of UI Controls

    Configuration Form: Input fields for setting up ticket parameters with validation feedback for errors.
    Control Panel: Buttons that allow users to control system operations (start, stop, reset).
    Ticket Display: Displays real-time updates on available tickets.
    Log Display: Shows logs of system activities for monitoring purposes.

🎉 Conclusion
The Real-Time Event Ticketing Platform Frontend is designed to provide an intuitive interface for managing ticket sales in real-time. By following these instructions, you can easily set up and run the frontend application alongside your backend service. For any further questions or contributions, feel free to reach out or submit issues on the repository! This README file focuses solely on the frontend aspect of your project, detailing setup instructions, usage guidelines, and providing an overview of UI components and their functionalities. Adjust any sections as necessary to fit your specific project details!