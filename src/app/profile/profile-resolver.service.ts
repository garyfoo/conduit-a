import { Injectable } from '@angular/core'
import {
  ActivatedRouteSnapshot,
  Resolve,
  Router,
  RouterStateSnapshot,
} from '@angular/router'
import { Observable } from 'rxjs'

import { catchError } from 'rxjs/operators'
import { ProfilesService } from './shared/services/profiles/profiles.service'
@Injectable({
  providedIn: 'root',
})
export class ProfileResolverService {
  constructor(
    private profilesService: ProfilesService,
    private router: Router
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    return this.profilesService
      .get(route.params.username)
      .pipe(catchError(err => this.router.navigateByUrl('/')))
  }
}
