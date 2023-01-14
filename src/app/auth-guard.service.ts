import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, 
  RouterStateSnapshot, UrlTree, Router } 
  from '@angular/router';

import { CanLoad, Route, UrlSegment } from '@angular/router';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot, 
    state: RouterStateSnapshot): boolean | UrlTree {
    console.log('CanActivateGuard [canActivate] called');
    const url = 'signin';
    const tree: UrlTree = this.router.parseUrl(url);

    return tree;
    // return true;
    // return false;
  }

  //used for DecorativePreloadingStrategy page moudles only,nosuch module yet
  canLoad(
    route: Route, 
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    // return true;
    return false;
  }
}
