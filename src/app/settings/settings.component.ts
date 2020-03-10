import { Component, OnInit, OnDestroy } from '@angular/core'
import { FormBuilder, FormGroup } from '@angular/forms'
import { Router } from '@angular/router'

import { User, UserService } from '../core'
import { Subscription } from 'rxjs'

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit, OnDestroy {
  user: User = {} as User
  settingsForm: FormGroup
  errors: object = {}
  isSubmitting = false
  userServiceSubscription: Subscription

  constructor(
    private router: Router,
    private userService: UserService,
    private fb: FormBuilder
  ) {
    // create form group using the form builder
    this.settingsForm = this.fb.group({
      image: '',
      username: '',
      bio: '',
      email: '',
      password: '',
    })
    // Optional: subscribe to changes on the form
    // this.settingsForm.valueChanges.subscribe(values => this.updateUser(values));
  }

  ngOnInit(): void {
    // Make a fresh copy of the current user's object to place in editable form fields
    this.userServiceSubscription = this.userService.state$.subscribe(state => {
      Object.assign(this.user, state.currentUser)
    })
    // Fill the form
    this.settingsForm.patchValue(this.user)
  }

  ngOnDestroy(): void {
    this.userServiceSubscription.unsubscribe()
  }

  logout() {
    this.userService.purgeAuth()
    this.router.navigateByUrl('/')
  }

  submitForm() {
    this.isSubmitting = true

    // update the model
    this.updateUser(this.settingsForm.value)

    this.userService.update(this.user).subscribe(
      updatedUser =>
        this.router.navigateByUrl('/profile/' + updatedUser.username),
      err => {
        this.errors = err
        this.isSubmitting = false
      }
    )
  }

  updateUser(values: object) {
    Object.assign(this.user, values)
  }
}