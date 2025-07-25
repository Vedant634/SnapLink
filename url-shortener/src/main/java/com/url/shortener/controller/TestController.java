package com.url.shortener.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController {

    @GetMapping("/test")
    public String test() {
        return "Application is working!";
    }

    @GetMapping("/")
    public String home() {
        return "URL Shortener API is running. Try /swagger-ui.html for API docs.";
    }

    @GetMapping("/check-swagger")
    public String checkSwagger() {
        return "Check these URLs: /v3/api-docs, /swagger-ui.html, /swagger-ui/index.html";
    }
}
