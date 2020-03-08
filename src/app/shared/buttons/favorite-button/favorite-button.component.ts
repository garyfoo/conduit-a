import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core'
import { Router } from '@angular/router'

import { of } from 'rxjs'
import { concatMap, tap } from 'rxjs/operators'
import { Article } from 'src/app/article/shared/models/article.model'
import { ArticlesService } from 'src/app/article/shared/services/articles/articles.service'
import { UserService } from 'src/app/core'

@Component({
  selector: 'app-favorite-button',
  templateUrl: './favorite-button.component.html',
  styleUrls: ['./favorite-button.component.scss'],
})
export class FavoriteButtonComponent implements OnInit {
  @Input() article: Article
  @Output() toggle = new EventEmitter<boolean>()
  isSubmitting = false

  constructor(
    private articlesService: ArticlesService,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {}

  toggleFavorite() {
    this.isSubmitting = true

    this.userService.state$
      .pipe(
        concatMap(state => {
          // Not authenticated? Push to login screen
          if (!state.isAuthenticated) {
            this.router.navigateByUrl('/login')
            return of(null)
          }

          // Favorite the article if it isn't favorited yet
          if (!this.article.favorited) {
            return this.articlesService.favorite(this.article.slug).pipe(
              tap(
                data => {
                  this.isSubmitting = false
                  this.toggle.emit(true)
                },
                err => (this.isSubmitting = false)
              )
            )

            // Otherwise, unfavorite the article
          } else {
            return this.articlesService.unfavorite(this.article.slug).pipe(
              tap(
                data => {
                  this.isSubmitting = false
                  this.toggle.emit(false)
                },
                err => (this.isSubmitting = false)
              )
            )
          }
        })
      )
      .subscribe()
  }
}
