package com.sample.sample.gitlab;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.client.RestTemplate;

import com.sample.sample.Constants;

@Controller
@RequestMapping("/gitLab")
public class GitLabController {

    @Autowired
    private RestTemplate restTemplate;

    @GetMapping("/createUser")
    @ResponseBody
    public ResponseEntity<String> addUser() {

        String gitlabApiUrl = Constants.GITLAB_BASE_URL + "users";
        HttpHeaders headers = new HttpHeaders();
        headers.set(Constants.GITLAB_HEADER_TOKEN_KEY, Constants.GITLAB_HEADER_TOKEN_VALUE);

        // Create a request entity with the request headers and data
        MultiValueMap<String, String> requestBody = new LinkedMultiValueMap<>();
        requestBody.add("email", "hackathon@gmail.com");
        requestBody.add("name", "Hackathon");
        requestBody.add("username", "hackathon23");
        requestBody.add("password", "p@ssw0rd");

        HttpEntity<MultiValueMap<String, String>> requestEntity = new HttpEntity<>(requestBody, headers);

        // Send the POST request
        try {
            ResponseEntity<String> responseEntity = restTemplate.exchange(
                    gitlabApiUrl,
                    HttpMethod.POST,
                    requestEntity,
                    String.class);

            if (responseEntity.getStatusCode().is2xxSuccessful()) {
                return ResponseEntity.ok(responseEntity.getBody());
            } else {
                return ResponseEntity.status(400).body("Failed");
            }
        } catch (Exception e) {
            return ResponseEntity.status(500).body(e.getMessage());
        }
    }

}
