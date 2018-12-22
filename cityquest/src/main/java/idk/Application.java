package idk;

import idk.database.GameRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
//import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import static idk.model.Game.GameBuilder.*;
import static idk.model.Question.QuestionBuilder.aQuestion;

@SpringBootApplication
//@EnableDiscoveryClient
public class Application {

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }

    @Bean
    public RestTemplate restTemplate() {
        return new RestTemplate();
    }

    @Configuration
    public class WebConfig implements WebMvcConfigurer {
        @Override
        public void addCorsMappings(CorsRegistry registry) {
            registry.addMapping("/**")
                    .allowedOrigins("*", "**")
                    .allowedMethods("PUT", "DELETE", "GET", "POST");
        }
    }

    @Bean
    public CommandLineRunner demo(GameRepository repository) {
        return (args) -> {
            repository.save(aDefaultGameA().build());
            repository.save(aDefaultGameB().build());
            repository.save(aDefaultGameC().build());
        };
    }
}