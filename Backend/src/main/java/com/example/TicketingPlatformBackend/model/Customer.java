package com.example.TicketingPlatformBackend.model;

import java.util.Random;
import java.util.logging.Level;

/**
 * The Customer class represents a customer in the ticketing system.
 * It implements the Runnable interface to allow concurrent ticket purchasing.
 */
public class Customer implements Runnable {
    private final TicketPool ticketPool; // Shared TicketPool instance for managing tickets
    private final String name; // Name of the customer
    private final int retrievalRate; // Maximum number of tickets the customer can attempt to purchase per interval
    private final Random random = new Random(); // Random generator for simulating ticket purchases

    private int canceledTickets = 0; // Counter to track the number of canceled tickets

    /**
     * Constructs a Customer with a specified TicketPool, name, and retrieval rate.
     *
     * @param ticketPool The shared TicketPool where tickets will be purchased.
     * @param name The name of the customer.
     * @param retrievalRate The maximum number of tickets to purchase per interval.
     */
    public Customer(TicketPool ticketPool, String name, int retrievalRate) {
        this.ticketPool = ticketPool;
        this.name = name;
        this.retrievalRate = retrievalRate;
    }

    @Override
    public void run() {
        // Continuously attempt to purchase tickets until the thread is interrupted
        while (!Thread.currentThread().isInterrupted()) {
            try {
                // Simulate ticket purchase based on retrieval rate
                int ticketsToPurchase = random.nextInt(retrievalRate) + 1; // Randomly purchase between 1 and retrieval rate
                ticketPool.removeTicket(ticketsToPurchase, name); // Attempt to remove tickets from the pool

                Thread.sleep(1000); // Wait for 1 second before trying to purchase more

                // Simulate cancellation after some time (for demonstration)
                if (random.nextBoolean()) { // Randomly decide whether to cancel some purchases
                    cancelPurchase(ticketsToPurchase); // Track canceled tickets for admin return
                }

            } catch (InterruptedException e) { // Handle interruption gracefully
                Thread.currentThread().interrupt(); // Restore interrupt status
                LoggingUtility.getLogger().log(Level.WARNING, "{0} interrupted: {1}", new Object[]{name, e.getMessage()});
            }
        }
    }

    /**
     * Cancels a specified number of tickets and updates the canceledTickets counter.
     *
     * @param numberOfCanceledTickets The number of tickets that the customer wishes to cancel.
     */
    public void cancelPurchase(int numberOfCanceledTickets) {
        this.canceledTickets += numberOfCanceledTickets; // Increment the count of canceled tickets
        LoggingUtility.getLogger().log(Level.INFO, "{0} canceled {1} ticket(s).", new Object[]{name, numberOfCanceledTickets});

        // Notify admin to return these canceled tickets back to the pool immediately
        ticketPool.adminRemoveTicket(numberOfCanceledTickets, name);
    }

    /**
     * Returns the total number of canceled tickets by this customer.
     *
     * @return The count of canceled tickets.
     */
    public int getCanceledTickets() {
        return canceledTickets; // Getter for accessing the count of canceled tickets
    }

    /**
     * Resets the count of canceled tickets back to zero.
     */
    public void resetCanceledTickets() {
        this.canceledTickets = 0; // Reset after admin processes cancellations
    }

    /**
     * Returns the name of the customer.
     *
     * @return The customer's name.
     */
    public String getName() {
        return name; // Getter for accessing the customer's name
    }
}
