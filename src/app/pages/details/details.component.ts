import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { FeedbackRequest } from 'src/app/data-model/feedback-model';
import { User } from 'src/app/data-model/user-model';
import { UserService } from 'src/app/services/current-user.service';
import { DataService } from 'src/app/services/data.service';
import { feedbacks } from 'src/app/shared/data/feedbacks';
import { Comment } from 'src/app/data-model/comment-model';
import { throwError } from 'rxjs';
@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent {
  feedBack!: FeedbackRequest;
  user!: User;
  constructor(private _route: ActivatedRoute, private _dataService: DataService, private _currentUser: UserService) { }

  ngOnInit(): void {
    this._route.paramMap.subscribe((params: ParamMap) => {
      let feedBackId = params.get('id');
      if (feedBackId) {
        this._dataService.getDataById(feedBackId).subscribe(feedback => {
          this.feedBack = feedback;
          console.log(this.feedBack);
        },
          error => {
            console.error(error)
          }
        );
      }
    })

    this._currentUser.getCurrentUser().subscribe((user) => {
      console.log(user)
      this.user = user;
    })
  }

 addComment(comment: Comment): void {
  this._dataService.addComment(comment).subscribe({
    next: (comment) => {
      this.feedBack.comments.push(comment);
    },
    error: (err) => {
      console.error('Error occurred', err);
    },
    complete: () => {
      console.log('Add comment request completed.');
    }
  });
}
}
