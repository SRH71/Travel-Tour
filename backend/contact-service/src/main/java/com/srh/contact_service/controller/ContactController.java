package com.srh.contact_service.controller;



import com.srh.contact_service.dto.ContactRequest;
import com.srh.contact_service.service.ContactService;

import jakarta.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/contact")
public class ContactController {

    private final ContactService contactService;

    public ContactController(ContactService contactService) {
        this.contactService = contactService;
    }

    // ===============================
    // Create Contact Message
    // ===============================

    @PostMapping
    public ResponseEntity<?> createContact(
            @Valid @RequestBody ContactRequest request) {

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(contactService.createContact(request));
    }

    // ===============================
    // Get All Contact Messages
    // ===============================

    @GetMapping
    public ResponseEntity<?> getAllContacts() {

        return ResponseEntity.ok(
                contactService.getAllContacts()
        );
    }

    // ===============================
    // Get Contact By ID
    // ===============================

    @GetMapping("/{id}")
    public ResponseEntity<?> getContactById(@PathVariable Long id) {

        return ResponseEntity.ok(
                contactService.getContactById(id)
        );
    }

    // ===============================
    // Delete Contact
    // ===============================

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteContact(@PathVariable Long id) {

        contactService.deleteContact(id);

        return ResponseEntity.noContent().build();
    }
}