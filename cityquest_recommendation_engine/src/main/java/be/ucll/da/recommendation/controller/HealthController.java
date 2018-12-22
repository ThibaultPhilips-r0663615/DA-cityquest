package be.ucll.da.recommendation.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HealthController {

    @GetMapping("/health-check")
    public ResponseEntity<String> healthCheck() {
        String message = "Everything is alright";
        return new ResponseEntity<>(message, HttpStatus.OK);
    }

}

