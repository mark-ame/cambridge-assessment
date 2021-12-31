import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpResponse, HttpRequest, HttpHandler } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';

let userCreds = {
  username: '1',
  password: '1'
}
@Injectable()
export class FakeLoginInterceptor implements HttpInterceptor {
  intercept(httpRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const { url, method, headers, body } = httpRequest;
    if (url.includes('auth/login') && method === 'POST') {
      return this.authenticate(body);
    }
    return next.handle(httpRequest);
  }


  private authenticate(body: any) {
    if(body.username === userCreds.username && body.password === userCreds.password) {
      return of(new HttpResponse({ status: 200, body }))
    } else {
      return throwError(() => new Error('Invalid username and password'));
    }
  }
}