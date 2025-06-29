package com.url.shortener.service;

import com.url.shortener.Repository.RefreshTokenRepository;
import com.url.shortener.Repository.UserRepository;
import com.url.shortener.dto.LoginRequest;
import com.url.shortener.exception.EmailAlreadyExistsException;
import com.url.shortener.exception.UsernameAlreadyExistsException;
import com.url.shortener.model.RefreshToken;
import com.url.shortener.model.User;
import com.url.shortener.security.jwt.JwtAuthenticationResponse;
import com.url.shortener.security.jwt.JwtUtils;
import lombok.AllArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class UserService {
    private PasswordEncoder passwordEncoder;
    private UserRepository userRepository;
    private AuthenticationManager authenticationManager;
    private JwtUtils jwtUtils;
    private RefreshTokenService refreshTokenService;

    public User registerUser (User user){
//        if (userRepository.existsByUsername(user.getUsername())) {
//            throw new UsernameAlreadyExistsException("Username is already taken.");
//        }

        if (userRepository.existsByEmail(user.getEmail())) {
            throw new EmailAlreadyExistsException("Email is already in use.");
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    public JwtAuthenticationResponse authenticateUser (LoginRequest loginRequest){

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getUsername(),loginRequest.getPassword())
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        String accessToken = jwtUtils.generateAccessToken(userDetails);

        String refreshToken = jwtUtils.generateRefreshToken(userDetails);
        refreshTokenService.createRefreshToken(loginRequest.getUsername(),refreshToken);
        return new JwtAuthenticationResponse(accessToken,refreshToken);
    }

    public User findByUsername(String name) {
        return userRepository.findByUsername(name).orElseThrow(
                ()-> new UsernameNotFoundException("User not found with username: "+ name  )
        );
    }

    public JwtAuthenticationResponse tokenGenerate(String requestToken) {
        if (refreshTokenService.exist(requestToken)) {
            if (refreshTokenService.isValid(requestToken)) {
                String name = jwtUtils.getUserNameFromToken(requestToken);

                User user = findByUsername(name);
                UserDetailsImpl userDetails = UserDetailsImpl.build(user);

                String accessToken = jwtUtils.generateAccessToken(userDetails);

                return new JwtAuthenticationResponse(accessToken, requestToken);
            } else {
                throw new RuntimeException("Refresh token has expired");
            }
        } else {
            throw new RuntimeException("Invalid refresh token");
        }
    }


    public void deleteByToken(String refreshToken) {
        refreshTokenService.deleteByToken(refreshToken);
    }
};
