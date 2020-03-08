import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { Profile } from '../shared/models/profile.model'
import { ArticleListConfig } from 'src/app/article/shared/models/article-list-config.model'

@Component({
  selector: 'app-profile-favorites',
  templateUrl: './profile-favorites.component.html',
  styleUrls: ['./profile-favorites.component.scss'],
})
export class ProfileFavoritesComponent implements OnInit {
  constructor(private route: ActivatedRoute, private router: Router) {}

  profile: Profile
  favoritesConfig: ArticleListConfig = {
    type: 'all',
    filters: {},
  }

  ngOnInit(): void {
    this.route.parent.data.subscribe((data: { profile: Profile }) => {
      this.profile = data.profile
      this.favoritesConfig.filters.favorited = this.profile.username
    })
  }
}
