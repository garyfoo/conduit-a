import { Component, OnInit, OnDestroy } from '@angular/core'

import { User, UserService } from '../../../core'
import { Subscription } from 'rxjs'
@Component({
  selector: 'app-layout-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  constructor(private userService: UserService) {}

  currentUser: User
  userServiceSubscription: Subscription

  ngOnInit(): void {
    this.userServiceSubscription = this.userService.state$.subscribe(state => {
      this.currentUser = state.currentUser
    })
  }

  ngOnDestroy(): void {
    this.userServiceSubscription.unsubscribe()
  }
}
