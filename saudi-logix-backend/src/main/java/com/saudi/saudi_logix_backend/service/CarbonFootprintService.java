package com.saudi.saudi_logix_backend.service;

import org.springframework.stereotype.Service;

import java.util.Random;

@Service
public class CarbonFootprintService {

    private final Random random = new Random();

    // Mock Carbon Footprint Calculator (Vision 2030 ke hisaab se)
    public double calculateCarbonFootprint(String origin, String destination, double distanceKm) {
        // Average truck emission ~ 0.8 kg CO2 per km
        double baseEmission = distanceKm * 0.8;
        // Green route optimization (10-30% saving)
        double greenSaving = baseEmission * (random.nextInt(30) + 10) / 100.0;
        return Math.round((baseEmission - greenSaving) * 100.0) / 100.0;
    }

    public String getGreenRouteSuggestion() {
        return "Green Route Suggested: Use electric truck route via NEOM corridor (22% less emission)";
    }
}