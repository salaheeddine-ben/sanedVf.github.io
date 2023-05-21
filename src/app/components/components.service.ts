import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})



export class ComponentsService {

  constructor() {
  }
  
  menuItems = {
    admin: [
      { path: '/', title: 'Dashboard',  icon: 'ni-tv-2 text-primary', class: '' },
      { path: 'icons', title: 'Icons',  icon:'ni-planet text-blue', class: '' },
      { path: 'user-profile', title: 'User profile',  icon:'ni-single-02 text-yellow', class: '' },
      { path: 'tables', title: 'Tables',  icon:'ni-bullet-list-67 text-red', class: '' },
      { path: '/login', title: 'Login',  icon:'ni-key-25 text-info', class: '' },
      { path: '/register', title: 'Register',  icon:'ni-circle-08 text-pink', class: '' }
    ],
    espace_etudiant: [
      { path: 'dashboard', title: 'Dashboard',  icon: 'ni-tv-2 text-primary', class: '' },
      { path: 'timetable', title: 'Timetable',  icon: 'ni-bullet-list-67 text-red', class: '' },
      { path: 'profile',title: 'Profile', icon: 'fa fa-user text-yellow', class: '' },
      { path: 'cours',title: 'Mes cours', icon: 'ni-books text-red' , class: ''},
      { path: 'cour_details',title: 'Cour details', icon: 'ni-book-bookmark text-primary' , class: ''},
      { path: 'messages',title: 'Messages', icon: 'ni-chat-round text-info' , class: ''},
      // ...
    ],
    espace_professeur: [
      { path: 'dashboard', title: 'Dashboard',  icon: 'ni-tv-2 text-primary', class: '' },
      { path: 'timetable', title: 'Timetable',  icon: 'ni-bullet-list-67 text-red', class: '' },
      { path: 'groups',title: 'Mes groupes', icon: 'fa-solid fa-user-group text-info' , class: ''},
      { path: 'demandes',title: 'Mes demandes', icon: 'fa-solid fa-clipboard-list text-primary' , class: ''},
      { path: 'cours',title: 'Mes cours', icon: 'ni-books text-red' , class: ''},
      { path: 'newcourse',title: 'Nouveau Cour', icon: 'ni-book-bookmark text-primary' , class: ''},
      { path: 'profile',title: 'Profile', icon: 'fa fa-user text-yellow', class: '' },
      { path: 'messages',title: 'Messages', icon: 'ni-chat-round text-info' , class: ''},
      // ...
    ]
  };

  getMenuForRole(link:any) {
    if (link === 'admin') {
      return this.menuItems.admin; 
    } else if (link === 'STUDENT') {
      return this.menuItems.espace_etudiant;
    } else if (link === 'TEACHER') {
      return this.menuItems.espace_professeur;
    }else return null
  }
  
}
