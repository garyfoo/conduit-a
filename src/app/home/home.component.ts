import { Component, OnInit, OnDestroy } from '@angular/core'
import { Router } from '@angular/router'
import { TagsService } from '../core/services/tags/tags.service'
import { UserService } from '../core'
import { ArticleListConfig } from '../article/shared/models/article-list-config.model'
import { Subscription } from 'rxjs'
import { map } from 'rxjs/operators'

@Component({
  selector: 'app-home-page',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  constructor(
    private router: Router,
    private tagsService: TagsService,
    private userService: UserService
  ) {}

  isAuthenticated: boolean
  listConfig: ArticleListConfig = {
    type: 'all',
    filters: {},
  }
  tags: Array<string> = []
  tagsLoaded = false
  userServiceSubscription: Subscription

  ngOnInit(): void {
    console.log('ngoninit home component')
    this.userServiceSubscription = this.userService.state$.subscribe(state => {
      console.log('state in home component', state)
      this.isAuthenticated = state.isAuthenticated

      // set the article list accordingly
      if (state.isAuthenticated) {
        this.setListTo('feed')
      } else {
        this.setListTo('all')
      }
    })

    this.tagsService.getAll().subscribe(tags => {
      this.tags = tags
      this.tagsLoaded = true
    })
  }

  ngOnDestroy(): void {
    this.userServiceSubscription.unsubscribe()
  }

  setListTo(type: string = '', filters: object = {}) {
    // If feed is requested but user is not authenticated, redirect to login
    if (type === 'feed' && !this.isAuthenticated) {
      this.router.navigateByUrl('/login')
      return
    }

    // Otherwise, set the list object
    this.listConfig = { type, filters }
  }
}
