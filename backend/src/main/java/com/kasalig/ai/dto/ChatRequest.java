package com.kasalig.ai.dto;

// Request body for saving chat messages
public class ChatRequest {
    private Long userId;
    private String sender;
    private String content;

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    public String getSender() { return sender; }
    public void setSender(String sender) { this.sender = sender; }

    public String getContent() { return content; }
    public void setContent(String content) { this.content = content; }
}
