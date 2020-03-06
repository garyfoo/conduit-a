import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { ArticleRoutingModule } from './article-routing.module'
import { ArticleComponent } from './article.component'
import { ArticleCommentComponent } from './article-comment/article-comment.component'
import { SharedModule } from '../shared'

import { ArticleResolverService } from './article-resolver.service'

@NgModule({
  declarations: [ArticleComponent, ArticleCommentComponent, MarkdownPipe],
  imports: [CommonModule, SharedModule, ArticleRoutingModule],
  providers: [ArticleResolverService],
})
export class ArticleModule {}
