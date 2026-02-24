package com.url.shortener.dto.kafka;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@NoArgsConstructor
@Data
@AllArgsConstructor
public class ClickEventMessage {
    private String shortUrl;
    private LocalDateTime timestamp;
}
