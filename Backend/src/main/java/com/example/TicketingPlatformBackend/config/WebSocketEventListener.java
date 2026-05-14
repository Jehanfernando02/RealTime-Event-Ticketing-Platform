package com.example.TicketingPlatformBackend.config;

import com.example.TicketingPlatformBackend.service.WebSocketBroadcastService;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionSubscribeEvent;

@Component
public class WebSocketEventListener {

    private final WebSocketBroadcastService broadcastService;

    public WebSocketEventListener(WebSocketBroadcastService broadcastService) {
        this.broadcastService = broadcastService;
    }

    @EventListener
    public void handleSubscribeEvent(SessionSubscribeEvent event) {
        StompHeaderAccessor accessor = StompHeaderAccessor.wrap(event.getMessage());
        String destination = accessor.getDestination();

        if ("/topic/logs".equals(destination)) {
            broadcastService.broadcastLogsForced();
        }
        if ("/topic/status".equals(destination)) {
            broadcastService.broadcastStatusForced();
        }
    }
}