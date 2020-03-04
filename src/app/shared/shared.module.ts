import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FooterComponent, HeaderComponent } from './layout'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'
import { ListErrorsComponent } from './list-errors/list-errors.component'
import { HttpClientModule } from '@angular/common/http'
import { ShowAuthedDirective } from './directive/show-authed.directive'

@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent,
    ListErrorsComponent,
    ShowAuthedDirective,
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
  ],
})
export class SharedModule {}
