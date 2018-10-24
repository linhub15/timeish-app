import { Injectable, OnInit } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

import { Deserializable } from "../models/deserializable.model";

/**
 * Sends HTTP requests and deserializes responses
 */
@Injectable()
export class ApiService implements OnInit {

  // This will be passed in from variables...
  readonly baseUrl = 'https://localhost:5001/api/';
  constructor(private http: HttpClient) { }

  ngOnInit() { }

  /**
   * 
   * @param resource The resource portion of api url e.g. example.com/api/resource
   * @param model The type of object to return
   */
  list<T extends Deserializable>(resource: string, model: new () => T)
      : Observable<Array<T>> {
    return this.http.get<Array<T>>(this.buildUrl(resource))
      .pipe(map(array => {
        array.forEach(function(item, index, array) {
          array[index] = new model().deserialize(item);
        })
        return array;
      }));
  }

  get<T extends Deserializable>(
      resource: string, id: number,model: new () => T) : Observable<T> {
    let url = this.buildUrl(resource, id.toString());
    return this.http.get<T>(url).pipe(
        map(obj => {return new model().deserialize(obj)})
      );
  }

  add<T extends Deserializable>(resource: string, newObject, model: new () => T)
      : Observable<T> {
    return this.http.post(this.buildUrl(resource), newObject)
        .pipe(map(obj => {return new model().deserialize(obj)}));
  }

  update<T extends Deserializable>(resource: string, object: T, model: new () => T): Observable<T> {
    if (!object.id) { return }
    const url = this.buildUrl(resource, object.id.toString());
    return this.http.put(url, object)
        .pipe(map(obj => {return new model().deserialize(obj)}));;
  }

  delete(resource: string, id: number): Observable<any> {
    if (!resource || !id) { console.log("required params"); return; }
    const url = this.buildUrl(resource, id.toString());
    return this.http.delete(url);
  }

  private buildUrl(...resource: string[]): string {
    let buff: string = this.baseUrl;
    resource.forEach(item => buff = buff.concat(item + '/'));
    return buff;
  }

}