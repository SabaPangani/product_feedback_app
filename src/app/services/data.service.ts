import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { FeedbackRequest } from '../data-model/feedback-model';
import { feedbacks } from '../shared/data/feedbacks';
@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private _http: HttpClient) { }

  getData(): Observable<any> {
    return this._http.get('../assets/data.json');
  }

  getDataById(feedBackId: string): Observable<FeedbackRequest> {
    return this.getData()
      .pipe(
        map(data => data.find((item:FeedbackRequest) => item.id === feedBackId))
      );
  }
}
