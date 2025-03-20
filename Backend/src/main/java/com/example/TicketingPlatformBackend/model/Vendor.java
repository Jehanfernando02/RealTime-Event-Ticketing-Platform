package com.example.TicketingPlatformBackend.model;

import java.util.Random;
import java.util.logging.Level;

/**
 * Vendor represents a vendor in the ticketing system that releases
 * a certain number of tickets at defined intervals. It implements Runnable
 * to allow concurrent execution as a separate thread.
 */
public class Vendor implements Runnable {
    private final TicketPool ticketPool; // Shared TicketPool instance where vendors add their released tickets
    private final String name; // Name of the vendor
    private final int releaseRate; // Maximum number of tickets that can be added per interval
    private final Random random = new Random();

    /**
     * Constructs a Vendor with specified TicketPool reference and release rate.
     *
     * @param ticketPool The shared TicketPool where this vendor will add its released tickets.
     * @param name The name of this vendor.
     * @param releaseRate The maximum number of tickets that can be added per interval by this vendor.
     */
    public Vendor(TicketPool ticketPool, String name, int releaseRate) {
        this.ticketPool = ticketPool;
        this.name = name;
        this.releaseRate = releaseRate;
    }

    @Override
    public void run() {
        while (!Thread.currentThread().isInterrupted()) {  // Loop until interrupted
            try {
                // Simulate adding a random number of tickets based on release rate
                int ticketsToAdd = random.nextInt(releaseRate) + 1;  // Randomly determine how many to add (between 1 and release rate)
                ticketPool.addTickets(ticketsToAdd, name);  // Add these determined amount of tickets into shared pool

                Thread.sleep(1000);  // Wait for 1 second before attempting to add more

            } catch (InterruptedException e) {  // Handle interruption gracefully during sleep or other blocking operations
                Thread.currentThread().interrupt();  // Restore interrupt status after catching exception
                LoggingUtility.getLogger().log(Level.WARNING, "{0} interrupted: {1}", new Object[]{name, e.getMessage()});
            }
        }
    }


    /**
     * Returns the vendor's name. This is useful for logging and tracking operations performed by this vendor.
     *
     * @return Vendor's name.
     */
    public String getName() {
        return name;
    }
}
