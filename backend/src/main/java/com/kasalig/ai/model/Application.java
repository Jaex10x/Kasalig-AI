package com.kasalig.ai.model;

import jakarta.persistence.*;
import java.util.List;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "applications")
public class Application {

    @Id
    @Column(length = 50)
    private String id;

    @Column(nullable = false, length = 150)
    private String title;

    @Column(length = 50)
    private String icon;

    @Column(nullable = false, length = 50)
    private String status;

    @Column(name = "status_type", nullable = false, length = 50)
    private String statusType;

    @Column(name = "steps_completed")
    private Integer stepsCompleted = 0;

    @Column(name = "total_steps")
    private Integer totalSteps = 4;

    @Column(name = "submitted_date", length = 100)
    private String submittedDate;

    @Column(name = "estimated_date", length = 100)
    private String estimatedDate;

    @Column(name = "completed_date", length = 100)
    private String completedDate;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @OneToMany(mappedBy = "application", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<TimelineStep> timeline;

    @OneToOne(mappedBy = "application", cascade = CascadeType.ALL, orphanRemoval = true)
    private PickupInfo pickupInfo;

    // Default Constructor
    public Application() {}

    // Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getIcon() { return icon; }
    public void setIcon(String icon) { this.icon = icon; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getStatusType() { return statusType; }
    public void setStatusType(String statusType) { this.statusType = statusType; }

    public Integer getStepsCompleted() { return stepsCompleted; }
    public void setStepsCompleted(Integer stepsCompleted) { this.stepsCompleted = stepsCompleted; }

    public Integer getTotalSteps() { return totalSteps; }
    public void setTotalSteps(Integer totalSteps) { this.totalSteps = totalSteps; }

    public String getSubmittedDate() { return submittedDate; }
    public void setSubmittedDate(String submittedDate) { this.submittedDate = submittedDate; }

    public String getEstimatedDate() { return estimatedDate; }
    public void setEstimatedDate(String estimatedDate) { this.estimatedDate = estimatedDate; }

    public String getCompletedDate() { return completedDate; }
    public void setCompletedDate(String completedDate) { this.completedDate = completedDate; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }

    public List<TimelineStep> getTimeline() { return timeline; }
    public void setTimeline(List<TimelineStep> timeline) { this.timeline = timeline; }

    public PickupInfo getPickupInfo() { return pickupInfo; }
    public void setPickupInfo(PickupInfo pickupInfo) { this.pickupInfo = pickupInfo; }
}
