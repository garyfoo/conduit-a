import { Injectable } from '@angular/core'
import {
  ActivatedRouteSnapshot,
  Resolve,
  Router,
  RouterStateSnapshot,
} from '@angular/router'
import { Observable } from 'rxjs'

import { catchError } from 'rxjs/operators'
import { Article } from './shared/models/article.model'
import { ArticlesService } from './shared/services/articles/articles.service'

@Injectable({
  providedIn: 'root',
})
export class ArticleResolverService implements Resolve<Article> {
  constructor(
    private articlesService: ArticlesService,
    private router: Router
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    return this.articlesService
      .get(route.params.slug)
      .pipe(catchError(err => this.router.navigateByUrl('/')))
  }
}
