import {
  Component,
  EventEmitter,
  Input,
  Output,
  OnInit,
  OnDestroy,
} from '@angular/core'

import { Comment, User, UserService } from '../../core'
import { Subscription } from 'rxjs'

@Component({
  selector: 'app-article-comment',
  templateUrl: './article-comment.component.html',
  styleUrls: ['./article-comment.component.scss'],
})
export class ArticleCommentComponent implements OnInit, OnDestroy {
  constructor(private userService: UserService) {}

  userServiceSubscription: Subscription

  @Input() comment: Comment
  @Output() deleteComment = new EventEmitter<boolean>()

  canModify: boolean

  ngOnInit(): void {
    // Load the current user's data
    this.userServiceSubscription = this.userService.state$.subscribe(state => {
      this.canModify =
        state.currentUser.username === this.comment.author.username
    })
  }

  ngOnDestroy() {
    this.userServiceSubscription.unsubscribe()
  }

  deleteClicked() {
    this.deleteComment.emit(true)
  }
}
