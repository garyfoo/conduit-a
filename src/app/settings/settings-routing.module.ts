import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { SettingsComponent } from './settings.component'
import { AuthGuard } from '../auth/auth/auth.guard'

const routes: Routes = [
  {
    path: '',
    component: SettingsComponent,
    canActivate: [AuthGuard],
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingsRoutingModule {}
