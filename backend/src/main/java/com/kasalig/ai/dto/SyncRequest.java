package com.kasalig.ai.dto;

// Request body for syncing Supabase Auth user to the database
public class SyncRequest {
    private String supabaseAuthId;
    private String fullName;
    private String email;

    public String getSupabaseAuthId() { return supabaseAuthId; }
    public void setSupabaseAuthId(String supabaseAuthId) { this.supabaseAuthId = supabaseAuthId; }

    public String getFullName() { return fullName; }
    public void setFullName(String fullName) { this.fullName = fullName; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
}
