package com.example.TicketingPlatformBackend.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

/**
 * WebSocket configuration for real-time messaging in the ticketing system.
 * Enables STOMP over WebSocket protocol for bidirectional communication.
 */
@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    /**
     * Registers STOMP endpoints and configures SockJS fallback.
     * 
     * @param registry The StompEndpointRegistry to configure endpoints.
     */
    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/ws-ticketing")
                .setAllowedOriginPatterns("http://localhost:3000", "https://event-ticketing-realtime.vercel.app")
                .withSockJS(); // Enable SockJS for fallback support
    }

    /**
     * Configures the message broker for handling subscriptions and broadcasting.
     * 
     * @param config The MessageBrokerRegistry configuration.
     */
    @Override
    public void configureMessageBroker(MessageBrokerRegistry config) {
        // Enable simple message broker with these prefixes
        config.enableSimpleBroker("/topic");
        
        // Set the prefix for messages sent to the application
        config.setApplicationDestinationPrefixes("/app");
    }
}
