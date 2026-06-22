package com.kasalig.ai.model;

import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "timeline_steps")
public class TimelineStep {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "application_id", nullable = false)
    private Application application;

    @Column(name = "step_label", nullable = false, length = 150)
    private String stepLabel;

    @Column(name = "step_date", length = 100)
    private String stepDate;

    private Boolean done = false;

    // Default Constructor
    public TimelineStep() {}

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Application getApplication() { return application; }
    public void setApplication(Application application) { this.application = application; }

    public String getStepLabel() { return stepLabel; }
    public void setStepLabel(String stepLabel) { this.stepLabel = stepLabel; }

    public String getStepDate() { return stepDate; }
    public void setStepDate(String stepDate) { this.stepDate = stepDate; }

    public Boolean getDone() { return done; }
    public void setDone(Boolean done) { this.done = done; }
}
