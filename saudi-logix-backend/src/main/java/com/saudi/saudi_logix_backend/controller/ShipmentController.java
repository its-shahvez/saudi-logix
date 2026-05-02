package com.saudi.saudi_logix_backend.controller;

import com.saudi.saudi_logix_backend.dto.ShipmentDTO;
import com.saudi.saudi_logix_backend.service.InvoiceService;
import com.saudi.saudi_logix_backend.service.NotificationService;
import com.saudi.saudi_logix_backend.service.ShipmentService;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/shipments")
public class ShipmentController {

    private final ShipmentService shipmentService;
    private final InvoiceService invoiceService;
    private final NotificationService notificationService;

    public ShipmentController(ShipmentService shipmentService,
                              InvoiceService invoiceService,
                              NotificationService notificationService) {
        this.shipmentService = shipmentService;
        this.invoiceService = invoiceService;
        this.notificationService = notificationService;
    }

    @PostMapping
    public ResponseEntity<ShipmentDTO> createShipment(@RequestBody ShipmentDTO dto) {
        return ResponseEntity.ok(shipmentService.createShipment(dto));
    }

    @GetMapping
    public ResponseEntity<List<ShipmentDTO>> getAllShipments() {
        return ResponseEntity.ok(shipmentService.getAllShipments());
    }

    @GetMapping("/{trackingNumber}")
    public ResponseEntity<ShipmentDTO> getShipmentByTracking(@PathVariable String trackingNumber) {
        return shipmentService.getShipmentByTrackingNumber(trackingNumber)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/{trackingNumber}/fasah-clearance")
    public ResponseEntity<ShipmentDTO> simulateFasahClearance(@PathVariable String trackingNumber) {
        return ResponseEntity.ok(shipmentService.simulateFasahClearance(trackingNumber));
    }

    @PostMapping("/{trackingNumber}/saber-check")
    public ResponseEntity<ShipmentDTO> simulateSaberCheck(@PathVariable String trackingNumber) {
        return ResponseEntity.ok(shipmentService.simulateSaberCheck(trackingNumber));
    }

    @GetMapping("/risk/{vendorId}")
    public ResponseEntity<Integer> getSupplierRiskScore(@PathVariable String vendorId) {
        int score = shipmentService.getSupplierRiskScore(vendorId);
        return ResponseEntity.ok(score);
    }

    @GetMapping("/carbon/{trackingNumber}")
    public ResponseEntity<Double> getCarbonFootprint(@PathVariable String trackingNumber) {
        double distanceKm = 2500;
        double carbon = shipmentService.getCarbonFootprint("Mumbai", "Riyadh", distanceKm);
        return ResponseEntity.ok(carbon);
    }

    @GetMapping("/{trackingNumber}/invoice")
    public ResponseEntity<byte[]> downloadInvoice(@PathVariable String trackingNumber) {
        return shipmentService.getShipmentByTrackingNumber(trackingNumber)
                .map(shipment -> {
                    byte[] pdfBytes = invoiceService.generateProfessionalInvoice(shipment);
                    return ResponseEntity.ok()
                            .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=Invoice_" + shipment.getTrackingNumber() + ".pdf")
                            .contentType(MediaType.APPLICATION_PDF)
                            .body(pdfBytes);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    // 🔥 WhatsApp Notification Test
    @PostMapping("/{trackingNumber}/notify")
    public ResponseEntity<String> sendTestNotification(@PathVariable String trackingNumber) {
        return shipmentService.getShipmentByTrackingNumber(trackingNumber)
                .map(shipment -> {
                    notificationService.notifyShipmentUpdate(shipment.getTrackingNumber(), shipment.getStatus(), "+966501234567");
                    return ResponseEntity.ok("✅ WhatsApp Notification Sent Successfully!");
                })
                .orElse(ResponseEntity.notFound().build());
    }
}