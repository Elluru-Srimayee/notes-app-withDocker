package com.example.backend.controller;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.util.Arrays;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
// import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import com.example.backend.model.notes;
import com.example.backend.service.NotesService;
import com.fasterxml.jackson.databind.ObjectMapper;

@WebMvcTest(NotesController.class)
public class NotesControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private NotesService noteService;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    public void testGetNotes() throws Exception {
        notes note1 = new notes();
        note1.setId(1);
        note1.setTitle("Test Note");
        
        List<notes> notesList = Arrays.asList(note1);
        
        when(noteService.getAll()).thenReturn(notesList);

        mockMvc.perform(get("/notes"))
                .andExpect(status().isOk());
    }

    @Test
    public void testAddNotes() throws Exception {
        notes note = new notes();
        note.setTitle("New Note");
        
        when(noteService.save(note)).thenReturn(note);

        mockMvc.perform(post("/AddNotes")
                .contentType("application/json")
                .content(objectMapper.writeValueAsString(note)))
                .andExpect(status().isOk());
    }
}