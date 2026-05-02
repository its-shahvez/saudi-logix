package com.saudi.saudi_logix_backend.service;

import com.saudi.saudi_logix_backend.dto.ShipmentDTO;
import com.saudi.saudi_logix_backend.entity.Shipment;
import com.saudi.saudi_logix_backend.repository.ShipmentRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ShipmentService {

    private final ShipmentRepository shipmentRepository;
    private final FasahService fasahService;
    private final SaberService saberService;
    private final NotificationService notificationService;
    private final SupplierRiskService supplierRiskService;
    private final CarbonFootprintService carbonFootprintService;
    private final InvoiceService invoiceService;

    public ShipmentService(ShipmentRepository shipmentRepository,
                           FasahService fasahService,
                           SaberService saberService,
                           NotificationService notificationService,
                           SupplierRiskService supplierRiskService,
                           CarbonFootprintService carbonFootprintService,
                           InvoiceService invoiceService) {
        this.shipmentRepository = shipmentRepository;
        this.fasahService = fasahService;
        this.saberService = saberService;
        this.notificationService = notificationService;
        this.supplierRiskService = supplierRiskService;
        this.carbonFootprintService = carbonFootprintService;
        this.invoiceService = invoiceService;
    }

    public ShipmentDTO createShipment(ShipmentDTO dto) {
        Shipment shipment = new Shipment();
        shipment.setTrackingNumber(dto.getTrackingNumber());
        shipment.setOrigin(dto.getOrigin());
        shipment.setDestination(dto.getDestination());
        shipment.setCustomerId(dto.getCustomerId());
        shipment.setStatus(dto.getStatus() != null ? dto.getStatus() : "PENDING");
        shipment.setFasahStatus(dto.getFasahStatus());
        shipment.setSaberStatus(dto.getSaberStatus());
        shipment.setCustomsClearanceDate(dto.getCustomsClearanceDate());
        shipment.setEstimatedDeliveryDate(dto.getEstimatedDeliveryDate());
        shipment.setActualDeliveryDate(dto.getActualDeliveryDate());
        shipment.setCreatedAt(LocalDateTime.now());
        shipment.setUpdatedAt(LocalDateTime.now());

        Shipment saved = shipmentRepository.save(shipment);

        // WhatsApp Notification on new shipment
        notificationService.notifyShipmentUpdate(saved.getTrackingNumber(), "CREATED", "+966501234567");

        return convertToDTO(saved);
    }

    public ShipmentDTO simulateFasahClearance(String trackingNumber) {
        return shipmentRepository.findByTrackingNumber(trackingNumber)
                .map(shipment -> {
                    String result = fasahService.processFasahClearance(trackingNumber);
                    shipment.setFasahStatus(result);
                    if ("CLEARED".equals(result)) {
                        shipment.setStatus("CUSTOMS_CLEARANCE");
                        shipment.setCustomsClearanceDate(LocalDateTime.now());
                    }
                    shipment.setUpdatedAt(LocalDateTime.now());
                    Shipment updated = shipmentRepository.save(shipment);
                    notificationService.notifyShipmentUpdate(trackingNumber, shipment.getStatus(), "+966501234567");
                    return convertToDTO(updated);
                })
                .orElseThrow(() -> new RuntimeException("Shipment not found"));
    }

    public ShipmentDTO simulateSaberCheck(String trackingNumber) {
        return shipmentRepository.findByTrackingNumber(trackingNumber)
                .map(shipment -> {
                    String result = saberService.checkSaberCompliance(trackingNumber);
                    shipment.setSaberStatus(result);
                    shipment.setUpdatedAt(LocalDateTime.now());
                    Shipment updated = shipmentRepository.save(shipment);
                    notificationService.notifyShipmentUpdate(trackingNumber, "SABER: " + result, "+966501234567");
                    return convertToDTO(updated);
                })
                .orElseThrow(() -> new RuntimeException("Shipment not found"));
    }

    public int getSupplierRiskScore(String vendorId) {
        return supplierRiskService.calculateRiskScore(vendorId);
    }

    public double getCarbonFootprint(String origin, String destination, double distanceKm) {
        return carbonFootprintService.calculateCarbonFootprint(origin, destination, distanceKm);
    }

    public List<ShipmentDTO> getAllShipments() {
        return shipmentRepository.findAll()
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public Optional<ShipmentDTO> getShipmentByTrackingNumber(String trackingNumber) {
        return shipmentRepository.findByTrackingNumber(trackingNumber)
                .map(this::convertToDTO);
    }

    private ShipmentDTO convertToDTO(Shipment shipment) {
        ShipmentDTO dto = new ShipmentDTO();
        dto.setId(shipment.getId());
        dto.setTrackingNumber(shipment.getTrackingNumber());
        dto.setOrigin(shipment.getOrigin());
        dto.setDestination(shipment.getDestination());
        dto.setCustomerId(shipment.getCustomerId());
        dto.setStatus(shipment.getStatus());
        dto.setFasahStatus(shipment.getFasahStatus());
        dto.setSaberStatus(shipment.getSaberStatus());
        dto.setCustomsClearanceDate(shipment.getCustomsClearanceDate());
        dto.setEstimatedDeliveryDate(shipment.getEstimatedDeliveryDate());
        dto.setActualDeliveryDate(shipment.getActualDeliveryDate());
        dto.setCreatedAt(shipment.getCreatedAt());
        dto.setUpdatedAt(shipment.getUpdatedAt());
        return dto;
    }
}