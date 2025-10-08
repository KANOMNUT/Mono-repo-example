package com.example.demo.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HealthController {

    @GetMapping("/healthz")
    public String liveness() {
        return "OK";
    }

    @GetMapping("/readyz")
    public String readiness() {
        return "READY";
    }
}
