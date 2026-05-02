package com.saudi.saudi_logix_backend.service;

import org.springframework.stereotype.Service;

import java.util.Random;

@Service
public class SupplierRiskService {

    private final Random random = new Random();

    // AI Supplier Risk Score (0-100)
    public int calculateRiskScore(String vendorId) {
        // Mock AI logic
        int baseScore = random.nextInt(40) + 30; // 30-70 base
        return Math.min(100, baseScore);
    }

    public String getRiskLevel(int score) {
        if (score >= 80) return "HIGH RISK";
        if (score >= 60) return "MEDIUM RISK";
        return "LOW RISK";
    }
}