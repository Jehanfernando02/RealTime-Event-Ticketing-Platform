package com.example.TicketingPlatformBackend.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

/**
 * TicketConfig is a configuration class that holds properties related to ticket management.
 * It uses Spring's @ConfigurationProperties to bind properties from application configuration files.
 */
@Component
@ConfigurationProperties(prefix = "ticket") // Prefix for properties in config.json
public class TicketConfig {
    private int totalTickets;            // Total number of tickets to be managed.
    private int ticketReleaseRate;       // Rate at which tickets are released by vendors.
    private int customerRetrievalRate;   // Rate at which customers retrieve tickets.
    private int maxTicketCapacity;        // Maximum capacity of tickets in the pool.

    // Getters and Setters

    public int getTotalTickets() {
        return totalTickets;
    }

    public void setTotalTickets(int totalTickets) {
        this.totalTickets = totalTickets;
    }

    public int getTicketReleaseRate() {
        return ticketReleaseRate;
    }

    public void setTicketReleaseRate(int ticketReleaseRate) {
        this.ticketReleaseRate = ticketReleaseRate;
    }

    public int getCustomerRetrievalRate() {
        return customerRetrievalRate;
    }

    public void setCustomerRetrievalRate(int customerRetrievalRate) {
        this.customerRetrievalRate = customerRetrievalRate;
    }

    public int getMaxTicketCapacity() {
        return maxTicketCapacity;
    }

    public void setMaxTicketCapacity(int maxTicketCapacity) {
        this.maxTicketCapacity = maxTicketCapacity;
    }
}
