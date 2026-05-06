package com.example.backend.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloWorld {

	@GetMapping("/hello")
	public String sayHello() {
		System.out.println("CI/CD magic");
		return "Hello World";
	}
	
}
