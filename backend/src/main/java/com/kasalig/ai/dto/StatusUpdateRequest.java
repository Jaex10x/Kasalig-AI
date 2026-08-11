package com.kasalig.ai.dto;

public class StatusUpdateRequest {

    private String status;       // e.g. "Ready for Release", "Needs Renewal", "Expired"
    private String statusType;   // e.g. "ready", "renewal", "expired"
    private boolean sendSms;     // Whether to send SMS notification
    private String expiryDate;   // For renewal notifications

    public StatusUpdateRequest() {}

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getStatusType() { return statusType; }
    public void setStatusType(String statusType) { this.statusType = statusType; }

    public boolean isSendSms() { return sendSms; }
    public void setSendSms(boolean sendSms) { this.sendSms = sendSms; }

    public String getExpiryDate() { return expiryDate; }
    public void setExpiryDate(String expiryDate) { this.expiryDate = expiryDate; }
}
