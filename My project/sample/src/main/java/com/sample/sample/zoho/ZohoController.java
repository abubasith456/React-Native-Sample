package com.sample.sample.zoho;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.client.RestTemplate;
import com.sample.sample.Constants;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;

@Controller
@RequestMapping("/zoho")
public class ZohoController {

    @Autowired
    private RestTemplate restTemplate;

    @GetMapping("zoho/getAuthCode")
    public ResponseEntity<String> getAuth() {
        String scope = "ZOHOPEOPLE.forms.ALL";
        String redirectUri = "http://www.grootan.com";
        String prompt = "consent";
        String authorization = "https://accounts.zoho.com/oauth/v2/auth" +
                "?response_type=code" +
                "&client_id=" + Constants.ZOHO_CLIENT_ID + // Replace with your client_id
                "&scope=" + scope +
                "&redirect_uri=" + redirectUri +
                "&prompt=" + prompt;

        ResponseEntity<String> responseEntity = restTemplate.exchange(authorization,
                HttpMethod.GET, null, String.class);
        return responseEntity;
    }

    @GetMapping("zoho/getAuthToken")
    public ResponseEntity<String> callback(@RequestParam("code") String authorizationCode) {
        // Define the Zoho OAuth 2.0 token endpoint URL
        String tokenUrl = "https://accounts.zoho.com/oauth/v2/token";

        // Define the request body parameters
        String redirectUri = "https://www.grootan.com"; // Replace with your redirect_uri
        String grantType = "authorization_code";

        // Create the request body as a URL-encoded string
        String requestBody = "client_id=" + Constants.ZOHO_CLIENT_ID +
                "&client_secret=" + Constants.ZOHO_SECRET +
                "&redirect_uri=" + redirectUri +
                "&grant_type=" + grantType +
                "&code=" + authorizationCode;

        // Set the Content-Type header
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        // Create the HTTP entity with the request body and headers
        HttpEntity<String> requestEntity = new HttpEntity<>(requestBody, headers);

        // Make a POST request to the token endpoint
        ResponseEntity<String> responseEntity = restTemplate.postForEntity(tokenUrl, requestEntity, String.class);

        return responseEntity;
    }

    @PostMapping("/createUser")
    public void createUser(@RequestBody String requestBody) {

    }

    @GetMapping("zoho/getEmployees")
    @ResponseBody
    public ResponseEntity<String> getUsers(@RequestParam("token") String requestBody) {

        HttpHeaders headers = new HttpHeaders();
        headers.add(Constants.ZOHO_AUTHORIZATION_HEADER_KEY, Constants.ZOHO_AUTHORIZATION_HEADER_VALUE + requestBody);

        HttpEntity<String> headerEntity = new HttpEntity<>(headers);
        try {
            ResponseEntity<String> responseEntity = restTemplate.exchange(
                    Constants.ZOHO_BASE_URL + "employee/getRecords?sIndex=1&limit=100",
                    HttpMethod.GET,
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

}
