import { User } from '../../models'

export class UserState {
  isAuthenticated: boolean
  currentUser: User
}
