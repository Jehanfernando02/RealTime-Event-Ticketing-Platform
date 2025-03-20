Real-Time Event Ticketing Platform Backend

Introduction
Welcome to the Real-Time Event Ticketing Platform Backend! This application serves as a robust backend solution for managing ticket sales in real-time. It utilizes the Producer-Consumer pattern to handle concurrent ticket releases by vendors and purchases by customers while ensuring data integrity and synchronization. The system is built using Spring Boot and provides RESTful APIs for seamless interaction with frontend applications.
Setup Instructions
Prerequisites
Before you begin, ensure you have the following installed on your machine:

    Java Development Kit (JDK): Version 11 or higher.
    Maven: For building the application.
    Node.js: Required if you're using a JavaScript-based frontend (e.g., React.js or Angular).


How to Build and Run the Application

1. Clone the Repository:
git clone https://github.com/Jehanfernando02/Real-Time-Event-Ticketing-System

cd Real-Time-Event-Ticketing-System

2. Build the Application:
   Use Maven to build the project:

   mvn clean install

3. Run the Application:
   After building, you can run the application using:

   mvn spring-boot:run


4. Access the API:
   The backend will be running on http://localhost:8080/api. You can use tools like Postman or cURL to interact with the API.


Usage Instructions

1. Configuring and Starting the System

    Configuration:
    Before starting the system, you need to configure it. Send a POST request to /api/config with a JSON body containing your configuration settings:

Example :
{
"totalTickets": 100,
"ticketReleaseRate": 5,
"customerRetrievalRate": 3,
"maxTicketCapacity": 200
}

2. Start the System:
After configuring, start the system by sending a POST request to /api/start. This will initialize ticket vendors and customers based on your configuration.

3. Stopping and Resetting the System:

    To stop the system, send a POST request to /api/stop.
    To reset the system (clearing all current operations), send a POST request to /api/reset.

Explanation of UI Controls

Here’s a brief overview of key API endpoints:

    Configuration Endpoint:
        POST /api/config: Configure ticketing parameters.
    System Control Endpoints:
        POST /api/start: Start processing tickets.
        POST /api/stop: Stop all operations.
        POST /api/reset: Reset the ticketing system.
    Status and Logging Endpoints:
        GET /api/status: Retrieve current status of available tickets.
        GET /api/logs: Retrieve log entries for monitoring application activity.
        POST /api/clear-logs: Clear all existing log entries.

Conclusion
The Real-Time Event Ticketing Platform Backend is designed to efficiently manage ticket sales through concurrent processing while providing clear logging and configuration management. With this setup, you can easily integrate it with any frontend technology of your choice to create a complete ticketing solution. For any further questions or contributions, feel free to reach out or submit issues on the repository!