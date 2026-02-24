package com.url.shortener.kafka.consumer;

import com.url.shortener.Repository.ClickEventRepository;
import com.url.shortener.Repository.UrlMappingRepository;
import com.url.shortener.dto.kafka.ClickEventMessage;
import com.url.shortener.model.ClickEvent;
import com.url.shortener.model.UrlMapping;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
public class ClickEventConsumer {
    private UrlMappingRepository urlMappingRepository;
    private ClickEventRepository clickEventRepository;

    public ClickEventConsumer(UrlMappingRepository urlMappingRepository, ClickEventRepository clickEventRepository) {
        this.urlMappingRepository = urlMappingRepository;
        this.clickEventRepository = clickEventRepository;
    }

    @KafkaListener(
            topics = "click-events",
            groupId = "snaplink-group"
    )
     public void consumeClickEvent(ClickEventMessage message) {
//        System.out.println("Consumed: " + message.getShortUrl());
        UrlMapping urlMapping = urlMappingRepository.findByShortUrl(message.getShortUrl());
        if (urlMapping != null) {
            urlMapping.setClickCount(urlMapping.getClickCount() + 1);
            urlMappingRepository.save(urlMapping);
            ClickEvent clickEvent = new ClickEvent();
            clickEvent.setUrlMapping(urlMapping);
            clickEvent.setClickDate(message.getTimestamp());
            clickEventRepository.save(clickEvent);

        }
    }

}
