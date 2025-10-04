package com.url.shortener.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;

@Data
@AllArgsConstructor
public class TokenBucketResult {
    private final boolean allowed;
    private final int remainingTokens;
    private final long resetEpoch;


}
