package com.saudi.saudi_logix_backend.service;

import com.itextpdf.kernel.pdf.PdfDocument;
import com.itextpdf.kernel.pdf.PdfWriter;
import com.itextpdf.layout.Document;
import com.itextpdf.layout.element.Cell;
import com.itextpdf.layout.element.Paragraph;
import com.itextpdf.layout.element.Table;
import com.itextpdf.layout.properties.TextAlignment;
import com.saudi.saudi_logix_backend.dto.ShipmentDTO;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Service
public class InvoiceService {

    private static final DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-MM-yyyy HH:mm:ss");

    public byte[] generateProfessionalInvoice(ShipmentDTO shipment) {
        ByteArrayOutputStream baos = new ByteArrayOutputStream();

        try {
            PdfWriter writer = new PdfWriter(baos);
            PdfDocument pdf = new PdfDocument(writer);
            Document document = new Document(pdf);

            // Header
            document.add(new Paragraph("SAUDI LOGIX")
                    .setFontSize(26)
                    .setTextAlignment(TextAlignment.CENTER)
                    .setBold());

            document.add(new Paragraph("Official Invoice - Vision 2030 Compliant")
                    .setFontSize(12)
                    .setTextAlignment(TextAlignment.CENTER));

            document.add(new Paragraph("────────────────────────────────────────────────")
                    .setFontSize(10));

            // Invoice Info
            document.add(new Paragraph("Invoice No: INV-" + System.currentTimeMillis())
                    .setFontSize(14)
                    .setBold()
                    .setTextAlignment(TextAlignment.RIGHT));

            document.add(new Paragraph("Date: " + LocalDateTime.now().format(formatter)));

            // Shipment Details Table
            Table table = new Table(new float[]{3, 7});
            table.addCell(new Cell().add(new Paragraph("Tracking Number").setBold()));
            table.addCell(new Cell().add(new Paragraph(shipment.getTrackingNumber())));

            table.addCell(new Cell().add(new Paragraph("Origin").setBold()));
            table.addCell(new Cell().add(new Paragraph(shipment.getOrigin())));

            table.addCell(new Cell().add(new Paragraph("Destination").setBold()));
            table.addCell(new Cell().add(new Paragraph(shipment.getDestination())));

            table.addCell(new Cell().add(new Paragraph("Status").setBold()));
            table.addCell(new Cell().add(new Paragraph(shipment.getStatus())));

            table.addCell(new Cell().add(new Paragraph("Fasah Status").setBold()));
            table.addCell(new Cell().add(new Paragraph(shipment.getFasahStatus() != null ? shipment.getFasahStatus() : "N/A")));

            table.addCell(new Cell().add(new Paragraph("SABER Status").setBold()));
            table.addCell(new Cell().add(new Paragraph(shipment.getSaberStatus() != null ? shipment.getSaberStatus() : "N/A")));

            document.add(table);

            // Footer
            document.add(new Paragraph("\nThank you for using SaudiLogix - Real-time Supply Chain Platform")
                    .setTextAlignment(TextAlignment.CENTER)
                    .setFontSize(10));

            document.add(new Paragraph("🇸🇦 Vision 2030 Approved").setTextAlignment(TextAlignment.CENTER));

            document.close();

            return baos.toByteArray();

        } catch (Exception e) {
            e.printStackTrace();
            return new byte[0];
        }
    }
}