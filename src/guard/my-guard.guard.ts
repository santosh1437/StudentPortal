import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MyGuardGuard implements CanActivate {

  router = inject(Router);

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      // return true;

      const localData = localStorage.getItem('currentUser');
      if(localData != null){
        return true;
      }else{
        this.router.navigateByUrl('/');
        return false;
      }
    
  }
  
}
