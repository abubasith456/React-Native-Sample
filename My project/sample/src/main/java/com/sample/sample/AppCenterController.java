package com.sample.sample;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;

@Controller
@RequestMapping("/appCenter")
public class AppCenterController {

    @Autowired
    private RestTemplate restTemplate;

    @GetMapping("/createUser")
    @ResponseBody
    public ResponseEntity<String> addUser() {

        Map<String, Object> user_data = new HashMap<>();
        user_data.put("name", "Johe");
        user_data.put("email", "johndoe@gmail.com");
        user_data.put("role", "member");

        String requestBody = "name=" + "Johe" +
                "&email=" + "johndoe@gmail.com" +
                "&role=" + "member";

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.add(Constants.HEADER_API_TOKEN_KEY, Constants.HEADER_VALUE_API_TOKEN);
        HttpEntity<String> headerEntity = new HttpEntity<>(requestBody, headers);
        try {
            ResponseEntity<String> responseEntity = restTemplate.exchange(
                    "https://api.appcenter.ms/v0.1/orgs/Grootan-Technologies-Ltd-Pvt-1/users",
                    HttpMethod.POST,
                    headerEntity,
                    String.class);

            if (responseEntity.getStatusCode().is2xxSuccessful()) {
                return ResponseEntity.ok(responseEntity.getBody());
            } else {
                return ResponseEntity.status(200).body("Failed");
            }
        } catch (Exception e) {
            return ResponseEntity.status(200).body(e.getMessage());
        }

    }

    @GetMapping("appCenter/getUsers")
    @ResponseBody
    public ResponseEntity<String> getUsers() {

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.add(Constants.HEADER_API_TOKEN_KEY, Constants.HEADER_VALUE_API_TOKEN);
        HttpEntity<String> headerEntity = new HttpEntity<String>(headers);
        try {
            ResponseEntity<String> responseEntity = restTemplate.exchange(
                    "https://api.appcenter.ms/v0.1/orgs/Grootan-Technologies-Ltd-Pvt-1/users",
                    HttpMethod.GET,
                    headerEntity,
                    String.class);

            if (responseEntity.getStatusCode().is2xxSuccessful()) {
                return ResponseEntity.ok(responseEntity.getBody());
            } else {
                return ResponseEntity.status(200).body("Failed bro");
            }
        } catch (Exception e) {
            return ResponseEntity.status(200).body(e.getMessage());
        }

    }

    @GetMapping("appCenter/getTesters")
    @ResponseBody
    public ResponseEntity<String> getTesters() {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.add(Constants.HEADER_API_TOKEN_KEY, Constants.HEADER_VALUE_API_TOKEN);
        HttpEntity<String> headerEntity = new HttpEntity<String>(headers);
        try {
            ResponseEntity<String> responseEntity = restTemplate.exchange(
                    Constants.APP_CENTER_ORG_BASEURL + "/testers/",
                    HttpMethod.GET,
                    headerEntity,
                    String.class);

            if (responseEntity.getStatusCode().is2xxSuccessful()) {
                return ResponseEntity.ok(responseEntity.getBody());
            } else {
                return ResponseEntity.status(200).body("Failed bro");
            }
        } catch (Exception e) {
            return ResponseEntity.status(200).body(e.getMessage());
        }
    }



    @GetMapping("appCenter/getAllApps")
    @ResponseBody
    public ResponseEntity<String> getall() {

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.add(Constants.HEADER_API_TOKEN_KEY, Constants.HEADER_VALUE_API_TOKEN);
        HttpEntity<String> headerEntity = new HttpEntity<String>(headers);
        ResponseEntity<String> responseEntity = restTemplate.exchange(Constants.APP_CENTER_BASE_URL,
                HttpMethod.GET,
                headerEntity,
                String.class);

        if (responseEntity.getStatusCode().is2xxSuccessful()) {
            return ResponseEntity.ok(responseEntity.getBody());
        } else {
            return ResponseEntity.status(200).body("Failed bro");
        }

    }
}