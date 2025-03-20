package com.example.TicketingPlatformBackend.service;

import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

/**
 * LoggingService handles all logging functionalities within the application. It provides methods to clear logs and retrieve log entries.
 */

@Service
public class LoggingService {

    private static final String LOG_FILE_PATH = "logs/application.log";  // Path where log files are stored

    /**
     * Clears existing log entries by deleting and recreating log files. This can be called at startup or on demand.
     */

    public void clearLogs() {
        File logFile = new File(LOG_FILE_PATH);
        if (logFile.exists()) {
            logFile.delete();  // Delete existing log file if it exists
            try {
                logFile.createNewFile();  // Optionally recreate a fresh log file
            } catch (IOException e) {
                System.err.println("Error creating new log file: " + e.getMessage());
            }
        }
    }

    /**
     * Reads log entries from a specified log file and returns them as a list of strings. This allows other components to access logged information easily.
     *
     * @return A list of strings containing each line from the log file.
     */

    public List<String> getLogs() {
        List<String> logs = new ArrayList<>();
        try (BufferedReader br = new BufferedReader(new FileReader(LOG_FILE_PATH))) {
            String line;
            while ((line = br.readLine()) != null) {
                logs.add(line);  // Add each line read from log file into logs list
            }
        } catch (IOException e) {
            System.err.println("Error reading log file: " + e.getMessage());
        }
        return logs;  // Return collected logs as a list of strings
    }
}
