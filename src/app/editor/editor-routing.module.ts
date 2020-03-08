import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { EditorComponent } from './editor.component'
import { AuthGuard } from '../auth/auth/auth.guard'
import { EditableArticleResolverService } from './editable-article-resolver.service'

const routes: Routes = [
  {
    path: '',
    component: EditorComponent,
    canActivate: [AuthGuard],
  },
  {
    path: ':slug',
    component: EditorComponent,
    canActivate: [AuthGuard],
    resolve: {
      article: EditableArticleResolverService,
    },
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditorRoutingModule {}
