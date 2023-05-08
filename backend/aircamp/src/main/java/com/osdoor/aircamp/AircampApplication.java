package com.osdoor.aircamp;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJㄷpaAuditing
public class AircampApplication {

	public static void main(String[] args) {
		SpringApplication.run(AircampApplication.class, args);
	}

}
