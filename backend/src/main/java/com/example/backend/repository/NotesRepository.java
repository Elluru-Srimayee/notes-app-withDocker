package com.example.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.backend.model.notes;

public interface NotesRepository extends JpaRepository<notes,Integer>{

	notes findByTitle(String title);

}
