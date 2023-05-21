import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  
  loginForm: FormGroup;
  errorMessage: string | undefined;


  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private activeroute: ActivatedRoute
    ) { 
      this.loginForm = this.formBuilder.group({
          email: ['', [Validators.required, Validators.email]],
          password: ['', [Validators.required, Validators.minLength(6)]]
        });
    
    }

   
    ngOnInit() {
      
      var body = document.getElementsByTagName("body")[0];
      body.classList.add("bg-default");

      this.activeroute.queryParams.subscribe(params => {
        this.errorMessage = params['message'];
      });

      this.loginForm = this.formBuilder.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(4)]]
      });
    }
    
    errors = [];
    onSubmit(): void {
    if (this.loginForm.valid) {
    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;
    
    const loginObserver = {
      next: (x: any) => {
        console.log('user logged in : ',email,password)
      },
      error: (err: any) => this.errors = err.error
    };

    this.authService.Login(email, password).subscribe(loginObserver)    
    }
    }
    
    signInWithGoogle(): void {
    // this.authService.signInWithGoogle()
    console.log('connexion avec google')
    }
    
    ngOnDestroy() {
      var body = document.getElementsByTagName("body")[0];
      body.classList.remove("bg-default");
    }
    

}
