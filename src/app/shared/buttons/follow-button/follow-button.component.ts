import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core'
import { Router } from '@angular/router'

import { concatMap, tap } from 'rxjs/operators'
import { of, Subscription } from 'rxjs'
import { Profile } from 'src/app/profile/shared/models/profile.model'
import { ProfilesService } from 'src/app/profile/shared/services/profiles/profiles.service'
import { UserService } from 'src/app/core'

@Component({
  selector: 'app-follow-button',
  templateUrl: './follow-button.component.html',
  styleUrls: ['./follow-button.component.scss'],
})
export class FollowButtonComponent implements OnInit {
  @Input() profile: Profile
  @Output() toggle = new EventEmitter<boolean>()
  isSubmitting = false

  constructor(
    private profilesService: ProfilesService,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {}

  toggleFollowing() {
    this.isSubmitting = true
    // TODO: remove nested subscribes, use mergeMap

    this.userService.state$
      .pipe(
        concatMap(state => {
          // Not authenticated? Push to login screen
          if (!state.isAuthenticated) {
            this.router.navigateByUrl('/login')
            return of(null)
          }

          // Follow this profile if we aren't already
          if (!this.profile.following) {
            return this.profilesService.follow(this.profile.username).pipe(
              tap(
                data => {
                  this.isSubmitting = false
                  this.toggle.emit(true)
                },
                err => (this.isSubmitting = false)
              )
            )

            // Otherwise, unfollow this profile
          } else {
            return this.profilesService.unfollow(this.profile.username).pipe(
              tap(
                data => {
                  this.isSubmitting = false
                  this.toggle.emit(false)
                },
                err => (this.isSubmitting = false)
              )
            )
          }
        })
      )
      .subscribe()
  }
}
