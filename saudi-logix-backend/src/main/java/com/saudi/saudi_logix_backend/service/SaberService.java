package com.saudi.saudi_logix_backend.service;

import org.springframework.stereotype.Service;

import java.util.Random;

@Service
public class SaberService {

    private final Random random = new Random();

    // Mock SABER (SASO) Compliance Check
    public String checkSaberCompliance(String trackingNumber) {
        int chance = random.nextInt(100);
        if (chance < 85) {
            return "COMPLIANT";
        } else if (chance < 95) {
            return "UNDER_REVIEW";
        } else {
            return "NON_COMPLIANT";
        }
    }
}