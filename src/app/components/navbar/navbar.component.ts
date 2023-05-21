import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { AuthService } from 'src/app/auth/auth.service';
import { Etudiant } from 'src/app/models/etudiant';
import { Professeur } from 'src/app/models/professeur';
import { User } from 'src/app/models/user';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  public focus: any;
  public listTitles: any
  public location: Location;
  userinfo: User = {
    id: "",
    nom: "",
    prenom: "",
    email: "",
    adresse: "",
    ville: "",
    date_naissance: new Date(),
    etablissement: "",
    imageUrl: "",
    niveau_scolaire: "",
    telephone: "",
    module: "",
    codePostal: "",
    bio: "",
    balance:0
  }

  constructor(location: Location, private authService: AuthService) {
    this.location = location;

  }


  ngOnInit() {
    this.authService.getUserInfo().subscribe(data => {
      this.userinfo = data;
      // this.userinfo.imageUrl=="" ? this.userinfo.imageUrl = `https://ui-avatars.com/api/?name=${this.userinfo.nom}+${this.userinfo.prenom}&background=random` : this.userinfo.imageUrl= this.userinfo.imageUrl

    });
  }

  logout() {
    this.authService.signOut();
  }

}
