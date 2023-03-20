import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../../environment';

import { User } from '../_models/user';

@Injectable({ providedIn: 'root' })
export class AccountService {
  private userSubject: BehaviorSubject<User>;
  public user: Observable<User>;

  constructor(private router: Router, private http: HttpClient) {
    var userold: any = JSON.parse(JSON.stringify(localStorage.getItem('user')));
    this.userSubject = new BehaviorSubject<User>(userold);
    // (
    //   JSON.parse(localStorage.getItem('user'))
    // );
    this.user = this.userSubject.asObservable();
  }

  public get userValue(): User {
    return this.userSubject.value;
  }

  login(email: any, password: any) {
    return this.http
      .post<User>(`${environment.apiUrl}/api/auth/signin`, {
        email,
        password,
      })
      .pipe(
        map((user) => {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('user', JSON.stringify(user));
          this.userSubject.next(user);
          return user;
        })
      );
  }

  logout() {
    // remove user from local storage and set current user to null
    localStorage.removeItem('user');
    this.userSubject.next({
      id: '',
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      token: '',
    });
    this.router.navigate(['/login']);
  }

  register(user: User) {
    return this.http.post(`${environment.apiUrl}/api/auth/signup`, user);
  }
}
