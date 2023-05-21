import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {
  constructor(private router: Router, private authService: AuthService) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    // Vérifier si l'utilisateur est connecté
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login'], { queryParams: { message: 'Vous devez d\'abord vous connecter.' } });
      return false;
    }
    // Vérifier le rôle de l'utilisateur
    else {

      if (this.authService.isstudent() && state.url !== '/espace-etudiant') {
        this.router.navigate(['/espace-etudiant']);
        return false;
      } else if (this.authService.isprof() && state.url !== '/espace-professeur') {
        this.router.navigate(['/espace-professeur']);
        return false;
      } else if (!this.authService.isadmin() && state.url == '/admin') {
        this.router.navigate(['/login']);
        return false;
      }
      return true;
    }
  }

}
