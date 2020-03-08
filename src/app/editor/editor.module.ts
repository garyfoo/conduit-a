import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { EditorRoutingModule } from './editor-routing.module'
import { EditorComponent } from './editor.component'

import { SharedModule } from '../shared'
import { EditableArticleResolverService } from './editable-article-resolver.service'

@NgModule({
  declarations: [EditorComponent],
  imports: [CommonModule, SharedModule, EditorRoutingModule],
  providers: [EditableArticleResolverService],
})
export class EditorModule {}
