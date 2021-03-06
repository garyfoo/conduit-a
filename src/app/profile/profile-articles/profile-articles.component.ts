import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { Profile } from '../shared/models/profile.model'
import { ArticleListConfig } from 'src/app/article/shared/models/article-list-config.model'

@Component({
  selector: 'app-profile-articles',
  templateUrl: './profile-articles.component.html',
  styleUrls: ['./profile-articles.component.scss'],
})
export class ProfileArticlesComponent implements OnInit {
  constructor(private route: ActivatedRoute, private router: Router) {}

  profile: Profile
  articlesConfig: ArticleListConfig = {
    type: 'all',
    filters: {},
  }

  ngOnInit(): void {
    this.route.parent.data.subscribe((data: { profile: Profile }) => {
      this.profile = data.profile
      this.articlesConfig = {
        type: 'all',
        filters: {},
      } // Only method I found to refresh article load on swap
      this.articlesConfig.filters.author = this.profile.username
    })
  }
}
