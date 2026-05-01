package com.example.backend.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.backend.model.user;
import com.example.backend.repository.UserRepository;

@Service
public class UserService {
	
	@Autowired UserRepository userrepository;

	public user register(user u) {
		return userrepository.save(u);
	}
	
	public boolean authenticateUser(String identifier, String rawPassword) {
        Optional<user> userOpt = userrepository.findByEmail(identifier);
        if (userOpt.isEmpty()) {
            userOpt = userrepository.findByEmail(identifier);
        }
        if (userOpt.isPresent()) {
            user user = userOpt.get();
            // Directly compare the provided password with the stored plain-text password
            return rawPassword.equals(user.getPassword());
        }
        return false;  // User not found or password mismatch
    }
	
	public String getUserName(String email) {
		Optional<user> userOpt = userrepository.findByEmail(email);
        user user = userOpt.get();
        return user.getUsername();
		
	}
	
}
