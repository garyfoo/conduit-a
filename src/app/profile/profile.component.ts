import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'

import { concatMap, tap, map } from 'rxjs/operators'
import { UserService, User } from '../core'
import { Profile } from './shared/models/profile.model'
import { UserState } from '../core/services/user/user.state'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private userService: UserService
  ) {}

  profile: Profile
  currentUser: User
  isUser: boolean

  ngOnInit(): void {
    this.route.data
      .pipe(
        concatMap((data: { profile: Profile }) => {
          this.profile = data.profile
          // Load the current user's data.
          return this.userService.state$.pipe(
            map((state: UserState) => {
              this.currentUser = state.currentUser
              this.isUser = this.currentUser.username === this.profile.username
              return state.currentUser
            })
          )
        })
      )
      .subscribe()
  }

  onToggleFollowing(following: boolean) {
    this.profile.following = following
  }
}
