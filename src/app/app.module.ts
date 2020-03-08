import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { HomeModule } from './home/home.module'
import { SharedModule } from './shared'
import { AuthModule } from './auth/auth.module'
import { CoreModule } from './core/core.module'
import { EditorModule } from './editor/editor.module'
import { ProfileComponent } from './profile/profile.component'
import { ProfileArticlesComponent } from './profile/profile-articles/profile-articles.component'
import { ProfileFavoritesComponent } from './profile/profile-favorites/profile-favorites.component'

@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    ProfileArticlesComponent,
    ProfileFavoritesComponent,
  ],
  imports: [
    BrowserModule,
    HomeModule,
    SharedModule,
    AuthModule,
    CoreModule,
    EditorModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
