package com.url.shortener.kafka.producer;

import com.url.shortener.dto.kafka.ClickEventMessage;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class ClickEventProducer {
    private final KafkaTemplate<String, ClickEventMessage> kafkaTemplate;

    public ClickEventProducer(KafkaTemplate<String, ClickEventMessage> kafkaTemplate) {
        this.kafkaTemplate = kafkaTemplate;
    }

    public void sendClickEvent(String shortUrl) {
        ClickEventMessage message = new ClickEventMessage(shortUrl, LocalDateTime.now());
        kafkaTemplate.send("click-events",shortUrl, message);
    }
}
