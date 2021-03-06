import { Component, OnInit, Input } from '@angular/core'
import { ArticlesService } from 'src/app/article/shared/services/articles/articles.service'
import { ArticleListConfig } from 'src/app/article/shared/models/article-list-config.model'
import { Article } from 'src/app/article/shared/models/article.model'

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss'],
})
export class ArticleListComponent implements OnInit {
  constructor(private articlesService: ArticlesService) {}

  @Input() limit: number
  @Input()
  set config(config: ArticleListConfig) {
    if (config) {
      this.query = config
      this.currentPage = 1
      this.runQuery()
    }
  }

  query: ArticleListConfig
  results: Article[]
  loading = false
  currentPage = 1
  totalPages: Array<number> = [1]

  ngOnInit(): void {}

  setPageTo(pageNumber) {
    this.currentPage = pageNumber
    this.runQuery()
  }

  runQuery() {
    this.loading = true
    this.results = []

    // Create limit and offset filter (if necessary)
    if (this.limit) {
      this.query.filters.limit = this.limit
      this.query.filters.offset = this.limit * (this.currentPage - 1)
    }

    this.articlesService.query(this.query).subscribe(data => {
      this.loading = false
      this.results = data.articles

      // Used from http://www.jstips.co/en/create-range-0...n-easily-using-one-line/
      this.totalPages = Array.from(
        new Array(Math.ceil(data.articlesCount / this.limit)),
        (val, index) => index + 1
      )
    })
  }
}
