import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { data } from '../data-model/data-model';
import { FeedbackRequest } from '../data-model/feedback-model';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class SuggestionsService {

  constructor(private _dataService: DataService) { }

  getData(): Observable<FeedbackRequest[]> {
    return this._dataService.getData().pipe(
      map((response) => response.productRequests)
    );
  }

  sortData(sortFn: (a: FeedbackRequest, b: FeedbackRequest) => number): Observable<FeedbackRequest[]> {
    return this._dataService.getData().pipe(
      map((response) => {
        const data = response.productRequests;
        return data.sort(sortFn);
      })
    );
  }

  sortFeedbacks(sortStyle: string): Observable<FeedbackRequest[]> {
    let sortFn: (a: FeedbackRequest, b: FeedbackRequest) => number = (a, b) => 0;
    if (sortStyle === "most-upvotes") {
      sortFn = (a, b) => b.upvotes - a.upvotes;
    } else if (sortStyle === "least-upvotes") {
      sortFn = (a, b) => a.upvotes - b.upvotes;
    } else if (sortStyle === "most-comments") {
      sortFn = (a, b) => {
        const aCommentsLength = a.comments ? a.comments.length : 0;
        const bCommentsLength = b.comments ? b.comments.length : 0;
        return bCommentsLength - aCommentsLength;
      };
    } else if (sortStyle === "least-comments") {
      sortFn = (a, b) => {
        const aCommentsLength = a.comments ? a.comments.length : 0;
        const bCommentsLength = b.comments ? b.comments.length : 0;
        return aCommentsLength - bCommentsLength;
      };
    }
    return this.sortData(sortFn);
  }

  filterDataByCategory(cat: string): Observable<FeedbackRequest[]> {
    return this._dataService.getData().pipe(
      map((response) => {
        const data = response.productRequests;
        if (cat === "All") {
          return data;
        } else {
          return data.filter((item) => item.category && item.category.toString() === cat.toLowerCase());
        }
      })
    );
  }
}
