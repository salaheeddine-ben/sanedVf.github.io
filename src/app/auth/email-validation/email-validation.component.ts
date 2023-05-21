import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-email-validation',
  templateUrl: './email-validation.component.html',
  styleUrls: ['./email-validation.component.css']
})
export class EmailValidationComponent {

  confirmationForm: FormGroup;

  digit1: FormControl;
  digit2: FormControl;
  digit3: FormControl;
  digit4: FormControl;
  digit5: FormControl;
  emailparam: string ="";
  incorrectcode:Boolean=false

  constructor( private activeroute: ActivatedRoute ,private formBuilder: FormBuilder, private authService: AuthService,private _route: Router) {

    this.confirmationForm = formBuilder.group({
      digit1: ['', Validators.required],
      digit2: ['', Validators.required],
      digit3: ['', Validators.required],
      digit4: ['', Validators.required],
      digit5: ['', Validators.required]
    });

    this.digit1 = this.confirmationForm.get('digit1') as FormControl;
    this.digit2 = this.confirmationForm.get('digit2') as FormControl;
    this.digit3 = this.confirmationForm.get('digit3') as FormControl;
    this.digit4 = this.confirmationForm.get('digit4') as FormControl;
    this.digit5 = this.confirmationForm.get('digit5') as FormControl;

  }

  ngOnInit() {
    var body = document.getElementsByTagName("body")[0];
    body.classList.add("bg-default");

    this.activeroute.queryParams.subscribe(params => {
      this.emailparam = params['email'];
    });
  }

  onConfirm() {
    const code = this.digit1.value + this.digit2.value + this.digit3.value +
                 this.digit4.value + this.digit5.value; 
    
    if (this.confirmationForm.valid) {
      // send confirmation code to backend for verification
      this.authService.verifyConfirmationCode(code,this.emailparam).subscribe(
        {
          next: (x: any) => {
            console.log('Confirmation successful!',x);
            this._route.navigate(['login'])
          },
          error: (err: any) => {
            console.log(err);
            this.incorrectcode=true
          }
        });
    } else {
      // mark form controls as touched to display validation errors
      Object.values(this.confirmationForm.controls).forEach(control => {
        control.markAsTouched();
      });
    }
  }


  moveFocus(event:any, nextId:any) {
    event.target.blur();
    document.getElementById(nextId)?.focus();
    }

}
