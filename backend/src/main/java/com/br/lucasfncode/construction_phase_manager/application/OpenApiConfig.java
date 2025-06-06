package com.br.lucasfncode.construction_phase_manager.application;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import io.swagger.v3.oas.models.OpenAPI;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.yaml.snakeyaml.Yaml;

import java.io.IOException;
import java.io.InputStream;

@Configuration
public class OpenApiConfig {

    @Value("classpath:GerenciamentoObrasAPI.yml")
    private Resource openApiResource;

    @Bean
    public OpenAPI customOpenAPI() throws IOException {
        try (InputStream is = openApiResource.getInputStream()) {
            return new Yaml().loadAs(is, OpenAPI.class);
        }
    }
}