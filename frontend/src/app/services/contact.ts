
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Contact as ContactModel } from '../models/contact';

@Injectable({
  providedIn: 'root',
})
export class Contact {

  private http = inject(HttpClient);

  private apiUrl = 'http://localhost:8080/api/contact';

  getContacts(): Observable<ContactModel[]> {
    return this.http.get<ContactModel[]>(this.apiUrl);
  }

  getContactById(id: number): Observable<ContactModel> {
    return this.http.get<ContactModel>(`${this.apiUrl}/${id}`);
  }

  deleteContact(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
