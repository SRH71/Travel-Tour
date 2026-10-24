
import { Routes } from '@angular/router';

import { Home } from './pages/home/home';
import { About } from './pages/about/about';
import { Contact } from './pages/contact/contact';
import { Tours } from './components/tours/tours';
import { TourDetails } from './components/tour-details/tour-details';
import { Login } from './components/login/login';
import { Register } from './components/register/register';
import { AdminDashboard } from './pages/admin-dashboard/admin-dashboard';
import { AdminTours } from './pages/admin-tours/admin-tours';
import { AdminTourCreate } from './pages/admin-tour-create/admin-tour-create';
import { AdminTourEdit } from './pages/admin-tour-edit/admin-tour-edit';
import { AdminContacts } from './admin/admin-contacts/admin-contacts';
//import { Booking } from './services/booking';
import { Booking } from './components/booking/booking';
import { MyBookings } from './components/my-bookings/my-bookings';
import { AdminBookings } from './pages/admin-bookings/admin-bookings';


export const routes: Routes = [

  { path: '', component: Home },

  { path: 'about', component: About },

  { path: 'contact', component: Contact },

  { path: 'tours', component: Tours },
  { path: 'tours/:id', component: TourDetails },

  { path: 'register', component: Register },
  { path: 'login', component: Login },

  { path: 'booking/:id', component: Booking },
 


  { path: 'admin', component: AdminDashboard },
  { path: 'admin/dashboard', component: AdminDashboard},
  { path: 'admin/tours', component: AdminTours},
  { path: 'admin/tours/create', component: AdminTourCreate},
  { path: 'admin/tours/edit/:id',  component: AdminTourEdit},

  { path: 'my-bookings', component: MyBookings },


  { path: 'admin/bookings', component: AdminBookings },




  { path: 'admin/contacts', component: AdminContacts}


  

 // { path: 'admin/contact',  component: AdminContact}


];
