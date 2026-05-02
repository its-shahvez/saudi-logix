package com.saudi.saudi_logix_backend.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "shipments")
public class Shipment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "tracking_number", unique = true, nullable = false)
    private String trackingNumber;

    @Column(nullable = false)
    private String origin;

    @Column(nullable = false)
    private String destination;

    @Column(name = "customer_id")
    private String customerId;

    @Column(nullable = false)
    private String status;                    // PENDING, IN_TRANSIT, CUSTOMS_CLEARANCE, DELIVERED, DELAYED

    // === SAUDI SPECIFIC FIELDS ===
    @Column(name = "fasah_status")
    private String fasahStatus;               // PENDING, CLEARED, REJECTED, UNDER_REVIEW

    @Column(name = "saber_status")
    private String saberStatus;               // COMPLIANT, NON_COMPLIANT, PENDING

    @Column(name = "customs_clearance_date")
    private LocalDateTime customsClearanceDate;

    @Column(name = "estimated_delivery_date")
    private LocalDateTime estimatedDeliveryDate;

    @Column(name = "actual_delivery_date")
    private LocalDateTime actualDeliveryDate;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    // Constructor
    public Shipment() {}

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