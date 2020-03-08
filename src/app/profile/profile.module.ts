import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { ProfileRoutingModule } from './profile-routing.module'
import { ProfileArticlesComponent } from './profile-articles/profile-articles.component'
import { ProfileComponent } from './profile.component'
import { ProfileFavoritesComponent } from './profile-favorites/profile-favorites.component'
import { SharedModule } from '../shared'
import { ProfileResolverService } from './profile-resolver.service'

@NgModule({
  declarations: [
    ProfileArticlesComponent,
    ProfileComponent,
    ProfileFavoritesComponent,
  ],
  imports: [CommonModule, SharedModule, ProfileRoutingModule],
  providers: [ProfileResolverService],
})
export class ProfileModule {}
