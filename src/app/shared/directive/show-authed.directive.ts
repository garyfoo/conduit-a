import {
  Directive,
  Input,
  OnInit,
  TemplateRef,
  ViewContainerRef,
  OnDestroy,
} from '@angular/core'
import { UserService } from '../../core'
import { Subscription } from 'rxjs'
import { map, distinctUntilChanged } from 'rxjs/operators'

@Directive({
  selector: '[appShowAuthed]',
})
export class ShowAuthedDirective implements OnInit, OnDestroy {
  constructor(
    private templateRef: TemplateRef<any>,
    private userService: UserService,
    private viewContainer: ViewContainerRef
  ) {}

  condition: boolean
  userServiceSubscription: Subscription

  ngOnInit() {
    this.userServiceSubscription = this.userService.state$
      .pipe(
        distinctUntilChanged(),
        map(state => state.isAuthenticated)
      )
      .subscribe(isAuthenticated => {
        if (
          (isAuthenticated && this.condition) ||
          (!isAuthenticated && !this.condition)
        ) {
          this.viewContainer.createEmbeddedView(this.templateRef)
        } else {
          this.viewContainer.clear()
        }
      })
  }

  ngOnDestroy(): void {
    this.userServiceSubscription.unsubscribe()
  }

  @Input() set appShowAuthed(condition: boolean) {
    this.condition = condition
  }
}
