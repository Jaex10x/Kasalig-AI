package com.kasalig.ai.service;

import com.google.firebase.FirebaseApp;
import com.google.firebase.messaging.FirebaseMessaging;
import com.google.firebase.messaging.Message;
import com.google.firebase.messaging.Notification;
import com.google.firebase.messaging.AndroidConfig;
import com.google.firebase.messaging.AndroidNotification;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

@Service
public class NotificationService {

    private static final Logger log = LoggerFactory.getLogger(NotificationService.class);

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

    // ===== Pre-built notification templates =====

    public boolean sendReadyNotification(String fcmToken, String title, String applicationId, String municipality) {
        return sendPushNotification(
            fcmToken,
            "📄 Document Ready for Pickup",
            String.format("Your %s (%s) is now READY FOR PICKUP at %s. Please bring a valid ID.", title, applicationId, municipality)
        );
    }

    public boolean sendRenewalNotification(String fcmToken, String title, String applicationId, String expiryDate) {
        return sendPushNotification(
            fcmToken,
            "⚠️ Renewal Needed",
            String.format("Your %s (%s) is expiring on %s. Please renew before the deadline to avoid penalties.", title, applicationId, expiryDate)
        );
    }

    public boolean sendExpiredNotification(String fcmToken, String title, String applicationId) {
        return sendPushNotification(
            fcmToken,
            "🔴 Document Expired",
            String.format("Your %s (%s) has EXPIRED. Please submit a new application to renew.", title, applicationId)
        );
    }
}
