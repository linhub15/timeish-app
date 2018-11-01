import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from "rxjs";
import { map, catchError } from "rxjs/operators";
import { environment } from '../../../environments/environment';

import { Deserializable } from "../models/deserializable.model";
/**
 * Sends HTTP requests and deserializes responses
 */
@Injectable()
export class ApiService {
  private baseUrl: string;
  constructor(private http: HttpClient) {
    this.baseUrl = environment.apiUrl;
  }

  /**
   * 
   * @param resource The resource portion of api url e.g. example.com/api/resource
   * @param model The type of object to return
   */
  list<T extends Deserializable>(resource: string, model: new () => T)
      : Observable<Array<T>> {
    return this.http.get<Array<T>>(this.buildUrl(resource))
      .pipe(
        map(array => !array ? null : 
          array.map(item => new model().deserialize(item))),
        catchError(this.handleError),

      )
  }

  get<T extends Deserializable>(
      resource: string, id: number,model: new () => T) : Observable<T> {
    let url = this.buildUrl(resource, id.toString());
    return this.http.get<T>(url)
      .pipe(
        map(obj => !obj ? null : 
          new model().deserialize(obj)),
        catchError(this.handleError),
      )
  }

  add<T extends Deserializable>(resource: string, newObject, model: new () => T)
      : Observable<T> {
    return this.http.post(this.buildUrl(resource), newObject)
      .pipe(
        map(obj => !obj ? null : 
          new model().deserialize(obj)),
        catchError(this.handleError),
      )
  }

  put<T extends Deserializable>(resource: string, object: T, model: new () => T): Observable<T> {
    if (!object.id) { return }
    const url = this.buildUrl(resource, object.id.toString());
    return this.http.put(url, object)
      .pipe(
        map(obj => !obj ? null :
          new model().deserialize(obj)),
        catchError(this.handleError),
      )
  }

  delete(resource: string, id: number): Observable<any> {
    if (!resource || !id) { return }
    const url = this.buildUrl(resource, id.toString());
    return this.http.delete(url)
      .pipe(catchError(this.handleError))
  }

  private buildUrl(...resource: string[]): string {
    let buff: string = this.baseUrl;
    resource.forEach(item => buff = buff.concat(item + '/'));
    return buff;
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // Client-side or Network
      console.error(
        'A client or network error occured: ',
        error.error.message)
    } else {
      // Backend
      console.error(
        `Web service returned code ${error.status}, ` +
        `body: ${error.error.toString()}`)
    }
    return throwError(error.error);
  }
}