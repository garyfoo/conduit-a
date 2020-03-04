import { Component, OnInit } from '@angular/core'

import { User, UserService } from '../../../core'
@Component({
  selector: 'app-layout-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(private userService: UserService) {}

  currentUser: User

  ngOnInit(): void {
    this.userService.currentUser.subscribe(userData => {
      this.currentUser = userData
    })
  }
}
