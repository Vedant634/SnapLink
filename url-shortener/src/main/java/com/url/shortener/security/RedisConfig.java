package com.url.shortener.security;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.connection.RedisStandaloneConfiguration;
import org.springframework.data.redis.connection.lettuce.LettuceClientConfiguration;
import org.springframework.data.redis.connection.lettuce.LettuceConnectionFactory;
import org.springframework.data.redis.core.StringRedisTemplate;

import io.lettuce.core.ClientOptions;
import io.lettuce.core.SslOptions;

import java.time.Duration;

@Configuration
public class RedisConfig {

    @Value("${spring.redis.host}")
    private String redisHost;

    @Value("${spring.redis.port}")
    private int redisPort;

    @Value("${spring.redis.password}")
    private String redisPassword;

    @Value("${spring.redis.ssl.enabled:true}")
    private boolean sslEnabled;

    @Bean
    public LettuceConnectionFactory redisConnectionFactory() {
        // Configure Redis connection
        RedisStandaloneConfiguration config = new RedisStandaloneConfiguration();
        config.setHostName(redisHost);
        config.setPort(redisPort);
        config.setPassword(redisPassword);

        // Configure Lettuce client with SSL support for Upstash
        LettuceClientConfiguration.LettuceClientConfigurationBuilder clientConfig =
                LettuceClientConfiguration.builder()
                        .commandTimeout(Duration.ofSeconds(10));

        if (sslEnabled) {
            // SSL options for Upstash Redis
            SslOptions sslOptions = SslOptions.builder().build();
            ClientOptions clientOptions = ClientOptions.builder()
                    .sslOptions(sslOptions)
                    .build();

            clientConfig.clientOptions(clientOptions);
            clientConfig.useSsl();
        }

        LettuceConnectionFactory factory = new LettuceConnectionFactory(config, clientConfig.build());
        factory.afterPropertiesSet();

        return factory;
    }

    @Bean
    public StringRedisTemplate redisTemplate(LettuceConnectionFactory connectionFactory) {
        return new StringRedisTemplate(connectionFactory);
    }
}
