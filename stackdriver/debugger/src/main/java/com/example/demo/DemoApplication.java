package com.example.demo;

import org.springframework.web.client.RestTemplate;
import org.springframework.context.annotation.Bean;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class DemoApplication {

        @Bean
        public RestTemplate restTemplate() {
                return new RestTemplate();
        }

        public static void main(String[] args) {
                SpringApplication.run(DemoApplication.class, args);
        }
}

