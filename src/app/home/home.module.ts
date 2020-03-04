import { ModuleWithProviders, NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { HomeComponent } from './home.component'
import { RouterModule } from '@angular/router'
import { SharedModule } from '../shared'
import { HomeRoutingModule } from './home-routing.module'

@NgModule({
  declarations: [HomeComponent],
  imports: [HomeRoutingModule, SharedModule, CommonModule],
})
export class HomeModule {}
