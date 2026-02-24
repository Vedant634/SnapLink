package com.url.shortener.controller;

import com.url.shortener.model.UrlMapping;
import com.url.shortener.service.UrlMappingService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.net.URI;

@RestController
@AllArgsConstructor
public class RedirectController {

    private UrlMappingService urlMappingService;

    @GetMapping("/{shortUrl}")
    public ResponseEntity<Void> redirect(@PathVariable String shortUrl){
        String originalUrl =
                urlMappingService.getOriginalUrl(shortUrl);
        if(originalUrl != null){

            return ResponseEntity
                    .status(HttpStatus.FOUND) // 302
                    .location(URI.create(originalUrl))
                    .build();
        }

        return ResponseEntity.notFound().build();
    }
}
