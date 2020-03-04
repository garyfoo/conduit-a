import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { ApiService, JwtService, UserService } from './services'

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [ApiService, JwtService, UserService],
})
export class CoreModule {}
