package com.example.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.model.notes;
import com.example.backend.repository.NotesRepository;
import com.example.backend.service.NotesService;

@RestController
@CrossOrigin(origins="http://localhost:3000", methods= {RequestMethod.POST,RequestMethod.GET,RequestMethod.PUT, RequestMethod.DELETE, RequestMethod.OPTIONS})
public class NotesController {

	@Autowired
	NotesService noteservice;
	
	@GetMapping("/test")
	public String testNotes() {
		return "This is to get notes";
	}
	
	@GetMapping("/notes")
	public List<notes> getNotes() {
		return noteservice.getAll();
	}
	
	@GetMapping("/getByTitle/{title}")
	public notes getByTitle(@PathVariable("title") String title) {
		return noteservice.getByTitle(title);
	}
	
	@PostMapping("/AddNotes")
	public notes AddNotes(@RequestBody notes n) {
		return noteservice.save(n);
	}

	@PutMapping("/UpdateNotes")
	public notes UpdateNotes(@RequestBody notes n) {
		return noteservice.save(n);
	}
	
	@DeleteMapping("/DeleteNotes/{id}")
	public void DeleteNotes(@PathVariable("id") int id) {
		noteservice.deleteById(id);
	}
}
