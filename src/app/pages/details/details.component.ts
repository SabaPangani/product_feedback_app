import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { FeedbackRequest } from 'src/app/data-model/feedback-model';
import { User } from 'src/app/data-model/user-model';
import { UserService } from 'src/app/services/current-user.service';
import { DataService } from 'src/app/services/data.service';
import { Comment } from 'src/app/data-model/comment-model';
import { Reply } from 'src/app/data-model/reply-model';
import { flush } from '@angular/core/testing';
import { FeedbacksComponent } from '../home/components/feedbacks/feedbacks.component';
@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent {
  feedBack!: FeedbackRequest;
  user!: User;
  replyClick: boolean = false;
  isReply: boolean = false;
  clickedComment!: Comment;
  clickedCommentIndex!: number;
  clickedReplyIndex!: number;
  constructor(private _route: ActivatedRoute, private _dataService: DataService, private _currentUser: UserService) { }

  ngOnInit(): void {
    this._route.paramMap.subscribe((params: ParamMap) => {
      let feedBackId = params.get('id');
      if (feedBackId) {
        this._dataService.getDataById(parseInt(feedBackId)).subscribe(feedback => {
          this.feedBack = feedback;
          console.log(this.feedBack);
          console.log(this.feedBack.comments)
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
    try{
      this._dataService.addComment(comment,this.feedBack.id).subscribe(comment => (this.feedBack.comments.push(comment)));
    }
    catch(error){
      console.error(error);
    }
    console.log(this.feedBack.comments)
  }

  // addComment(comment: Comment, feedbackId: number): void {
  //   this._dataService.addComment(comment, feedbackId).subscribe(
  //     (feedback: FeedbackRequest) => {
  //       this.feedBack = feedback;
  //     },
  //     (error: any) => {
  //       console.error(error);
  //       // handle error here
  //     }
  //   );
  // }
  addReply(newReply: Reply, comment: Comment,feedbackId: number | string): void {
    this.clickedComment = comment;
    if (!comment.replies) {
      comment.replies = [newReply];
    } else {
      this._dataService.addReply(newReply, feedbackId,comment).subscribe(reply => {
        comment.replies.push(reply);
      });
    }
    this.replyClick = false;
  }
  onReplyHandler(i: number, isReply: boolean) {
    this.replyClick = !this.replyClick;
    if (isReply) {
      this.isReply = true
      this.clickedReplyIndex = i;
    } else {
      this.clickedCommentIndex = i;
      this.isReply = false;
    }
  }
}
