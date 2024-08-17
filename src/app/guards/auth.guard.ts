import { CanActivate, GuardResult, MaybeAsync } from '@angular/router';
import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { FirebaseService } from '../services/firebase.service';
import { UtilsService } from '../services/utils.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  firebaseSvc = inject(FirebaseService);
  utilsSvc = inject(UtilsService);

  canActivate(
    route: ActivatedRouteSnapshot, 
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    return new Promise((resolve) => {
      this.firebaseSvc.getAuth().onAuthStateChanged((auth) => {
        if (auth) {
          resolve(true); // User is authenticated
        } else {
          this.utilsSvc.routerLink('/auth'); // Redirect to auth page
          resolve(false); // User is not authenticated
        }
      });
    });
  }
}