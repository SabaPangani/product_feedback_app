import { Injectable } from '@angular/core';
import { HttpClient, HttpContext, HttpHeaders, } from '@angular/common/http';
import { BehaviorSubject, catchError, filter, map, mergeMap, Observable, tap, throwError } from 'rxjs';
import { FeedbackRequest } from '../data-model/feedback-model';
import { data } from '../data-model/data-model';
import { Comment } from '../data-model/comment-model';
import { Reply } from '../data-model/reply-model';

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
  addFeedback(feedback: FeedbackRequest): Observable<FeedbackRequest> {
    const apiUrl = 'http://localhost:3000/productRequests';

    return this._http.put<FeedbackRequest>(apiUrl, feedback, httpOptions).pipe(
      catchError((error: any) => {
        console.error(error);
        return throwError('An error occurred while adding the feedback.');
      }),
      tap(() => {
        console.log('Add feedback request completed.');
      })
    );
  }
  // addComment(comment: Comment, feedbackId: number): Observable<FeedbackRequest> {
  //   const apiUrl = `http://localhost:3000/productRequests/${feedbackId}`;
  //   return this._http.get<FeedbackRequest>(apiUrl).pipe(
  //     mergeMap((feedback: FeedbackRequest) => {
  //       feedback.comments.push(comment);
  //       return this._http.put<FeedbackRequest>(apiUrl, feedback, httpOptions);
  //     }),
  //     catchError((error: any) => {
  //       console.error(error);
  //       return throwError('An error occurred while adding the comment.');
  //     }),
  //     tap(() => {
  //       console.log('Add comment request completed.');
  //     })
  //   );
  // }

  addComment(comment: Comment,feedbackId:number): Observable<Comment> {
    const apiUrl = 'http://localhost:3000/productRequests/' + feedbackId;
    return this._http.post<Comment>(apiUrl, comment, httpOptions).pipe(
      catchError((error: any) => {
        console.error(error);
        return throwError('An error occurred while adding the comment.');
      }),
      tap(() => {
        console.log('Add comment request completed.');
      })
    );  
  }

  addReply(reply: Reply, feedbackId: number | string, comment: Comment): Observable<Reply> {
    const apiUrl = `http://localhost:3000/productRequests/${feedbackId}`;
    return this._http.get<Comment>(apiUrl).pipe(
      mergeMap((comment: Comment) => {
        if (!comment.replies) {
          comment.replies = [reply];
        } else {
          comment.replies.push(reply);
        }
        return this._http.put<Comment>(apiUrl, comment, httpOptions).pipe(
          map(() => reply)
        );
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

  getDataById(feedbackId: number): Observable<FeedbackRequest> {
    return this.getData().pipe(
      filter(request => request !== undefined),
      map(data => data.productRequests.find((item: FeedbackRequest) => item.id == feedbackId) || {} as FeedbackRequest)
    );
  }

}
