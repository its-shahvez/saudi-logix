package com.saudi.saudi_logix_backend.dto;

import java.time.LocalDateTime;

public class ShipmentDTO {

    private Long id;
    private String trackingNumber;
    private String origin;
    private String destination;
    private String customerId;
    private String status;

    // Saudi Specific Fields
    private String fasahStatus;
    private String saberStatus;
    private LocalDateTime customsClearanceDate;
    private LocalDateTime estimatedDeliveryDate;
    private LocalDateTime actualDeliveryDate;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTrackingNumber() { return trackingNumber; }
    public void setTrackingNumber(String trackingNumber) { this.trackingNumber = trackingNumber; }

    public String getOrigin() { return origin; }
    public void setOrigin(String origin) { this.origin = origin; }

    public String getDestination() { return destination; }
    public void setDestination(String destination) { this.destination = destination; }

    public String getCustomerId() { return customerId; }
    public void setCustomerId(String customerId) { this.customerId = customerId; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getFasahStatus() { return fasahStatus; }
    public void setFasahStatus(String fasahStatus) { this.fasahStatus = fasahStatus; }

    public String getSaberStatus() { return saberStatus; }
    public void setSaberStatus(String saberStatus) { this.saberStatus = saberStatus; }

    public LocalDateTime getCustomsClearanceDate() { return customsClearanceDate; }
    public void setCustomsClearanceDate(LocalDateTime customsClearanceDate) { this.customsClearanceDate = customsClearanceDate; }

    public LocalDateTime getEstimatedDeliveryDate() { return estimatedDeliveryDate; }
    public void setEstimatedDeliveryDate(LocalDateTime estimatedDeliveryDate) { this.estimatedDeliveryDate = estimatedDeliveryDate; }

    public LocalDateTime getActualDeliveryDate() { return actualDeliveryDate; }
    public void setActualDeliveryDate(LocalDateTime actualDeliveryDate) { this.actualDeliveryDate = actualDeliveryDate; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
}