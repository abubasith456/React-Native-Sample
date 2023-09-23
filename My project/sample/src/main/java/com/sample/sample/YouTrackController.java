package com.sample.sample;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.client.RestTemplate;

@Controller
@RequestMapping("/youTrack")
public class YouTrackController {
    @Autowired
    private RestTemplate restTemplate;

    @GetMapping("/createAccount")
    @ResponseBody
    public ResponseEntity<String> getall() {

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.add(Constants.AUTH_KEY, Constants.BARRIER_VALUE);

        // As of now i give this info as static
        String requestBody = "{\"login\": \"test.user123\",\"password\": \"TestUser123\",\"fullName\": \"Test User\",\"email\": \"newuser123@gmail.com\",\"groups\": [\"Registered Users\"]}";

        try {
            HttpEntity<String> headerEntity = new HttpEntity<String>(requestBody, headers);
            ResponseEntity<String> responseEntity = restTemplate.exchange(Constants.APP_CENTER_BASE_URL,
                    HttpMethod.POST,
                    headerEntity,
                    String.class);

            if (responseEntity.getStatusCode().is2xxSuccessful()) {
                return ResponseEntity.ok(responseEntity.getBody());
            } else {
                return ResponseEntity.status(responseEntity.getStatusCode()).body(responseEntity.getBody());
            }
        } catch (Exception e) {
            return ResponseEntity.status(500).body(e.getMessage());
        }

    }

}
