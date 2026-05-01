package com.example.backend.controller;

import java.security.KeyManagementException;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.util.Map;

import javax.net.ssl.KeyManager;
import javax.net.ssl.SSLContext;
import javax.net.ssl.TrustManager;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.model.user;
import com.example.backend.service.UserService;

@RestController
@CrossOrigin(origins = "http://localhost:3000", methods = {RequestMethod.POST, RequestMethod.PUT, RequestMethod.GET, RequestMethod.DELETE, RequestMethod.OPTIONS} )
public class UserController {

	@Autowired
	UserService userservice;

	@PostMapping("/register")
	public user register(@RequestBody user u) {
		return userservice.register(u);
	}
	
	@PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> loginRequest) {
        String email = loginRequest.get("email");
        String password = loginRequest.get("password");
        if (email == null || password == null) {
            return ResponseEntity.badRequest().body(Map.of("message", "email and password are required"));
        }
        boolean isAuthenticated = userservice.authenticateUser(email, password);
        if (isAuthenticated) {
            return ResponseEntity.ok(Map.of("username", userservice.getUserName(email)));
        } else {
            return ResponseEntity.status(401).body(Map.of("message", "Invalid credentials"));
        }
    }
	
	public void SSL() {
		SSLContext ctx;
		try {
		ctx = SSLContext.getInstance("TLS");

		ctx.init(new KeyManager[0], new TrustManager[] {new DefaultTrustManager()}, new SecureRandom());
		SSLContext.setDefault(ctx);
		}
		catch( KeyManagementException | NoSuchAlgorithmException e) {
			e.printStackTrace();
		}
	}
}