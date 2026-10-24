package com.srh.contact_service.repository;





import com.srh.contact_service.entity.Contact;
import org.springframework.data.jpa.repository.JpaRepository;
// import org.springframework.stereotype.Repository;

// @Repository
public interface ContactRepository extends JpaRepository<Contact, Long> {
}