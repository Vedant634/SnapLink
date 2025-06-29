package com.url.shortener.dto;

import lombok.Data;

@Data
public class TokenRefreshRequest {
    private String refreshToken;
}
