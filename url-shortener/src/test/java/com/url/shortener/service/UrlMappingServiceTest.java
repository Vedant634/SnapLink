package com.url.shortener.service;

import com.url.shortener.Repository.ClickEventRepository;
import com.url.shortener.Repository.UrlMappingRepository;
import com.url.shortener.dto.UrlMappingDTO;
import com.url.shortener.model.UrlMapping;
import com.url.shortener.model.User;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Spy;

import java.time.LocalDateTime;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

import org.mockito.*;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
class UrlMappingServiceTest {

    @Mock
    private UrlMappingRepository urlMappingRepository;

    @Mock
    private ClickEventRepository clickEventRepository;

    @InjectMocks
    @Spy
    private UrlMappingService urlMappingService;

    private User testUser;

    @BeforeEach
    void setUp() {
        testUser = new User();
        testUser.setId(1L);
        testUser.setUsername("testuser");
    }

    @Test
    void TestCreateShortUrlSuccess() {
        String originalUrl = "https://example.com";
        String mockShortUrl = "abc123";

        UrlMapping savedEntity = new UrlMapping();
        savedEntity.setOriginalUrl(originalUrl);
        savedEntity.setShortUrl(mockShortUrl);
        savedEntity.setUser(testUser);
        savedEntity.setCreatedDate(LocalDateTime.now());

        UrlMappingDTO expectedDTO = new UrlMappingDTO();
        expectedDTO.setOriginalUrl(originalUrl);
        expectedDTO.setShortUrl(mockShortUrl);

        doReturn(mockShortUrl).when(urlMappingService).generateShortUrl();
        doReturn(expectedDTO).when(urlMappingService).convertToDto(any(UrlMapping.class));

        when(urlMappingRepository.save(any(UrlMapping.class))).thenReturn(savedEntity);

        UrlMappingDTO result = urlMappingService.createShortUrl(originalUrl, testUser);

        assertEquals(expectedDTO.getOriginalUrl(), result.getOriginalUrl());
        assertEquals(expectedDTO.getShortUrl(), result.getShortUrl());

        verify(urlMappingService).generateShortUrl();
        verify(urlMappingRepository).save(any(UrlMapping.class));
        verify(urlMappingService).convertToDto(any(UrlMapping.class));
    }
}