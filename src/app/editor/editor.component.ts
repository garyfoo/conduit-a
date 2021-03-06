import { Component, OnInit } from '@angular/core'
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
  FormArray,
} from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { Article } from '../article/shared/models/article.model'
import { ArticlesService } from '../article/shared/services/articles/articles.service'

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
})
export class EditorComponent implements OnInit {
  article: Article = {} as Article
  articleForm: FormGroup
  tagField = new FormControl()
  errors: object = {}
  isSubmitting = false

  constructor(
    private articlesService: ArticlesService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.articleForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      body: ['', Validators.required],
      tagList: this.fb.array([]),
    })
  }

  get tagList() {
    return this.articleForm.get('tagList') as FormArray
  }

  ngOnInit(): void {
    // If there's an article prefetched, load it
    this.route.data.subscribe((data: { article: Article }) => {
      if (data.article) {
        this.article = data.article
        this.articleForm.patchValue(data.article)
      }
    })
  }

  addTag() {
    // retrieve tag control
    const tag = this.tagField.value
    // only add tag if it does not exist yet
    if (this.tagList.value.indexOf(tag) < 0) {
      this.tagList.push(this.fb.control(tag))
    }
    // clear the input
    this.tagField.reset('')
  }

  removeTag(i: number) {
    this.tagList.removeAt(i)
  }

  submitForm() {
    this.isSubmitting = true

    // post the changes
    this.articlesService.save(this.articleForm.value).subscribe(
      article => this.router.navigateByUrl('/article/' + article.slug),
      err => {
        this.errors = err
        this.isSubmitting = false
      }
    )
  }
}
