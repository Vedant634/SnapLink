package com.url.shortener.security;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;
@Configuration
public class WebConfig {

    @Value("${frontend.url}")
    private String frontendUrl;

    @Bean
    public CorsFilter corsFilter() {
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowCredentials(true);
        config.addAllowedOrigin(frontendUrl); // or use your `@Value("${frontend.url}")`
        config.addAllowedHeader("*");
        config.addAllowedMethod("*");

        config.addExposedHeader("X-Ratelimit-Limit");
        config.addExposedHeader("X-Ratelimit-Remaining");
        config.addExposedHeader("X-Ratelimit-Reset");

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return new CorsFilter(source);
    }


}
