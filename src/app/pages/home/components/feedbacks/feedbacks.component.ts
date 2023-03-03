import { Component, Input, OnInit } from '@angular/core';
import { FeedbackRequest } from 'src/app/data-model/feedback-model';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
@Component({
  selector: 'app-feedbacks',
  templateUrl: './feedbacks.component.html',
  styleUrls: ['./feedbacks.component.scss']
})
export class FeedbacksComponent implements OnInit {
  @Input() data: FeedbackRequest[] = [];
  public feedBack!:FeedbackRequest;
  feedBackId:string = '';
  upvotedFeedback: any = {};

  constructor(private _route:ActivatedRoute, private _dataService:DataService){}

  ngOnInit(): void {
   
  }
  onUpvoteClick(feedback: FeedbackRequest) {
    if (!this.upvotedFeedback[feedback.id]) {
      feedback.upvotes += 1;
      this.upvotedFeedback[feedback.id] = true;
    } else {
      feedback.upvotes -= 1;
      this.upvotedFeedback[feedback.id] = false;
    }
  }
}
