import { Injectable } from '@angular/core'
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router'
import { Observable } from 'rxjs'

import { UserService } from '../../core'
import { map, take } from 'rxjs/operators'
import { UserState } from 'src/app/core/services/user/user.state'

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private userService: UserService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.userService.state$.pipe(
      take(1),
      map((userServiceState: UserState) => {
        return userServiceState.isAuthenticated
      })
    )
  }
}
