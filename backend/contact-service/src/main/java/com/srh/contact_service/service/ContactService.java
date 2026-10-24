package com.srh.contact_service.service;



import com.srh.contact_service.dto.ContactRequest;
import com.srh.contact_service.entity.Contact;
import com.srh.contact_service.repository.ContactRepository;

import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ContactService {

    private final ContactRepository contactRepository;

    public ContactService(ContactRepository contactRepository) {
        this.contactRepository = contactRepository;
    }

    // ===============================
    // Create Contact
    // ===============================

    public Contact createContact(ContactRequest request) {

        Contact contact = new Contact();

        contact.setName(request.getName());
        contact.setEmail(request.getEmail());
        contact.setSubject(request.getSubject());
        contact.setMessage(request.getMessage());
        contact.setCreatedAt(LocalDateTime.now());

        return contactRepository.save(contact);
    }

    // ===============================
    // Get All Contacts
    // ===============================

    public List<Contact> getAllContacts() {

        return contactRepository.findAll();
    }

    // ===============================
    // Get Contact By ID
    // ===============================

    public Contact getContactById(Long id) {

        return contactRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Contact not found with id: " + id)
                );
    }

    // ===============================
    // Delete Contact
    // ===============================

    public void deleteContact(Long id) {

        Contact contact = getContactById(id);

        contactRepository.delete(contact);
    }
}