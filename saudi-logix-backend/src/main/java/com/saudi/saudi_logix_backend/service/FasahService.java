package com.saudi.saudi_logix_backend.service;

import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Random;

@Service
public class FasahService {

    private final Random random = new Random();

    // Mock Fasah Clearance (Saudi Customs)
    public String processFasahClearance(String trackingNumber) {
        // 80% chance cleared, 20% pending/rejected (realistic simulation)
        int chance = random.nextInt(100);

        if (chance < 80) {
            return "CLEARED";
        } else if (chance < 95) {
            return "UNDER_REVIEW";
        } else {
            return "REJECTED";
        }
    }

    public LocalDateTime getEstimatedClearanceTime() {
        // 1-3 din mein clearance
        return LocalDateTime.now().plusDays(random.nextInt(3) + 1);
    }
}