import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FooterComponent, HeaderComponent } from './layout'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'
import { ListErrorsComponent } from './list-errors/list-errors.component'
import { HttpClientModule } from '@angular/common/http'
import { ShowAuthedDirective } from './directive/show-authed.directive';
import { ArticleListComponent } from './article-helpers/article-list/article-list.component';
import { ArticlePreviewComponent } from './article-helpers/article-preview/article-preview.component';
import { ArticleMetaComponent } from './article-helpers/article-meta/article-meta.component';
import { FollowButtonComponent } from './buttons/follow-button/follow-button.component';
import { FavoriteButtonComponent } from './buttons/favorite-button/favorite-button.component'

@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent,
    ListErrorsComponent,
    ShowAuthedDirective,
    ArticleListComponent,
    ArticlePreviewComponent,
    ArticleMetaComponent,
    FollowButtonComponent,
    FavoriteButtonComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
  ],
  exports: [
    FooterComponent,
    HeaderComponent,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule,
    ListErrorsComponent,
    ShowAuthedDirective,
    ArticleListComponent,
    ArticlePreviewComponent,
    ArticleMetaComponent,
    FollowButtonComponent,
    FavoriteButtonComponent,
  ],
})
export class SharedModule { }
