import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-prof',
  templateUrl: './register-prof.component.html',
  styleUrls: ['./register-prof.component.css']
})
export class RegisterProfComponent  {

  registrationForm: FormGroup;
  strength: string | undefined;
  strengthClass: string | undefined;
  matieres:any[] =[]

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private _route: Router) {

    function passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
      const password = control.get('password');
      const confirmPassword = control.get('confirmPassword');

      if (password && confirmPassword && password.value !== confirmPassword.value) {
        return { 'passwordMismatch': true };
      }

      return null;
    }

    this.registrationForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      phone: ['', [Validators.required, Validators.pattern('[0-9]{10}')]],
      confirmPassword: ['', [Validators.required]],
      birthdate: ['', [Validators.required]],
      educationLevel: ['', [Validators.required]],
      educationModule: ['', [Validators.required]],
    }, { validators: passwordMatchValidator });


  }
  ngOnInit() {
    var body = document.getElementsByTagName("body")[0];
    body.classList.add("bg-default");

    this.strength = 'weak';
    this.strengthClass = 'text-danger';

    this.matieres = ['math', 'physique', 'science', 'arabe', 'francais'];


  }
  checkStrength(password: any) {
    let strength = 0;

    if (password.value.length > 6) strength += 1;
    if (password.value.match(/[A-Z]/)) strength += 1;
    if (password.value.match(/[0-9]/)) strength += 1;
    if (password.value.match(/[^A-Za-z0-9]/)) strength += 1;

    switch (strength) {
      case 1:
        this.strength = 'weak';
        this.strengthClass = 'text-danger';
        break;
      case 2:
        this.strength = 'medium';
        this.strengthClass = 'text-warning';
        break;
      case 3:
        this.strength = 'strong';
        this.strengthClass = 'text-success';
        break;
      case 4:
        this.strength = 'very strong';
        this.strengthClass = 'text-success';
        break;
    }
  }

  onSubmit() {
    if (this.registrationForm.valid) {
      // save registration data to backend
      // this.authService.registerProf(this.registrationForm.value.firstName, this.registrationForm.value.lastName, this.registrationForm.value.email, this.registrationForm.value.password).subscribe({
      this.authService.registerProf(this.registrationForm.value).subscribe({
        next: (x: any) => {
          this._route.navigate(['emailvalidation'])
        },
        error: (err: any) => { console.log(err); }
      }
      );
    } else {
      // mark form controls as touched to display validation errors
      Object.values(this.registrationForm.controls).forEach(control => {
        control.markAsTouched();
      });
    }
  }
}



