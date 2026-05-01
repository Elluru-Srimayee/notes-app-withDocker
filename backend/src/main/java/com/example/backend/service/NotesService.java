package com.example.backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.backend.model.notes;
import com.example.backend.repository.NotesRepository;

@Service
public class NotesService {

	@Autowired 
	NotesRepository notesrepository;
	public List<notes> getAll(){
		return notesrepository.findAll();
	}
	
	public notes save(notes n) {
		return notesrepository.save(n);
	}
	
	public void deleteById(int id) {
		notesrepository.deleteById(id);
	}
	
	public notes getByTitle(String title) {
		return notesrepository.findByTitle(title);
	}
}
