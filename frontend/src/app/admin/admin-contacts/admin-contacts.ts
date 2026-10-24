/*
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin-contacts',
  imports: [RouterModule],
  templateUrl: './admin-contacts.html',
  styleUrl: './admin-contacts.css',
})
export class AdminContacts {

}
*/



import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Contact as ContactService } from '../../services/contact';
import { Contact as ContactModel } from '../../models/contact';

@Component({
  selector: 'app-admin-contacts',
  imports: [CommonModule, RouterModule],
  templateUrl: './admin-contacts.html',
  styleUrl: './admin-contacts.css',
})
export class AdminContacts implements OnInit {

  private contactService = inject(ContactService);

  contacts: ContactModel[] = [];

  loading = false;
  errorMessage = '';

  ngOnInit(): void {
    this.loadContacts();
  }

  loadContacts(): void {
    this.loading = true;
    this.errorMessage = '';

    this.contactService.getContacts().subscribe({
      next: (data: ContactModel[]) => {
        this.contacts = data;
        this.loading = false;
      },

      error: (error: unknown) => {
        console.error('Error loading contacts:', error);
        this.errorMessage = 'Unable to load contact messages.';
        this.loading = false;
      }
    });
  }

  deleteContact(id: number): void {
    if (!confirm('Are you sure you want to delete this contact message?')) {
      return;
    }

    this.contactService.deleteContact(id).subscribe({
      next: () => {
        this.contacts = this.contacts.filter(
          contact => contact.id !== id
        );
      },

      error: (error: unknown) => {
        console.error('Error deleting contact:', error);
        this.errorMessage = 'Unable to delete the contact message.';
      }
    });
  }
}

