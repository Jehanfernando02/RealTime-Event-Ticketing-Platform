package com.example.TicketingPlatformBackend.controller;

import com.example.TicketingPlatformBackend.config.TicketConfig;
import com.example.TicketingPlatformBackend.service.LoggingService;
import com.example.TicketingPlatformBackend.service.TicketingService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * TicketSystemController handles incoming API requests related to the ticketing system.
 * It provides endpoints for configuring, starting, stopping, and retrieving information about the system.
 */
@RestController
@RequestMapping("/api") // Base URL for all endpoints in this controller
public class TicketSystemController {

    private final TicketingService ticketingService; // Service for handling ticket operations
    private final LoggingService loggingService; // Service for handling logging operations

    public TicketSystemController(TicketingService ticketingService, LoggingService loggingService) {
        this.ticketingService = ticketingService; // Injected service for ticket operations
        this.loggingService = loggingService; // Injected service for logging operations
    }

    /**
     * Configures the ticket system with provided settings.
     *
     * @param config The configuration settings received from the request body.
     * @return A confirmation message indicating successful configuration.
     */
    @PostMapping("/config")
    public String configureSystem(@RequestBody TicketConfig config) {
        // Set configuration values in the service layer
        ticketingService.getTicketConfig().setTotalTickets(config.getTotalTickets());
        ticketingService.getTicketConfig().setTicketReleaseRate(config.getTicketReleaseRate());
        ticketingService.getTicketConfig().setCustomerRetrievalRate(config.getCustomerRetrievalRate());
        ticketingService.getTicketConfig().setMaxTicketCapacity(config.getMaxTicketCapacity());

        // Save the updated configuration
        ticketingService.saveConfig();

        return "Configuration received: " + config.getTotalTickets() + " tickets."; // Return confirmation message
    }

    /**
     * Starts the ticket system and begins processing tickets.
     *
     * @return A message indicating that the system has started.
     */
    @PostMapping("/start")
    public String startSystem() {
        return ticketingService.startSystem(); // Delegate start operation to service layer
    }

    /**
     * Stops the ticket system and halts all operations.
     *
     * @return A message indicating that the system has stopped.
     */
    @PostMapping("/stop")
    public String stopSystem() {
        return ticketingService.stopSystem(); // Delegate stop operation to service layer
    }

    /**
     * Resets the ticket system, clearing all current operations and data.
     *
     * @return A message indicating that the system has been reset.
     */
    @PostMapping("/reset")
    public String resetSystem() {
        return ticketingService.resetSystem(); // Delegate reset operation to service layer
    }

    /**
     * Clears all logs from the logging service.
     *
     * @return A confirmation message indicating that logs have been cleared.
     */
    @PostMapping("/clear-logs") // New endpoint for clearing logs
    public String clearLogs() {
        loggingService.clearLogs(); // Call method to clear logs
        return "Logs cleared."; // Return confirmation message
    }

    /**
     * Retrieves the current status of the ticket system, including available tickets.
     *
     * @return A JSON string representing the current available tickets in the system.
     */
    @GetMapping("/status")
    public String getSystemStatus() {
        return "{\"currentTicketsAvailable\": " + ticketingService.getSystemStatus() + "}"; // Return status as JSON string
    }

    /**
     * Retrieves a list of log entries from the logging service.
     *
     * @return A list of log messages as strings.
     */
    @GetMapping("/logs")
    public List<String> getLogs() {
        return loggingService.getLogs(); // Return list of log entries from logging service
    }
}
