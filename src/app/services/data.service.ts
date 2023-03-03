import { Injectable } from '@angular/core';
import { HttpClient, HttpContext, HttpHeaders, } from '@angular/common/http';
import { BehaviorSubject, catchError, filter, find, map, merge, mergeMap, Observable, tap, throwError } from 'rxjs';
import { FeedbackRequest } from '../data-model/feedback-model';
import { data } from '../data-model/data-model';
import { Comment } from '../data-model/comment-model';
import { Reply } from '../data-model/reply-model';
import { delay } from 'rxjs';

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
  public apiUrl: string = '../assets/db.json';

  getData(): Observable<data> {
    return this._http.get<data>(this.apiUrl);
  }

  getDataById(feedbackId: number): Observable<FeedbackRequest> {
    return this.getData().pipe(
      filter(request => request !== undefined),
      map(data => data.productRequests.find((item: FeedbackRequest) => item.id == feedbackId) || {} as FeedbackRequest)
    );
  }

  addFeedback(feedback: FeedbackRequest): Observable<FeedbackRequest[]> {
    const apiUrl = 'http://localhost:3000/productRequests';

    return this._http.get<FeedbackRequest[]>(apiUrl).pipe(
      mergeMap((feedbacks: FeedbackRequest[]) => {
        feedbacks.push(feedback);
        return this._http.put<FeedbackRequest[]>(apiUrl, feedbacks, httpOptions);
      }),
      catchError((error: any) => {
        console.error(error);
        return throwError('An error occurred while adding the feedback.');
      }),
      tap(() => {
        console.log('Add feedback request completed.');
      })
    );
  }

  addComment(comment: Comment, feedbackId: number): Observable<FeedbackRequest> {
    const apiUrl = `http://localhost:3000/productRequests/${feedbackId}`;
    return this._http.get<FeedbackRequest>(apiUrl).pipe(
      mergeMap((feedback: FeedbackRequest) => {
        feedback.comments.push(comment);
        return this._http.put<FeedbackRequest>(apiUrl, feedback, httpOptions);
      }),
      catchError((error: any) => {
        console.error(error);
        return throwError('An error occurred while adding the comment.');
      }),
      tap(() => {
        console.log('Add comment request completed.');
      })
    );
  }

  addReply(reply: Reply, feedbackId: number, comment: Comment): Observable<FeedbackRequest> {
    const apiUrl = `http://localhost:3000/productRequests/${feedbackId}`;
    return this._http.get<FeedbackRequest>(apiUrl).pipe(
      mergeMap((feedback: FeedbackRequest) => {
        let commentToEdit = feedback.comments.find(commentToFind => commentToFind.id === comment.id);
        if (!commentToEdit?.replies && commentToEdit !== undefined) {
          commentToEdit.replies = [];
        }
        commentToEdit?.replies.push(reply);
        return this._http.put<FeedbackRequest>(apiUrl, feedback, httpOptions);
      }),
      catchError((error: any) => {
        console.error(error);
        return throwError('An error occurred while adding the reply.');
      }),
      tap(() => {
        console.log('Add reply request completed.');
      })
    );
  }
}
