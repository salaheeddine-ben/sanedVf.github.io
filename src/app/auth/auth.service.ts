import { ENVIRONMENT_INITIALIZER, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, map, throwError } from 'rxjs';
import { HttpClient } from "@angular/common/http";
import { Router } from '@angular/router';
import { Etudiant } from '../models/etudiant';
import { Professeur } from '../models/professeur';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseurl = 'http://172.20.10.6:8080/api/v1';
  baseurl2 = 'http://172.20.10.6:8050/api';


  // getinfouser():  Observable<Userinfo>{
  //   return this.http.get<Userinfo>(this.baseurl + 'user/infos')
  // }

  private tokenSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);
  private roleSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);

  constructor(private http: HttpClient, private _route: Router) {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    if (token) {
      this.tokenSubject.next(token);
    }
    if (role) {
      this.roleSubject.next(role);
    }
  }

  public get tokenValue(): string | null {
    return this.tokenSubject.value;
  }
  public get roleValue(): string | null {
    return this.roleSubject.value;
  }


  Login(email: string, password: string): Observable<any> {
    return this.http.post<any>(this.baseurl + "/auth/authenticate", { email, password }).pipe(
      map((response) => {
        // stocker le token dans le local storage
        localStorage.setItem('token', response.token);
        localStorage.setItem('role', response.role);
        this.tokenSubject.next(response.token);
        this.roleSubject.next(response.role);

        if (this.isadmin()) {
          this._route.navigate(['admin'])
        }
        else if (this.isprof()) {
          this._route.navigate(['espace-professeur'])
        }
        else if (this.isstudent()) {
          this._route.navigate(['espace-etudiant'])
        }
        return response;
      }),
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }

  signOut(): void {
    localStorage.removeItem('token');
    this.tokenSubject.next(null);
    localStorage.clear();
    this._route.navigate([''])
  }

  isLoggedIn(): boolean {
    return !!this.tokenValue;
  }

  isadmin(): boolean {
    return localStorage.getItem('role') == 'ADMIN' ? true : false
  }
  isstudent() {
    return localStorage.getItem('role') == 'STUDENT' ? true : false
  }
  isprof() {
    return localStorage.getItem('role') == 'TEACHER' ? true : false
  }


  // registerStudent(firstName: any,lastName: any,email: any,password: any): Observable<any> {
  registerStudent(form: any): Observable<any> {
    return this.http.post<any>(`${this.baseurl}/auth/register/student`,
      {
        firstname: form.firstName,
        lastname: form.lastName,
        email: form.email,
        password: form.password,
        niveau: form.educationLevel,
        telephone: form.phone,
        dateNaissance: form.birthdate,
      })
  }
  // registerProf(firstName: any,lastName: any,email: any,password: any): Observable<any> {
  registerProf(form: any): Observable<any> {
    return this.http.post<any>(`${this.baseurl}/auth/register/teacher`,
      {
        firstname: form.firstName,
        lastname: form.lastName,
        email: form.email,
        password: form.password,
        niveau: form.educationLevel,
        module: form.educationModule,
        telephone: form.phone,
        dateNaissance: form.birthdate,

      })
  }

  verifyConfirmationCode(confirmationCode: string, email: String): Observable<any> {
    return this.http.get<any>(`${this.baseurl}/auth/emailValidation?token=${confirmationCode}&email=${email}`).pipe(
      map((response) => {
        this._route.navigate([''])
      }),
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }
  ResetPassword(email: string): Observable<any> {
    return this.http.get<any>(`${this.baseurl}/auth/resetPassword?email=${email}`).pipe(
      map((response) => {
        // this._route.navigate([''])

      }),
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }


  getUserInfo(): Observable<any> {
    if (this.isstudent()) {
      return this.http.get<Etudiant>(this.baseurl + '/student')
    } else if (this.isprof()) {
      return this.http.get<Professeur>(this.baseurl + '/teacher')
    }
    else {
      return this.http.get<any>(this.baseurl + '/admin')
    }
  }
  getUserInfobalance(): Observable<any> {
    return this.http.get<any>(this.baseurl2 + '/students/balance')
  }

  updateuserinfo(form: any): Observable<any> {
    console.log(form);
    return this.http.put<any>(`${this.baseurl}/student/update`,
      {
        nom: form.nom,
        prenom: form.prenom,
        email: form.email,
        niveau: form.niveau_scolaire,
        telephone: form.telephone,
        dateNaissance: form.date_naissance,
        bio: form.bio,
        codePostal: form.codePostal,
        adresse: form.adresse,
        ville: form.ville,
        etablissement: form.etablissement,

      })
  }
}
