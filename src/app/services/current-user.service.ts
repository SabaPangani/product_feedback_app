import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { map, Observable } from 'rxjs';
import { User } from '../data-model/user-model';
import { HttpClient, HttpContext } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  constructor(private _data:DataService, private http:HttpClient) { }

  apiUrl = this._data.apiUrl;

  getCurrentUser(): Observable<User> {
    return this._data.getData().pipe(
      map(data => data.currentUser)
    );
  }
}
