package com.example.TicketingPlatformBackend.controller;

import com.example.TicketingPlatformBackend.service.LoggingService;
import com.example.TicketingPlatformBackend.service.TicketingService;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * WebSocket controller for handling real-time communication with clients.
 * Manages subscriptions for logs and ticket status updates.
 */
@Controller
public class TicketingWebSocketController {

    private final TicketingService ticketingService;
    private final LoggingService loggingService;

    public TicketingWebSocketController(TicketingService ticketingService, LoggingService loggingService) {
        this.ticketingService = ticketingService;
        this.loggingService = loggingService;
    }

    /**
     * Handles request for current logs.
     * Clients send a message to /app/logs, and the response is broadcast to /topic/logs
     * 
     * @return Map containing the current logs
     */
    @MessageMapping("/logs")
    @SendTo("/topic/logs")
    public Map<String, Object> sendLogs() {
        List<String> logs = loggingService.getLogs();
        Map<String, Object> response = new HashMap<>();
        response.put("logs", logs);
        response.put("timestamp", System.currentTimeMillis());
        return response;
    }

    /**
     * Handles request for current ticket status.
     * Clients send a message to /app/status, and the response is broadcast to /topic/status
     * 
     * @return Map containing the current ticket status
     */
    @MessageMapping("/status")
    @SendTo("/topic/status")
    public Map<String, Object> sendStatus() {
        int currentTickets = ticketingService.getSystemStatus();
        Map<String, Object> response = new HashMap<>();
        response.put("currentTicketsAvailable", currentTickets);
        response.put("timestamp", System.currentTimeMillis());
        return response;
    }

    /**
     * Handles ping/keep-alive messages to maintain WebSocket connection
     * 
     * @return Map confirming the connection is alive
     */
    @MessageMapping("/ping")
    @SendTo("/topic/pong")
    public Map<String, Object> handlePing() {
        Map<String, Object> response = new HashMap<>();
        response.put("message", "pong");
        response.put("timestamp", System.currentTimeMillis());
        return response;
    }
}
