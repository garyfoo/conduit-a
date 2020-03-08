import { Injectable } from '@angular/core'
import {
  ActivatedRouteSnapshot,
  Resolve,
  Router,
  RouterStateSnapshot,
} from '@angular/router'
import { Observable } from 'rxjs'

import { catchError, map } from 'rxjs/operators'
import { Article } from '../article/shared/models/article.model'
import { ArticlesService } from '../article/shared/services/articles/articles.service'
import { UserService } from '../core'
@Injectable({
  providedIn: 'root',
})
export class EditableArticleResolverService implements Resolve<Article> {
  constructor(
    private articlesService: ArticlesService,
    private router: Router,
    private userService: UserService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    return this.articlesService.get(route.params[`slug`]).pipe(
      map(article => {
        if (
          this.userService.getCurrentUser().username === article.author.username
        ) {
          return article
        } else {
          this.router.navigateByUrl('/')
        }
      }),
      catchError(err => this.router.navigateByUrl('/'))
    )
  }
}
