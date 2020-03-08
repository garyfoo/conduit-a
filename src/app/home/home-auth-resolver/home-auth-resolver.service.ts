import { Injectable } from '@angular/core'
import {
  ActivatedRouteSnapshot,
  Resolve,
  Router,
  RouterStateSnapshot,
} from '@angular/router'
import { Observable } from 'rxjs'

import { UserService } from '../../core'
import { take, map, tap } from 'rxjs/operators'
import { UserState } from 'src/app/core/services/user/user.state'

@Injectable({
  providedIn: 'root',
})
export class HomeAuthResolverService {
  constructor(private router: Router, private userService: UserService) {}

  resolve(
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
