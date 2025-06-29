package com.url.shortener.service;

import com.url.shortener.Repository.RefreshTokenRepository;
import com.url.shortener.Repository.UserRepository;
import com.url.shortener.model.RefreshToken;
import com.url.shortener.model.User;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class RefreshTokenService {

    private final RefreshTokenRepository  refreshTokenRepository;
    private final UserRepository userRepository;

    @Value("${jwt.refresh-token.expiration}")
    private Long refreshTokenDurationMs;

    public RefreshTokenService(RefreshTokenRepository refreshTokenRepository, UserRepository userRepository) {
        this.refreshTokenRepository = refreshTokenRepository;
        this.userRepository = userRepository;
    }

    public RefreshToken createRefreshToken(String username, String token) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found with username: " + username));

        RefreshToken refreshToken = refreshTokenRepository.findByUser(user)
                .orElse(new RefreshToken());
        refreshToken.setUser(user);
        refreshToken.setExpiryDate(new Date(System.currentTimeMillis() + refreshTokenDurationMs));
        refreshToken.setToken(token);

        return refreshTokenRepository.save(refreshToken);
    }

    public boolean exist(String token) {
        return refreshTokenRepository.findByToken(token).isPresent();
    }

    public boolean isValid(String token) {
        return refreshTokenRepository.findByToken(token)
                .map(t -> t.getExpiryDate().after(new Date()))
                .orElse(false);
    }

    @Transactional
    public void deleteByToken(String token) {
        refreshTokenRepository.deleteByToken(token);
    }
}
