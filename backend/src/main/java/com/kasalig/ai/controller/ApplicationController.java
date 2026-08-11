package com.kasalig.ai.controller;

import com.kasalig.ai.dto.StatusUpdateRequest;
import com.kasalig.ai.model.Application;
import com.kasalig.ai.model.User;
import com.kasalig.ai.service.ApplicationService;
import com.kasalig.ai.service.NotificationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/applications")
public class ApplicationController {

    private final ApplicationService applicationService;
    private final NotificationService notificationService;

    public ApplicationController(ApplicationService applicationService, NotificationService notificationService) {
        this.applicationService = applicationService;
        this.notificationService = notificationService;
    }

    @GetMapping
    public ResponseEntity<List<Application>> getApplications(@RequestParam Long userId) {
        List<Application> apps = applicationService.getApplicationsByUserId(userId);
        return ResponseEntity.ok(apps);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Application> getApplication(@PathVariable String id) {
        return applicationService.getApplicationById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    /**
     * Update application status and optionally send Push notification.
     * PUT /api/applications/{id}/status
     * Body: { "status": "Ready for Release", "statusType": "ready", "sendSms": true }
     */
    @PutMapping("/{id}/status")
    public ResponseEntity<?> updateStatus(@PathVariable String id, @RequestBody StatusUpdateRequest request) {
        return applicationService.getApplicationById(id).map(app -> {
            // Update the application status
            app.setStatus(request.getStatus());
            app.setStatusType(request.getStatusType());
            applicationService.saveApplication(app);

            // Send Push Notification if requested
            if (request.isSendSms()) {
                User user = app.getUser();
                if (user != null && user.getFcmToken() != null && !user.getFcmToken().isBlank()) {
                    String token = user.getFcmToken();
                    boolean sent = false;

                    switch (request.getStatusType()) {
                        case "ready":
                            sent = notificationService.sendReadyNotification(token, app.getTitle(), app.getId(), "Municipality Office");
                            break;
                        case "renewal":
                            String expiryDate = request.getExpiryDate() != null ? request.getExpiryDate() : app.getEstimatedDate();
                            sent = notificationService.sendRenewalNotification(token, app.getTitle(), app.getId(), expiryDate);
                            break;
                        case "expired":
                            sent = notificationService.sendExpiredNotification(token, app.getTitle(), app.getId());
                            break;
                    }

                    return ResponseEntity.ok(Map.of(
                        "message", "Status updated" + (sent ? " and Push notification sent" : " (Push notification failed)"),
                        "pushSent", sent
                    ));
                } else {
                    return ResponseEntity.ok(Map.of(
                        "message", "Status updated (no FCM token — notification skipped)",
                        "pushSent", false
                    ));
                }
            }

            return ResponseEntity.ok(Map.of("message", "Status updated", "pushSent", false));
        }).orElse(ResponseEntity.notFound().build());
    }
}
