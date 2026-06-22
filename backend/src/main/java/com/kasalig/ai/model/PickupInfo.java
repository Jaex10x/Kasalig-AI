package com.kasalig.ai.model;

import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "pickup_info")
public class PickupInfo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JsonIgnore
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "application_id", nullable = false, unique = true)
    private Application application;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String location;

    @Column(nullable = false, length = 100)
    private String hours;

    // Default Constructor
    public PickupInfo() {}

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Application getApplication() { return application; }
    public void setApplication(Application application) { this.application = application; }

    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }

    public String getHours() { return hours; }
    public void setHours(String hours) { this.hours = hours; }
}
