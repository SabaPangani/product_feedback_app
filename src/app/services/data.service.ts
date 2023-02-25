import { Injectable } from '@angular/core';
import { HttpClient, HttpContext, HttpHeaders, } from '@angular/common/http';
import { BehaviorSubject, filter, map, Observable, tap, throwError } from 'rxjs';
import { FeedbackRequest } from '../data-model/feedback-model';
import { data } from '../data-model/data-model';
import { Comment } from '../data-model/comment-model';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}
@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private _http: HttpClient) { }
  public apiUrl: string = '../../../../my-app/db.json';

  getData(): Observable<data> {
    return this._http.get<data>(this.apiUrl);
  }

  addComment(comment: Comment): Observable<Comment> {
    try {
      return this._http.post<Comment>(this.apiUrl, comment, httpOptions);
    } catch (error) {
      console.error(error);
      return throwError('An error occurred while adding the comment.');
    } finally {
      console.log('Add comment request completed.');
    }
  }

  getDataById(feedbackId: string): Observable<FeedbackRequest> {
    return this.getData().pipe(
      filter(request => request !== undefined),
      map(data => data.productRequests.find((item: FeedbackRequest) => item.id == feedbackId) || {} as FeedbackRequest)
    );
  }

}
