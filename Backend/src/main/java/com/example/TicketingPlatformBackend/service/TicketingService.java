package com.example.TicketingPlatformBackend.service;

import com.example.TicketingPlatformBackend.config.TicketConfig;
import com.example.TicketingPlatformBackend.model.Customer;
import com.example.TicketingPlatformBackend.model.LoggingUtility;
import com.example.TicketingPlatformBackend.model.TicketPool;
import com.example.TicketingPlatformBackend.model.Vendor;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Level;

@Service
public class TicketingService {

    private static final String CONFIG_FILE_PATH = "src/main/resources/config.json";

    private TicketPool ticketPool; // The current ticket pool
    private List<Thread> vendorThreads = new ArrayList<>(); // List to hold vendor threads
    private List<Thread> customerThreads = new ArrayList<>(); // List to hold customer threads

    @Autowired
    private TicketConfig ticketConfig; // Injected configuration object

    @Autowired
    private LoggingService loggingService; // Inject LoggingService

    private final ObjectMapper objectMapper = new ObjectMapper(); // ObjectMapper for JSON operations

    public void loadConfig() {
        try {
            TicketConfig config = objectMapper.readValue(new File(CONFIG_FILE_PATH), TicketConfig.class);
            this.ticketConfig.setTotalTickets(config.getTotalTickets());
            this.ticketConfig.setTicketReleaseRate(config.getTicketReleaseRate());
            this.ticketConfig.setCustomerRetrievalRate(config.getCustomerRetrievalRate());
            this.ticketConfig.setMaxTicketCapacity(config.getMaxTicketCapacity());
        } catch (IOException e) {
            System.err.println("Error loading configuration: " + e.getMessage());
        }
    }

    public void saveConfig() {
        try {
            objectMapper.writeValue(new File(CONFIG_FILE_PATH), ticketConfig);
        } catch (IOException e) {
            System.err.println("Error saving configuration: " + e.getMessage());
        }
    }

    public String startSystem() {
        loggingService.clearLogs(); // Clear logs on startup

        // Ensure ticket configuration is loaded
        if (ticketConfig == null) {
            return "Ticket configuration is not set.";
        }

        int initialTicketCount = ticketConfig.getTotalTickets();
        if (initialTicketCount <= 0) {
            return "Initial ticket count must be greater than zero.";
        }

        // Initialize the ticket pool with the initial tickets and maximum capacity
        this.ticketPool = new TicketPool(initialTicketCount, ticketConfig.getMaxTicketCapacity());

        // Start vendor threads based on configured release rate
        for (int i = 0; i < 2; i++) { // Example: 2 vendors
            Vendor vendor = new Vendor(ticketPool, "[Vendor-" + (i + 1) + "]", ticketConfig.getTicketReleaseRate());
            Thread vendorThread = new Thread(vendor);
            vendorThreads.add(vendorThread);
            vendorThread.start();
            LoggingUtility.getLogger().log(Level.INFO, "{0} started.", vendor.getName());
        }

        // Start customer threads based on configured retrieval rate
        for (int i = 0; i < 5; i++) { // Example: 5 customers
            Customer customer = new Customer(ticketPool, "[Customer-" + (i + 1) + "]", ticketConfig.getCustomerRetrievalRate());
            Thread customerThread = new Thread(customer);
            customerThreads.add(customerThread);
            customerThread.start();
            LoggingUtility.getLogger().log(Level.INFO, "{0} started.", customer.getName());
        }

        // Monitor the ticket pool until it is empty or stop command is issued
        new Thread(() -> {
            try {
                while (ticketPool.getCurrentSize() > 0) { // Continue until all tickets are sold.
                    Thread.sleep(1000); // Check every second.
                }
                stopSystem(); // Automatically stop when tickets are sold out
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
                LoggingUtility.getLogger().log(Level.WARNING, "Monitoring thread interrupted.");
            }
        }).start();

        return "Ticket system started with " + initialTicketCount + " initial tickets.";
    }

    public String stopSystem() {
        stopThreads(vendorThreads);
        stopThreads(customerThreads);

        // Get the final ticket pool size
        int remainingTickets = ticketPool != null ? ticketPool.getCurrentSize() : 0;
        int totalTickets = ticketConfig != null ? ticketConfig.getTotalTickets() : 0;

        // Log or print the simulation end message and final ticket pool status
        String eventEndMessage = "***********************************************\n" +
                "                 Simulation ended.               \n" +
                "***********************************************\n" +
                "Total Tickets Remaining: " + remainingTickets + "/" + totalTickets + "\n";

        // Log the event end message
        LoggingUtility.getLogger().log(Level.INFO, eventEndMessage);

        saveConfig();

        return eventEndMessage; // Return the message when stopping the system.
    }


    public String resetSystem() {
        stopSystem();
        this.ticketPool = null; // Clear the ticket pool
        vendorThreads.clear(); // Clear vendor threads list
        customerThreads.clear(); // Clear customer threads list
        return "Ticket system reset.";
    }

    public int getSystemStatus() {
        if (ticketPool != null) {
            return ticketPool.getCurrentSize();
        } else {
            return 0; // Return 0 if the system is not started
        }
    }

    public void addVendor(String name, int releaseRate) {
        if (ticketPool == null) {
            throw new IllegalStateException("Ticket system is not started. Please start the system first.");
        }

        Vendor vendor = new Vendor(ticketPool, name, releaseRate);
        Thread vendorThread = new Thread(vendor);
        vendorThreads.add(vendorThread); // Add thread to the list
        vendorThread.start(); // Start the vendor thread
    }

    public void addCustomer(String name, int retrievalRate) {
        if (ticketPool == null) {
            throw new IllegalStateException("Ticket system is not started. Please start the system first.");
        }

        Customer customer = new Customer(ticketPool, name, retrievalRate);
        Thread customerThread = new Thread(customer);
        customerThreads.add(customerThread); // Add thread to the list
        customerThread.start(); // Start the customer thread
    }

    private void stopThreads(List<Thread> threads) {
        for (Thread thread : threads) {
            thread.interrupt(); // Interrupt each thread
            try {
                thread.join(); // Wait for each thread to finish
                LoggingUtility.getLogger().log(Level.INFO, "{0} has completed.", thread.getName());
            } catch (InterruptedException e) {
                LoggingUtility.getLogger().log(Level.WARNING, "{0} was interrupted while stopping.", thread.getName());
                Thread.currentThread().interrupt(); // Restore interrupted status
            }
        }
    }

    public TicketConfig getTicketConfig() {
        return ticketConfig; // Return the current ticket configuration
    }
}
