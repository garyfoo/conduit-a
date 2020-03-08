import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable, BehaviorSubject, ReplaySubject } from 'rxjs'

import { ApiService } from '../api/api.service'
import { JwtService } from '../jwt/jwt.service'
import { User } from '../../models'
import { map, distinctUntilChanged } from 'rxjs/operators'
import { Store } from 'src/app/shared/store/store'
import { UserState } from './user.state'

@Injectable({
  providedIn: 'root',
})
export class UserService extends Store<UserState> {
  constructor(private apiService: ApiService, private jwtService: JwtService) {
    super({ isAuthenticated: false, currentUser: {} as User })
  }

  // Verify JWT in localstorage with server & load user's info.
  // This runs once on application startup.
  populate() {
    // If JWT detected, attempt to get & store user's info
    if (this.jwtService.getToken()) {
      this.apiService.get('/user').subscribe(
        data => this.setAuth(data.user),
        err => this.purgeAuth()
      )
    } else {
      // Remove any potential remnants of previous auth states
      this.purgeAuth()
    }
  }

  setAuth(user: User) {
    // Save JWT sent from server in localstorage
    this.jwtService.saveToken(user.token)
    // Set current user data into observable
    // Set isAuthenticated to true
    this.setState({ isAuthenticated: true, currentUser: user })
  }

  purgeAuth() {
    // Remove JWT from localstorage
    this.jwtService.destroyToken()
    // Set current user to an empty object
    // Set auth status to false
    this.setState({ isAuthenticated: false, currentUser: {} as User })
  }

  attemptAuth(type, credentials): Observable<User> {
    const route = type === 'login' ? '/login' : ''
    return this.apiService.post('/users' + route, { user: credentials }).pipe(
      map(data => {
        this.setAuth(data.user)
        return data
      })
    )
  }

  // Update the user on the server (email, pass, etc)
  update(user): Observable<User> {
    return this.apiService.put('/user', { user }).pipe(
      map(data => {
        // Update the currentUser observable
        this.setState({
          isAuthenticated: this.state.isAuthenticated,
          currentUser: data.user as User,
        })
        return data.user
      })
    )
  }
}
