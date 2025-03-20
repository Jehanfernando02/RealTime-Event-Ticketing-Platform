package com.example.TicketingPlatformBackend.model;

import java.util.logging.Level;

/**
 * TicketPool manages the available tickets in the system and handles concurrent access
 * by both vendors and customers using synchronized methods.
 */
public class TicketPool {
    private int currentTickets; // Current number of tickets available in the pool
    private final int maxCapacity; // Maximum capacity of tickets that can be held in the pool

    private int totalTicketsAddedByVendors; // Total number of tickets added by vendors
    private int totalTicketsPurchasedByCustomers; // Total number of tickets purchased by customers

    /**
     * Initializes a TicketPool with a specified initial number of tickets and maximum capacity.
     *
     * @param initialTickets The initial number of tickets available in the pool.
     * @param maxCapacity The maximum capacity that can be held in the pool.
     */
    public TicketPool(int initialTickets, int maxCapacity) {
        this.currentTickets = initialTickets;
        this.maxCapacity = maxCapacity;
        this.totalTicketsAddedByVendors = initialTickets;
        this.totalTicketsPurchasedByCustomers = 0;

        LoggingUtility.getLogger().log(Level.INFO, "Initialized TicketPool with {0} tickets. Current Pool Size: {1}/{2}",
                new Object[]{initialTickets, currentTickets, maxCapacity});
    }

    /**
     * Adds a specified number of tickets to the pool if it does not exceed maximum capacity.
     *
     * @param ticketsToAdd The number of tickets to be added by a vendor.
     * @param vendorName The name of the vendor adding these tickets (for logging purposes).
     */
    public synchronized void addTickets(int ticketsToAdd, String vendorName) {
        if (currentTickets + ticketsToAdd <= maxCapacity) {
            currentTickets += ticketsToAdd;
            totalTicketsAddedByVendors += ticketsToAdd;
            LoggingUtility.getLogger().log(Level.INFO, "{0} added {1} tickets. Current Pool Size: {2}/{3}",
                    new Object[]{vendorName, ticketsToAdd, currentTickets, maxCapacity});
        } else {
            LoggingUtility.getLogger().log(Level.WARNING, "Cannot add {0} tickets by {1}. Exceeds max capacity.",
                    new Object[]{ticketsToAdd, vendorName});
        }
    }

    /**
     * Removes a specified number of tickets from the pool when customers attempt to purchase them.
     *
     * @param ticketsToRemove The number of tickets that a customer wishes to purchase.
     * @param customerName The name of the customer making the purchase (for logging purposes).
     */
    public synchronized void removeTicket(int ticketsToRemove, String customerName) {
        if (currentTickets >= ticketsToRemove) {
            currentTickets -= ticketsToRemove;
            totalTicketsPurchasedByCustomers += ticketsToRemove;
            LoggingUtility.getLogger().log(Level.INFO, "{0} purchased {1} tickets. Current Pool Size: {2}/{3}",
                    new Object[]{customerName, ticketsToRemove, currentTickets, maxCapacity});
        } else if (currentTickets == 0) {
            LoggingUtility.getLogger().log(Level.WARNING, "No tickets available for {0}.", customerName);
        } else {
            LoggingUtility.getLogger().log(Level.WARNING, "{0} tried to purchase {1} tickets but only {2} are available.",
                    new Object[]{customerName, ticketsToRemove, currentTickets});
        }
    }

    /**
     * Admin function to return canceled or unused tickets back into the pool.
     *
     * @param ticketsToReturn The number of canceled or unused tickets being returned.
     * @param customerName The name of the customer whose canceled tickets are being returned (for logging purposes).
     */
    public synchronized void adminRemoveTicket(int ticketsToReturn, String customerName) {
        if (currentTickets + ticketsToReturn <= maxCapacity) {
            currentTickets += ticketsToReturn;
            LoggingUtility.getLogger().log(Level.INFO, "Admin returned {0} canceled ticket(s) from {1}. Current Pool Size: {2}/{3}",
                    new Object[]{ticketsToReturn, customerName, currentTickets, maxCapacity});
        } else {
            LoggingUtility.getLogger().log(Level.WARNING, "Cannot return {0} tickets from {1}. Exceeds max capacity.",
                    new Object[]{ticketsToReturn, customerName});
        }
    }

    /**
     * Returns current size of available tickets in pool.
     *
     * @return The current size of available tickets.
     */
    public synchronized int getCurrentSize() {
        return currentTickets;
    }

    /**
     * Returns maximum capacity allowed in pool.
     *
     * @return The maximum capacity.
     */
    public synchronized int getMaxCapacity() {
        return maxCapacity;
    }

    /**
     * Returns total number of added by vendors for reporting purposes.
     *
     * @return Total added by vendors.
     */
    public synchronized int getTotalTicketsAddedByVendors() {
        return totalTicketsAddedByVendors;
    }

    /**
     * Returns total number purchased by customers for reporting purposes.
     *
     * @return Total purchased by customers.
     */
    public synchronized int getTotalTicketsPurchasedByCustomers() {
        return totalTicketsPurchasedByCustomers;
    }

}
