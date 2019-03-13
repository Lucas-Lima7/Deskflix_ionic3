import { HttpClient, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Observable} from "../../../node_modules/rxjs/Observable";
import {tap} from "rxjs/operators";

/*
  Generated class for the ResourceUserResourceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserResource {

  constructor(public http: HttpClient,
              //public authHttp: JWT_OPTIONS
  ) {
    //console.log('Hello UserResource Provider');
  }

  /*register(accessToken: string):Observable<string>{
    let headers = new Headers();
    headers.set('Authorization', `Bearer ${accessToken}`);
    return this.http
        .post(`http://localhost:8000/register`, {}, new HttpRequest({headers})))
  }*/

  updatePassword({password, password_confirmation}): Observable<Object>{
    return this.http.patch<any>('http://localhost:8000/user/settings', {password, password_confirmation})
        .pipe(
            tap(data=> {
                let token = data.user;
            })
        )
  }

}
