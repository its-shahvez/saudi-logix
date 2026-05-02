package com.saudi.saudi_logix_backend.service;

import org.springframework.stereotype.Service;

@Service
public class NotificationService {

    // Mock WhatsApp Notification (real mein WhatsApp Business API laga sakte hain)
    public void sendWhatsAppNotification(String phoneNumber, String message) {
        System.out.println("\n📱 WHATSAPP NOTIFICATION SENT");
        System.out.println("To: " + phoneNumber);
        System.out.println("Message: " + message);
        System.out.println("────────────────────────────────────\n");
    }

    // Shipment update ke liye notification
    public void notifyShipmentUpdate(String trackingNumber, String status, String phoneNumber) {
        String message = "🇸🇦 SaudiLogix Update\n" +
                "Tracking No: " + trackingNumber + "\n" +
                "Status: " + status + "\n" +
                "Thank you for choosing SaudiLogix!";

        sendWhatsAppNotification(phoneNumber, message);
    }
}