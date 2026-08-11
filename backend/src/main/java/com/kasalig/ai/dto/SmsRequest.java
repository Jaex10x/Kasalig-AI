package com.kasalig.ai.dto;

public class SmsRequest {

    private String applicationId;
    private String type; // "ready", "renewal", "expired"
    private String expiryDate; // Only needed for "renewal" type

    public SmsRequest() {}

    public String getApplicationId() { return applicationId; }
    public void setApplicationId(String applicationId) { this.applicationId = applicationId; }

    public String getType() { return type; }
    public void setType(String type) { this.type = type; }

    public String getExpiryDate() { return expiryDate; }
    public void setExpiryDate(String expiryDate) { this.expiryDate = expiryDate; }
}
