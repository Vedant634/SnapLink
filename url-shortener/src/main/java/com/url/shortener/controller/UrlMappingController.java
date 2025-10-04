package com.url.shortener.controller;

import com.url.shortener.dto.ClickEventDTO;
import com.url.shortener.dto.TokenBucketResult;
import com.url.shortener.dto.UrlMappingDTO;
import com.url.shortener.model.User;
import com.url.shortener.service.TokenBucketRateLimiter;
import com.url.shortener.service.UrlMappingService;
import com.url.shortener.service.UserService;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.security.Principal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/urls")
public class UrlMappingController {
    private UrlMappingService urlMappingService;
    private UserService userService;
    private TokenBucketRateLimiter rateLimiter;

    public UrlMappingController(UrlMappingService urlMappingService, UserService userService, TokenBucketRateLimiter rateLimiter) {
        this.urlMappingService = urlMappingService;
        this.userService = userService;
        this.rateLimiter = rateLimiter;
    }

    @PostMapping("/shorten")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> createShortUrl(@RequestBody Map<String,String> request, Principal principal){
        String originalUrl = request.get("originalUrl");
        User user = userService.findByUsername(principal.getName());

        TokenBucketResult result = rateLimiter.allowRequest(user.getId().toString());
        HttpHeaders headers = new HttpHeaders();
        headers.add("X-Ratelimit-Limit", "10"); // Changed to lowercase 'l' for consistency
        headers.add("X-Ratelimit-Remaining", String.valueOf(result.getRemainingTokens()));
        headers.add("X-Ratelimit-Reset", String.valueOf(result.getResetEpoch()));

        if (!result.isAllowed()) {
            return ResponseEntity.status(HttpStatus.TOO_MANY_REQUESTS)
                    .headers(headers)
                    .body(Map.of("error", "Rate limit exceeded. Try again later."));
        }

        UrlMappingDTO urlMappingDTO = urlMappingService.createShortUrl(originalUrl,user);
        return ResponseEntity.ok()
                .header("X-RateLimit-Limit", "10")
                .header("X-RateLimit-Remaining", String.valueOf(result.getRemainingTokens()))
                .header("X-RateLimit-Reset", String.valueOf(result.getResetEpoch()))
                .body(urlMappingDTO);
    }

    @GetMapping("/myurls")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<List<UrlMappingDTO>> getUserUrls(Principal principal){
        User user = userService.findByUsername(principal.getName());
        List<UrlMappingDTO> urls = urlMappingService.getUrlsByUser(user);
        return ResponseEntity.ok(urls);
    }

    @GetMapping("/analytics/{shortUrl}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<List<ClickEventDTO>> getUrlAnalytics(@PathVariable String shortUrl,
                                                               @RequestParam(value = "startDate", required = false) String startDate,
                                                               @RequestParam(value = "endDate", required = false) String endDate){
        DateTimeFormatter formatter = DateTimeFormatter.ISO_LOCAL_DATE_TIME;
        LocalDateTime end;
        if (endDate == null || endDate.trim().isEmpty()) {
            end = LocalDateTime.now();
        } else {
            end = LocalDateTime.parse(endDate, formatter);
        }

        LocalDateTime start;
        if (startDate == null || startDate.trim().isEmpty()) {
            start = end.minusMonths(1);
        } else {
            start = LocalDateTime.parse(startDate, formatter);
        }
        try {
            List<ClickEventDTO> data = urlMappingService.getClickEventsByDate(shortUrl, start, end);
            return ResponseEntity.ok(data);
        } catch (ResponseStatusException ex) {
            return ResponseEntity.status(ex.getStatusCode()).body(null);
        }
    }

    @GetMapping("/totalClicks")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<Map<LocalDate, Long>> getTotalClicksByDate(Principal principal,
                                                                     @RequestParam(value = "startDate", required = false) String startDate,
                                                                     @RequestParam(value = "endDate", required = false) String endDate){
        DateTimeFormatter formatter = DateTimeFormatter.ISO_LOCAL_DATE;
        User user = userService.findByUsername(principal.getName());
        LocalDate end;
        if (endDate == null || endDate.trim().isEmpty()) {
            end = LocalDate.now();
        } else {
            end = LocalDate.parse(endDate, formatter);
        }

        LocalDate start;
        if (startDate == null || startDate.trim().isEmpty()) {
            start = end.minusMonths(1);
        } else {
            start = LocalDate.parse(startDate, formatter);
        }

        Map<LocalDate, Long> totalClicks = urlMappingService.getTotalClicksByUserAndDate(user, start, end);
        return ResponseEntity.ok(totalClicks);
    }
}
