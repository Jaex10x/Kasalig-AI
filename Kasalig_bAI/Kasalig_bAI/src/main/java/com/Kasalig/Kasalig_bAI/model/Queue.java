package com.Kasalig.Kasalig_bAI.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "queue")
@Data
public class Queue {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long queueId;

    @Column(nullable = false)
    private String fullName;

    @Column(unique = true, nullable = false)
    private String email;

    @Column(nullable = false)
    private String contactNumber;

    @Column(nullable = false)
    private String serviceType;

    @Column(nullable = false)
    private String locationType; // "BARANGAY" or "HALL"

    private String locationName; // Barangay hall or specific hall name
    private String date;
    private String time;
    private String additionalDetails;

    @Column(nullable = false)
    private String status = "WAITING"; // WAITING, SERVING, COMPLETED, CANCELLED

    private String assignedToHall; // which hall is serving this
}
