package com.example.backend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.backend.model.user;

public interface UserRepository extends JpaRepository<user,Integer> {

	Optional<user> findByEmail(String email);

}
