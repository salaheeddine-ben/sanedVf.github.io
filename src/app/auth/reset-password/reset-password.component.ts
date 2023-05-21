import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {

  resetForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
  ) {
    this.resetForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });

  }

  ngOnInit() {
    var body = document.getElementsByTagName("body")[0];
    body.classList.add("bg-default");
  }

  onConfirm() {
    const email = this.resetForm.value.email;

    if (this.resetForm.valid) {
      // send confirmation code to backend for verification
      this.authService.ResetPassword(email).subscribe(
        {
          next: (x: any) => {
            console.log('Email envoyé!',x);
          },
          error: (err: any) => {
            console.log(err);
          }
        });
    } else {
      // mark form controls as touched to display validation errors
      Object.values(this.resetForm.controls).forEach(control => {
        control.markAsTouched();
      });
    }
  }


}
