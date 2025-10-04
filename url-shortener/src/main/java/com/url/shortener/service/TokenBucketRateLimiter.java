package com.url.shortener.service;

import com.url.shortener.dto.TokenBucketResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;

import java.time.Instant;

@Service
public class TokenBucketRateLimiter {

    @Autowired
    private StringRedisTemplate redisTemplate;

    //Max 10 requests
    private final int bucketCapacity = 10;
    //0.166 token per sec;
    private final double refillRatePerSecond = 10.0/60.0;

    public TokenBucketResult allowRequest(String userId){
        String tokenKey = "bucket:tokens:" + userId;
        String timestampKey = "bucket:lastRefill:" + userId;

        long now = Instant.now().getEpochSecond();

        String lastRefilStr = redisTemplate.opsForValue().get(timestampKey);
        long lastRefil = (lastRefilStr == null) ? now : Long.parseLong(lastRefilStr);

        String tokensStr = redisTemplate.opsForValue().get(tokenKey);
        Double tokens = (tokensStr == null) ? bucketCapacity : Double.parseDouble(tokensStr);

        long elapsed = now - lastRefil;
        double tokensToAdd = elapsed * refillRatePerSecond;

        tokens = Math.min(bucketCapacity,tokens + tokensToAdd);

        redisTemplate.opsForValue().set(timestampKey, String.valueOf(now));

        boolean allowed = false;
        if(tokens >= 1){
            tokens -= 1;
            allowed = true;
        }

        redisTemplate.opsForValue().set(tokenKey, String.valueOf(tokens));
        double missingTokens = bucketCapacity - tokens;
        long resetInSeconds = (long) Math.ceil(missingTokens / refillRatePerSecond);
        long resetEpoch = now + resetInSeconds;

        return new TokenBucketResult(allowed,(int)Math.floor(tokens),resetEpoch);
    }
}
