package com.kasalig.ai.controller;

import com.kasalig.ai.dto.SmsRequest;
import com.kasalig.ai.model.Application;
import com.kasalig.ai.model.User;
import com.kasalig.ai.repository.ApplicationRepository;
import com.kasalig.ai.service.NotificationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/notifications")
public class NotificationController {

    private final NotificationService notificationService;
    private final ApplicationRepository applicationRepository;

    public NotificationController(NotificationService notificationService, ApplicationRepository applicationRepository) {
        this.notificationService = notificationService;
        this.applicationRepository = applicationRepository;
    }

    /**
     * Send a push notification manually for a specific application.
     * Request body: { "applicationId": "KSL-2026-00213", "type": "ready" | "renewal" | "expired", "expiryDate": "..." }
     */
    @PostMapping("/send")
    public ResponseEntity<?> sendNotification(@RequestBody SmsRequest request) {
        // Look up application
        Optional<Application> appOpt = applicationRepository.findById(request.getApplicationId());
        if (appOpt.isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("error", "Application not found"));
        }

        Application app = appOpt.get();
        User user = app.getUser();

        if (user == null) {
            return ResponseEntity.badRequest().body(Map.of("error", "No user linked to this application"));
        }

        String token = user.getFcmToken();
        String phone = user.getPhoneNumber();

        if ((token == null || token.isBlank()) && (phone == null || phone.isBlank())) {
            return ResponseEntity.badRequest().body(Map.of("error", "User has neither FCM token nor phone number"));
        }

        boolean sent;
        switch (request.getType()) {
            case "ready":
                sent = notificationService.sendReadyNotification(token, phone, app.getTitle(), app.getId(), "Municipality Office");
                break;
            case "renewal":
                String expiryDate = request.getExpiryDate() != null ? request.getExpiryDate() : app.getEstimatedDate();
                sent = notificationService.sendRenewalNotification(token, phone, app.getTitle(), app.getId(), expiryDate);
                break;
            case "expired":
                sent = notificationService.sendExpiredNotification(token, phone, app.getTitle(), app.getId());
                break;
            default:
                return ResponseEntity.badRequest().body(Map.of("error", "Invalid type. Must be: ready, renewal, or expired"));
        }

        if (sent) {
            return ResponseEntity.ok(Map.of("message", "SMS / Push notification sent successfully", "token", token != null ? token : "", "phoneNumber", phone != null ? phone : ""));
        } else {
            return ResponseEntity.internalServerError().body(Map.of("error", "Failed to send notification. Check server logs."));
        }
    }
}
