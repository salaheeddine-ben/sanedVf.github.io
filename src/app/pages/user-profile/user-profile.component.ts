import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/app/models/user';
import { NgForm } from "@angular/forms"
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ShepherdService } from 'angular-shepherd';




@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements AfterViewInit {



  @ViewChild('addPayement') addPayementpopup: TemplateRef<any> | undefined;

  addPayementForm: FormGroup;

  userinfo: User = {
    id: "",
    nom: "",
    prenom: "",
    email: "",
    adresse: "",
    ville: "",
    date_naissance: new Date("02/05/2001"),
    etablissement: "",
    imageUrl: "",
    niveau_scolaire: "",
    telephone: "",
    module: "",
    codePostal: "",
    bio: "",
    balance: 0
  }
  userForm: FormGroup;

  constructor(private shepherdService: ShepherdService, private authservice: AuthService, private modalService: NgbModal, private fb: FormBuilder, private cd: ChangeDetectorRef,) {

    this.authservice.getUserInfo().subscribe(data => {
      this.userinfo = data as User
      console.log(this.userinfo);
    });
    this.authservice.getUserInfobalance().subscribe((data: any) => {
      this.userinfo.balance = data.balance.$numberDecimal

      console.log(this.userinfo);
    });

    this.userForm = this.fb.group({
      email: ['',],
      nom: ['',],
      prenom: ['',],
      telephone: ['',],
      date_naissance: ['',],
      niveau_scolaire: ['',],
      adresse: ['',],
      ville: ['',],
      codePostal: ['',],
      bio: ['',],
      etablissement: ['',],
    });

    this.addPayementForm = new FormGroup({
      nom: new FormControl('', Validators.required),
      numero: new FormControl('', Validators.required),
      dateexp: new FormControl('', Validators.required),
      cvc: new FormControl('', Validators.required),
    });
  }

  ngOnInit() {

  }
  // Définir la fonction pour ouvrir le popup
  

  ngAfterViewInit() {
    this.shepherdService.defaultStepOptions = {
      cancelIcon: {
        enabled: true
      },
      classes: 'class-1 class-2',
      scrollTo: { behavior: 'smooth', block: 'center' }
    };
    this.shepherdService.modal = true;
    this.shepherdService.confirmCancel = false;
    this.shepherdService.addSteps([
      {
        title: 'Profile header',
        text: `This is the profile header section which displays basic info about the user.`,
        attachTo: {
          element: '.container-fluid.d-flex.align-items-center.mt-5',
          on: 'bottom'
        },
        buttons: [
          {
            action() {
              return this.back();
            },
            classes: 'shepherd-button-secondary',
            text: 'Back'
          },
          {
            action() {
              return this.next();
            },
            text: 'Next'
          }
        ],
        id: 'header'
      },
      {
        title: 'Left sidebar',
        text: `This is the left sidebar section which contains user info, account balance, etc.`,
        attachTo: {
          element: '.card.card-profile.shadow',
          on: 'right'
        },
        buttons: [
          {
            action() {
              return this.back();
            },
            classes: 'shepherd-button-secondary',
            text: 'Back'
          },
          {
            action() {
              return this.next();
            },
            text: 'Next'
          }
        ],
        id: 'left-sidebar'
      },
      {
        title: 'Recharge Account Button',
        text: `Click this button to recharge your account balance.`,
        attachTo: {
          element: '.btn.btn-primary.mt-3', // Bouton Recharger
          on: 'bottom'
        },
        buttons: [],
        id: 'recharge-button'
      },
      {
        title: 'Payment Form',
        text: `This is the payment form to recharge your account. Enter payment info and amount.`,
        attachTo: { 
          element: '.page.payment-page', // ng-template de paiement
          on: 'bottom'
        },
        buttons: [],
        id: 'payment-form'
      },
      {
        title: 'Right content',
        text: `This is the main content section which contains forms to edit user profile info.`,
        attachTo: {
          element: '.col-xl-8.order-xl-1',
          on: 'left'
        },
        buttons: [
          {
            action() {
              return this.back();
            },
            classes: 'shepherd-button-secondary',
            text: 'Back'
          },
          {
            action() {
              return this.next();
            },
            text: 'Next'
          }
        ],
        id: 'right-content'
      }
    ]);
    this.shepherdService.start();
  }






  openaddPayement() {
    this.modalService.open(this.addPayementpopup, { size: 'lg' });
    this.shepherdService.next(); // Passer à l'étape suivante
  
  }
  // Définir la fonction pour fermer le popup
  closeaddPayement() {
    this.modalService.dismissAll();
    this.shepherdService.back(); // Revenir à l'étape précédente

  }

  addPayementfunction() {
    console.log("payement reussie");
  }

  calculateAge(dateOfBirth: Date): number {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

  onSubmit() {

    if (this.userForm.valid) {
      // save registration data to backend
      // this.authService.registerStudent(this.registrationForm.value.firstName, this.registrationForm.value.lastName, this.registrationForm.value.email, this.registrationForm.value.password).subscribe({
      this.authservice.updateuserinfo(this.userForm.value).subscribe({
        next: (x: any) => {
          console.log("modification reussi !");
        },
        error: (err: any) => { console.log(err); }
      }
      );
    } else {
      // mark form controls as touched to display validation errors
      Object.values(this.userForm.controls).forEach(control => {
        control.markAsTouched();
      });
    }
  }

  
}

