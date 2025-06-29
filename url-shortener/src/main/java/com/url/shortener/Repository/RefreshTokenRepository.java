package com.url.shortener.Repository;

import com.url.shortener.model.RefreshToken;
import com.url.shortener.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


import java.util.Optional;

@Repository
public interface RefreshTokenRepository extends JpaRepository<RefreshToken, Long> {
    Optional<RefreshToken> findByToken(String token);
    void deleteByToken(String token);

    Optional<RefreshToken> findByUser(User user);
}