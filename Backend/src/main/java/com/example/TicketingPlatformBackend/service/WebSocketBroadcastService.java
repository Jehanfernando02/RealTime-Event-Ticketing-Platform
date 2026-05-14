package com.example.TicketingPlatformBackend.service;

import org.springframework.context.annotation.Lazy;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class WebSocketBroadcastService {

    private final SimpMessagingTemplate messagingTemplate;
    private final LoggingService loggingService;
    private final TicketingService ticketingService;

    private List<String> lastLogs = null;
    private String lastStatus = null;

    public WebSocketBroadcastService(SimpMessagingTemplate messagingTemplate,
                                     LoggingService loggingService,
                                     @Lazy TicketingService ticketingService) {
        this.messagingTemplate = messagingTemplate;
        this.loggingService = loggingService;
        this.ticketingService = ticketingService;
    }

    public void resetCache() {
        lastLogs = null;
        lastStatus = null;
    }

    public void broadcastLogs() {
        List<String> currentLogs = loggingService.getLogs();
        if (!logsAreEqual(lastLogs, currentLogs)) {
            lastLogs = new ArrayList<>(currentLogs);
            Map<String, Object> response = new HashMap<>();
            response.put("logs", currentLogs);
            response.put("timestamp", System.currentTimeMillis());
            messagingTemplate.convertAndSend("/topic/logs", response);
        }
    }

    public void broadcastLogsForced() {
        List<String> currentLogs = loggingService.getLogs();
        lastLogs = new ArrayList<>(currentLogs);
        Map<String, Object> response = new HashMap<>();
        response.put("logs", currentLogs);
        response.put("timestamp", System.currentTimeMillis());
        messagingTemplate.convertAndSend("/topic/logs", response);
    }

    public void broadcastStatus() {
        int currentTickets = ticketingService.getSystemStatus();
        String currentStatus = String.valueOf(currentTickets);
        if (!currentStatus.equals(lastStatus)) {
            lastStatus = currentStatus;
            Map<String, Object> response = new HashMap<>();
            response.put("currentTicketsAvailable", currentTickets);
            response.put("timestamp", System.currentTimeMillis());
            messagingTemplate.convertAndSend("/topic/status", response);
        }
    }

    public void broadcastStatusForced() {
        int currentTickets = ticketingService.getSystemStatus();
        lastStatus = String.valueOf(currentTickets);
        Map<String, Object> response = new HashMap<>();
        response.put("currentTicketsAvailable", currentTickets);
        response.put("timestamp", System.currentTimeMillis());
        messagingTemplate.convertAndSend("/topic/status", response);
    }

    public void broadcastEvent(String eventType, String message) {
        Map<String, Object> response = new HashMap<>();
        response.put("eventType", eventType);
        response.put("message", message);
        response.put("timestamp", System.currentTimeMillis());
        messagingTemplate.convertAndSend("/topic/events", response);
    }

    private boolean logsAreEqual(List<String> list1, List<String> list2) {
        if (list1 == null && list2 == null) return true;
        if (list1 == null || list2 == null) return false;
        return list1.equals(list2);
    }
}