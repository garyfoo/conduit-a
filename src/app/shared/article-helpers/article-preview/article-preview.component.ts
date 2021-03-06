import { Component, OnInit, Input } from '@angular/core'
import { Article } from 'src/app/article/shared/models/article.model'

@Component({
  selector: 'app-article-preview',
  templateUrl: './article-preview.component.html',
  styleUrls: ['./article-preview.component.scss'],
})
export class ArticlePreviewComponent implements OnInit {
  @Input() article: Article

  constructor() {}

  ngOnInit(): void {}

  onToggleFavorite(favorited: boolean) {
    this.article.favorited = favorited

    if (favorited) {
      this.article.favoritesCount++
    } else {
      this.article.favoritesCount--
    }
  }
}
