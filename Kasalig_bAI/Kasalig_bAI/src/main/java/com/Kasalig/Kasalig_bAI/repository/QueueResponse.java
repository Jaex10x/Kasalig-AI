package com.Kasalig.Kasalig_bAI.repository;

public class QueueResponse {
    private Long queueId;
    private String full_name;
    private String email;
    private String contact_number;
    private String service_type;
    private String location_type; // "BARANGAY" or "HALL"
    private String location_name;
    private String date;
    private String time;
    private String additional_details;
    private String status; // WAITING, SERVING, COMPLETED, CANCELLED
    private String assigned_to_hall; // Optional: which hall is serving this (only for BARANGAY)

    // Getters and Setters
    public Long getQueueId() { return queueId; }
    public void setQueueId(Long queueId) { this.queueId = queueId; }

    public String getFull_name() { return full_name; }
    public void setFull_name(String full_name) { this.full_name = full_name; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getContact_number() { return contact_number; }
    public void setContact_number(String contact_number) { this.contact_number = contact_number; }

    public String getService_type() { return service_type; }
    public void setService_type(String service_type) { this.service_type = service_type; }

    public String getLocation_type() { return location_type; }
    public void setLocation_type(String location_type) { this.location_type = location_type; }

    public String getLocation_name() { return location_name; }
    public void setLocation_name(String location_name) { this.location_name = location_name; }

    public String getDate() { return date; }
    public void setDate(String date) { this.date = date; }

    public String getTime() { return time; }
    public void setTime(String time) { this.time = time; }

    public String getAdditional_details() { return additional_details; }
    public void setAdditional_details(String additional_details) { this.additional_details = additional_details; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getAssigned_to_hall() { return assigned_to_hall; }
    public void setAssigned_to_hall(String assigned_to_hall) { this.assigned_to_hall = assigned_to_hall; }
}
