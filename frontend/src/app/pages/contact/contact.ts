import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-contact',
  imports: [FormsModule, RouterLink],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact { 
  
  name = '';
  email = '';
  subject = '';
  message = '';

  submitForm() {
    if (!this.name || !this.email || !this.subject || !this.message) {
      alert('Please fill in all fields.');
      return;
    }

    alert('Thank you for contacting us. We will get back to you soon.');

    this.name = '';
    this.email = '';
    this.subject = '';
    this.message = '';
  }

}
