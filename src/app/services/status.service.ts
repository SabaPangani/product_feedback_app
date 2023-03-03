import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FeedbackRequest } from '../data-model/feedback-model';
import { DataService } from './data.service';
@Injectable({
  providedIn: 'root'
})
export class StatusService {
  plannedFilter = new BehaviorSubject<FeedbackRequest[]>([]);
  inProgressFilter = new BehaviorSubject<FeedbackRequest[]>([]);
  liveFilter = new BehaviorSubject<FeedbackRequest[]>([]);

  constructor(private _data: DataService) { }

  roadMapFeedBack() {
    this._data.getData().subscribe((response) => {
      const allFeedback = response.productRequests as FeedbackRequest[];
      this.plannedFilter.next(allFeedback.filter(feedback => feedback.status === 'planned'));
      this.inProgressFilter.next(allFeedback.filter(feedback => feedback.status === 'in-progress'));
      this.liveFilter.next(allFeedback.filter(feedback => feedback.status === 'live'));
    });
  }
}
