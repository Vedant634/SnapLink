package com.url.shortener.service;

import com.url.shortener.Repository.ClickEventRepository;
import com.url.shortener.Repository.UrlMappingRepository;
import com.url.shortener.dto.ClickEventDTO;
import com.url.shortener.dto.UrlCacheDTO;
import com.url.shortener.dto.UrlMappingDTO;
import com.url.shortener.kafka.producer.ClickEventProducer;
import com.url.shortener.model.ClickEvent;
import com.url.shortener.model.UrlMapping;
import com.url.shortener.model.User;
import lombok.AllArgsConstructor;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import tools.jackson.databind.ObjectMapper;

import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Random;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class
UrlMappingService {

    private UrlMappingRepository urlMappingRepository;
    private ClickEventRepository clickEventRepository;
    private ClickEventProducer clickEventProducer;
    private StringRedisTemplate redisTemplate;
    private ObjectMapper objectMapper;

    public UrlMappingDTO createShortUrl(String originalUrl, User user) {

        UrlMapping urlMapping = new UrlMapping();
        urlMapping.setOriginalUrl(originalUrl);

        urlMapping.setUser(user);
        urlMapping.setCreatedDate(LocalDateTime.now());
        UrlMapping savedUrlMapping = urlMappingRepository.save(urlMapping);

        String shortUrl = idToBase62(savedUrlMapping.getId());
        savedUrlMapping.setShortUrl(shortUrl);

        savedUrlMapping = urlMappingRepository.save(savedUrlMapping);

        return convertToDto(urlMapping);
    }

     UrlMappingDTO convertToDto(UrlMapping urlMapping){
        UrlMappingDTO urlMappingDTO = new UrlMappingDTO();
        urlMappingDTO.setId(urlMapping.getId());
        urlMappingDTO.setOriginalUrl(urlMapping.getOriginalUrl());
        urlMappingDTO.setShortUrl(urlMapping.getShortUrl());
        urlMappingDTO.setClickCount(urlMapping.getClickCount());
        urlMappingDTO.setCreatedDate(urlMapping.getCreatedDate());
        urlMappingDTO.setUsername(urlMapping.getUser().getUsername());
        return urlMappingDTO;

    }

    public String idToBase62(long id) {
        final String BASE62 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        StringBuilder sb = new StringBuilder();
        while (id > 0) {
            sb.append(BASE62.charAt((int) (id % 62)));
            id /= 62;
        }
        return sb.reverse().toString();
    }

    public String generateUniqueShortUrl() {
        String characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        Random random = new Random();
        String shortUrl;

        while (true) {
            StringBuilder sb = new StringBuilder(8);
            for (int i = 0; i < 8; i++) {
                sb.append(characters.charAt(random.nextInt(characters.length())));
            }
            shortUrl = sb.toString();


            if (urlMappingRepository.findByShortUrl(shortUrl) == null) {
                break;
            }

        }

        return shortUrl;
    }

    public List<UrlMappingDTO> getUrlsByUser(User user) {
        return urlMappingRepository.findByUser(user).stream()
                .map(this::convertToDto)
                .toList();
    }

    public List<ClickEventDTO> getClickEventsByDate(String shortUrl, LocalDateTime start, LocalDateTime end) {
        UrlMapping urlMapping = urlMappingRepository.findByShortUrl(shortUrl);
        if (urlMapping == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Short URL not found");
        }
        if(urlMapping != null){
            return clickEventRepository.findByUrlMappingAndClickDateBetween(urlMapping,start,end).stream()
                    .collect(Collectors.groupingBy(click -> click.getClickDate().toLocalDate(), Collectors.counting()))
                    .entrySet().stream()
                    .map(entry -> {
                        ClickEventDTO clickEventDTO = new ClickEventDTO();
                        clickEventDTO.setClickDate(entry.getKey());
                        clickEventDTO.setCount(entry.getValue());
                        return clickEventDTO;
                    }).collect(Collectors.toList());
        }
        return null;
    }

    public Map<LocalDate, Long> getTotalClicksByUserAndDate(User user, LocalDate start, LocalDate end) {
        List<UrlMapping > urlMappings = urlMappingRepository.findByUser(user);
        List<ClickEvent> clickEvents = clickEventRepository.findByUrlMappingInAndClickDateBetween(urlMappings,start.atStartOfDay(),end.plusDays(1).atStartOfDay());
        return clickEvents.stream()
                .collect(Collectors.groupingBy(click -> click.getClickDate().toLocalDate(),Collectors.counting()));
    }

    public String getOriginalUrl(String shortUrl) {
        String cacheKey = "url:" + shortUrl;
        String cachedJson = redisTemplate.opsForValue().get(cacheKey);
        UrlMapping urlMapping = null;

        if (cachedJson != null) {
            try {
                UrlCacheDTO cachedDto =
                        objectMapper.readValue(cachedJson, UrlCacheDTO.class);

                clickEventProducer.sendClickEvent(shortUrl);
                return cachedDto.getOriginalUrl();

            } catch (Exception e) {
                redisTemplate.delete(cacheKey);
            }
        }

        UrlMapping entity =
                urlMappingRepository.findByShortUrl(shortUrl);

        if (entity == null) {
            return null;
        }

        UrlCacheDTO dto =
                new UrlCacheDTO(entity.getOriginalUrl());

        try {
            String json =
                    objectMapper.writeValueAsString(dto);

            redisTemplate.opsForValue()
                    .set(cacheKey, json, Duration.ofMinutes(30));

        } catch (Exception e) {
            e.printStackTrace();
        }

        clickEventProducer.sendClickEvent(shortUrl);

        return dto.getOriginalUrl();
    }
}
