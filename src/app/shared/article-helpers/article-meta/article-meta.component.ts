import { Component, Input, OnInit } from '@angular/core'
import { Article } from 'src/app/article/shared/models/article.model'

@Component({
  selector: 'app-article-meta',
  templateUrl: './article-meta.component.html',
  styleUrls: ['./article-meta.component.scss'],
})
export class ArticleMetaComponent implements OnInit {
  @Input() article: Article

  constructor() {}

  ngOnInit(): void {}
}
