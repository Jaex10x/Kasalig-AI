package com.kasalig.ai.service;

import com.google.firebase.FirebaseApp;
import com.google.firebase.messaging.FirebaseMessaging;
import com.google.firebase.messaging.Message;
import com.google.firebase.messaging.Notification;
import com.google.firebase.messaging.AndroidConfig;
import com.google.firebase.messaging.AndroidNotification;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

@Service
public class NotificationService {

    private static final Logger log = LoggerFactory.getLogger(NotificationService.class);

    @Value("${semaphore.api-key:YOUR_SEMAPHORE_API_KEY_HERE}")
    private String semaphoreApiKey;

    @Value("${semaphore.sender-name:Kasalig}")
    private String semaphoreSenderName;

    private final RestTemplate restTemplate = new RestTemplate();

    /**
     * Send a push notification via Firebase Cloud Messaging.
     *
     * @param fcmToken The device's FCM registration token
     * @param title    Notification title
     * @param body     Notification body
     * @return true if sent successfully
     */
    public boolean sendPushNotification(String fcmToken, String title, String body) {
        if (fcmToken == null || fcmToken.isBlank()) {
            log.warn("Cannot send push notification: FCM token is empty");
            return false;
        }

        if (FirebaseApp.getApps().isEmpty()) {
            log.warn("Firebase is not initialized — cannot send push notification");
            return false;
        }

        try {
            Message message = Message.builder()
                .setToken(fcmToken)
                .setNotification(Notification.builder()
                    .setTitle(title)
                    .setBody(body)
                    .build())
                .setAndroidConfig(AndroidConfig.builder()
                    .setPriority(AndroidConfig.Priority.HIGH)
                    .setNotification(AndroidNotification.builder()
                        .setSound("default")
                        .setClickAction("OPEN_APP")
                        .build())
                    .build())
                .build();

            String response = FirebaseMessaging.getInstance().send(message);
            log.info("Push notification sent successfully: {}", response);
            return true;
        } catch (Exception e) {
            log.error("Failed to send push notification: {}", e.getMessage());
            return false;
        }
    }

    /**
     * Send an SMS text message directly to the document owner's phone number via Semaphore API.
     *
     * @param phoneNumber Recipient mobile number
     * @param messageText SMS text message content
     * @return true if successfully delivered or queued
     */
    public boolean sendSmsNotification(String phoneNumber, String messageText) {
        if (phoneNumber == null || phoneNumber.isBlank()) {
            log.warn("Cannot send SMS notification: Phone number is empty");
            return false;
        }

        log.info("Preparing to send SMS to {}: {}", phoneNumber, messageText);

        if (semaphoreApiKey == null || semaphoreApiKey.isBlank() || semaphoreApiKey.contains("YOUR_SEMAPHORE_API_KEY")) {
            log.info("Semaphore SMS API key not configured — simulated SMS send to {}", phoneNumber);
            return true;
        }

        try {
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

            MultiValueMap<String, String> map = new LinkedMultiValueMap<>();
            map.add("apikey", semaphoreApiKey);
            map.add("number", phoneNumber);
            map.add("message", messageText);
            map.add("sendername", semaphoreSenderName);

            HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(map, headers);
            ResponseEntity<String> response = restTemplate.postForEntity("https://api.semaphore.co/api/v4/messages", request, String.class);

            log.info("Semaphore SMS API response: {}", response.getBody());
            return response.getStatusCode().is2xxSuccessful();
        } catch (Exception e) {
            log.error("Failed to send SMS via Semaphore to {}: {}", phoneNumber, e.getMessage());
            return false;
        }
    }

    // ===== Pre-built notification templates =====

    public boolean sendReadyNotification(String fcmToken, String phoneNumber, String title, String applicationId, String municipality) {
        String body = String.format("Your %s (%s) is now READY FOR PICKUP at %s. Please bring a valid ID.", title, applicationId, municipality);
        boolean pushSent = sendPushNotification(fcmToken, "📄 Document Ready for Pickup", body);
        boolean smsSent = sendSmsNotification(phoneNumber, "Kasalig AI Notice: " + body);
        return pushSent || smsSent;
    }

    public boolean sendRenewalNotification(String fcmToken, String phoneNumber, String title, String applicationId, String expiryDate) {
        String body = String.format("Your %s (%s) is expiring on %s. Please renew before the deadline to avoid penalties.", title, applicationId, expiryDate);
        boolean pushSent = sendPushNotification(fcmToken, "⚠️ Renewal Needed", body);
        boolean smsSent = sendSmsNotification(phoneNumber, "Kasalig AI Notice: " + body);
        return pushSent || smsSent;
    }

    public boolean sendExpiredNotification(String fcmToken, String phoneNumber, String title, String applicationId) {
        String body = String.format("Your %s (%s) has EXPIRED. Please submit a new application to renew.", title, applicationId);
        boolean pushSent = sendPushNotification(fcmToken, "🔴 Document Expired", body);
        boolean smsSent = sendSmsNotification(phoneNumber, "Kasalig AI Notice: " + body);
        return pushSent || smsSent;
    }

    // Overloads for backwards compatibility
    public boolean sendReadyNotification(String fcmToken, String title, String applicationId, String municipality) {
        return sendReadyNotification(fcmToken, null, title, applicationId, municipality);
    }

    public boolean sendRenewalNotification(String fcmToken, String title, String applicationId, String expiryDate) {
        return sendRenewalNotification(fcmToken, null, title, applicationId, expiryDate);
    }

    public boolean sendExpiredNotification(String fcmToken, String title, String applicationId) {
        return sendExpiredNotification(fcmToken, null, title, applicationId);
    }
}

