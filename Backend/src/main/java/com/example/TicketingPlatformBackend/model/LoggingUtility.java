package com.example.TicketingPlatformBackend.model;

import java.io.IOException;
import java.util.logging.FileHandler;
import java.util.logging.Level;
import java.util.logging.Logger;
import java.util.logging.SimpleFormatter;

/**
 * LoggingUtility provides centralized logging capabilities for the application,
 * allowing for logging messages to a file with a specific format.
 */
public class LoggingUtility {

    private static final Logger logger = Logger.getLogger("TicketingSystemLogger"); // Logger instance for logging events

    static {
        try {
            FileHandler fileHandler = new FileHandler("logs/application.log", true); // Create a file handler for logging
            fileHandler.setFormatter(new SimpleFormatter()); // Set simple text format for log entries
            logger.addHandler(fileHandler); // Attach file handler to logger
            logger.setLevel(Level.INFO); // Set default log level to INFO
        } catch (IOException e) {
            System.err.println("Failed to initialize logger: " + e.getMessage()); // Error handling if logger setup fails
        }
    }

    /**
     * Provides a centralized logger instance for other classes to use.
     *
     * @return Logger instance used throughout the application.
     */
    public static Logger getLogger() {
        return logger; // Return the logger instance for logging purposes
    }
}
